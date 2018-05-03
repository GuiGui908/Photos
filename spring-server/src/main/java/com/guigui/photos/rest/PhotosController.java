package com.guigui.photos.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.guigui.photos.Application;
import com.guigui.photos.model.Album;
import com.guigui.photos.service.ImageReduceService;
import com.guigui.photos.service.PhotoServicesException;
import com.guigui.photos.service.SIZE;

/**
 * Class qui expose les websrvices des pages de l'Album Photos
 * 
 * @author GuiGui
 *
 */
@CrossOrigin(origins = "http://lalainaetguillaume.zapto.org/ng")
@RestController
public class PhotosController {

	@Autowired
	private ImageReduceService imageReduce;

	@RequestMapping(value = "/allAlbums", method = RequestMethod.GET)
	public List<Album> allAlbums() {
		List<String> fileNames = getAlbumNames();

		// Affiche les noms trouvés
		//fileNames.forEach(System.out::print);

		List<Album> albums = fileNames.stream().map(a -> new Album(a, getAlbumPhotos(a).size()))
				.collect(Collectors.toList());

		return albums;
	}

	@RequestMapping(value = "/album/compress/{albumName}", method = RequestMethod.GET)
	public ResponseEntity<String> compressAlbumPhoto(@PathVariable(value = "albumName") String albumName) {

		String errors = "";
		try {
			errors = imageReduce.compressAlbum(albumName);
		} catch (PhotoServicesException e) {
			errors = e.getMessage();
			System.out.println(e.getMessage() + '\n' + e.getStackTrace());
		}

		if (errors.length() != 0) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
		}
		return ResponseEntity.ok().build();
	}

	@RequestMapping(value = "/album/{albumName}", method = RequestMethod.GET)
	public ResponseEntity<List<String>> albumPhoto(@PathVariable(value = "albumName") String albumName) {
		// Vérifie que l'album existe
		if (!getAlbumNames().contains(albumName)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		List<String> fileNames = getAlbumPhotos(albumName);

		// Affiche les noms trouvés
		//fileNames.forEach(System.out::print);
		System.out.println("Affiche l'album " + albumName);

		return ResponseEntity.ok(fileNames);
	}

	@RequestMapping(value = "/album/{albumName}/photo/{photoName}/{size}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> photo(@PathVariable(value = "albumName") String albumName,
			@PathVariable(value = "photoName") String photoName, @PathVariable(value = "size") SIZE size) {
		// Vérifie que l'album et la photo existent
		if (getAlbumNames().contains(albumName) && getAlbumPhotos(albumName).contains(photoName)) {
			Path photoPath = Paths.get(Application.STORAGE_FOLDER.getAbsolutePath()).resolve(albumName)
					.resolve(size.toString()).resolve(photoName);
			try (FileInputStream is = new FileInputStream(photoPath.toFile())) {
				return ResponseEntity.ok(IOUtils.toByteArray(is));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

	private List<String> getAlbumNames() {
		return
		// Get a list from the array
		Arrays.asList(Application.STORAGE_FOLDER.listFiles())
				// convert list to stream
				.stream()
				// Just keep the directories
				.filter(file -> file.isDirectory())
				// Get the name for each file
				.map(File::getName)
				// Trie la liste dans l'ordre naturel
				.sorted()
				// collect the output and convert streams to a List
				.collect(Collectors.toList());
	}

	private List<String> getAlbumPhotos(String albumName) {
		File albumFolder = new File(Application.STORAGE_FOLDER.getAbsolutePath(),
				albumName + File.separator + SIZE.MIN);
		if (!albumFolder.isDirectory()) {
			return new ArrayList<>(0);
		}
		return
		// Get a list from the array
		Arrays.asList(albumFolder.listFiles())
				// convert list to stream
				.stream()
				// Just keep the directories
				.filter(file -> file.isFile())
				// Get the name for each file
				.map(File::getName)
				// collect the output and convert streams to a List
				.collect(Collectors.toList());
	}
}
