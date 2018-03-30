package com.guigui.photos.service;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataException;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.guigui.photos.Application;
import com.guigui.photos.service.ImageUtils.ImageInformation;

@Service
public class ImageReduceService {

	/**
	 * Crée toutes les miniatures dans les dossiers MIN et MAX à partir des
	 * fichier (photos) dans le répertoire ORIGINAL.
	 * 
	 * @param albumName
	 *            Nom du dossier de l'album à traiter
	 * @return Renvoie un message décrivant les éventuelles erreurs lors de la
	 *         conversion. Renvoie "" si il n'y a pas eu d'erreurs.
	 * @throws PhotoServicesException
	 *             Si ça va mal
	 */
	public String compressAlbum(String albumName) throws PhotoServicesException {

		StringBuilder errors = new StringBuilder();

		File albumFolder = new File(Application.STORAGE_FOLDER.getAbsolutePath(), albumName);
		File minFolder = new File(albumFolder, SIZE.MIN.toString());
		File maxFolder = new File(albumFolder, SIZE.MAX.toString());
		File originalFolder = new File(albumFolder, SIZE.ORIGINAL.toString());

		if (!albumFolder.isDirectory() || minFolder.isFile() || maxFolder.isFile() || !originalFolder.isDirectory()) {
			throw new PhotoServicesException("Invalid folder hierarchy. It should be :\n" + "/storage/" + albumName
					+ "/ORIGINAL/\n" + "/storage/" + albumName + "/MIN/\n" + "/storage/" + albumName + "/MAX/\n");
		}

		if (!minFolder.exists()) {
			minFolder.mkdir();
		}
		if (!maxFolder.exists()) {
			maxFolder.mkdir();
		}

		// Pour chaque fichier du dosssier original
		for (File originalPhoto : originalFolder.listFiles()) {
			if (originalPhoto.isFile()) {
				File minPhoto = new File(minFolder, originalPhoto.getName());
				File maxPhoto = new File(maxFolder, originalPhoto.getName());
				// Si il n'y a pas déjà de miniature dans le dossier MIN
				if (!minPhoto.exists()) {
					try {
						// Crée une miniature dans le dossier MIN
						reducePhotoToSize(originalPhoto, minPhoto, SIZE.MIN);
						System.out.println("Created " + minPhoto.getAbsolutePath());
					} catch (PhotoServicesException e) {
						errors.append("\n * Error while creating ");
						errors.append(minPhoto.getName());
						errors.append(" of size ");
						errors.append(SIZE.MIN);
						errors.append(" : ");
						errors.append(e.getMessage());
						System.out.println(e.getMessage() + '\n' + e.getStackTrace());
					}
				}
				// Si il n'y a pas déjà de miniature dans le dossier MAX
				if (!maxPhoto.exists()) {
					try {
						// Crée une miniature dans le dossier MAX
						reducePhotoToSize(originalPhoto, maxPhoto, SIZE.MAX);
						System.out.println("Created " + maxPhoto.getAbsolutePath());
					} catch (PhotoServicesException e) {
						errors.append("\n * Error while creating ");
						errors.append(maxPhoto.getName());
						errors.append(" of size ");
						errors.append(SIZE.MAX);
						errors.append(" : ");
						errors.append(e.getMessage());
						System.out.println(e.getMessage() + '\n' + e.getStackTrace());
					}
				}
			}
		}

		return errors.toString();
	}

	/**
	 * Crée une image "_outputPhoto" à partir de l'image "_originalPhoto" dont
	 * les dimensions maxilames sont de la taille "_size"
	 * 
	 * @param _originalPhoto
	 * @param _outputPhoto
	 * @param _size
	 * @throws IOException
	 *             lorsque l'ouverture du fichier original ou l'acriture du
	 *             fichier out plante
	 * @throws ImageProcessingException
	 */
	private void reducePhotoToSize(File _originalPhoto, File _outputPhoto, SIZE _size) throws PhotoServicesException {

		try {
			// Récupère la taille originale de l'image
			BufferedImage originalPhoto = ImageIO.read(_originalPhoto);
			int originalWidth = originalPhoto.getWidth();
			int originalHeight = originalPhoto.getHeight();

			// Calcule la hauteur/largeur désirée
			double scaleX = _size.getTallestWidth() * 1.0 / originalWidth;
			double scaleY = _size.getTallestHeight() * 1.0 / originalHeight;
			double smallestScale = Double.min(scaleX, scaleY);

			int targetWidth = (int) (originalWidth * smallestScale);
			int targetHeight = (int) (originalHeight * smallestScale);

			// Récupère l'orientation de l'image
			Metadata metadata = ImageMetadataReader.readMetadata(_originalPhoto);
			Directory directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);
			int orientation = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);

			ImageInformation originalPhotoInfos = new ImageInformation(orientation, targetWidth, targetHeight);

			// Crée l'image de la taille désirée
			BufferedImage imgSmaller = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
			Graphics2D g = imgSmaller.createGraphics();
			g.clearRect(0, 0, imgSmaller.getWidth(), imgSmaller.getHeight());
			g.drawImage(originalPhoto.getScaledInstance(targetWidth, targetHeight, Image.SCALE_SMOOTH), 0, 0, null);
			/*
			 * // Oriente l'image comme il faut AffineTransform transfo =
			 * ImageUtils.getExifTransformation(originalPhotoInfos);
			 * AffineTransformOp op = new AffineTransformOp(transfo,
			 * AffineTransformOp.TYPE_BICUBIC); // FIXME faire marcher
			 * l'orientation // imgSmaller = op.filter(originalPhoto,
			 * imgSmaller);
			 */
			// Ecrit l'image dans le répertoire
			ImageIO.write(imgSmaller, "jpg", _outputPhoto);

		} catch (IOException e) {
			throw new PhotoServicesException(e.getMessage(), e);
		} catch (ImageProcessingException e) {
			throw new PhotoServicesException(e.getMessage(), e);
		} catch (MetadataException e) {
			throw new PhotoServicesException("Could not get image orientation" + e.getMessage(), e);
		}
	}

	public static void main(String[] args) throws PhotoServicesException {
		new ImageReduceService().compressAlbum("album reduce");
	}

}
