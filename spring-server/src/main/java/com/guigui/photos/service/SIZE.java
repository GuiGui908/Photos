package com.guigui.photos.service;

/**
 * Taille de l'image. C'est aussi le nom du répertoire dans le dossier de
 * l'album
 * 
 * @author GuiGui
 *
 */
public enum SIZE {
	MAX(1500, 800), MIN(110, 110), ORIGINAL(0, 0);

	/** Plus grande largeur que peut avoir une image de cette taille */
	private int tallestWidth;

	/** Plus grande hauteur que peut avoir une image de cette taille */
	private int tallestHeight;

	private SIZE(int tallestWidth, int tallestHeight) {
		this.tallestWidth = tallestWidth;
		this.tallestHeight = tallestHeight;
	}

	public int getTallestWidth() {
		return tallestWidth;
	}

	public int getTallestHeight() {
		return tallestHeight;
	}

}