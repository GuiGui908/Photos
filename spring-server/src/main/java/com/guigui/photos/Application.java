package com.guigui.photos;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}

	/*
	 * TODO Externaliser dans un ficheir de conf. Une valeur pour les tests
	 * JUnit : "src/test/resources/storage" Une valeur pour le lancement normal
	 * dans le workspace Eclipse : "src\test\resources\storage" Une valeur pour
	 * le déploiement (voir où mettre le fichier de conf dans l'arborescence
	 * Tomcat)
	 * 
	 */
	public static final File STORAGE_FOLDER = new File("/home/dietpi/photos/storage");
	// public static final File STORAGE_FOLDER = new
	// File("src/test/resources/storage");

	public static void main(String[] args) {

		if (!STORAGE_FOLDER.exists() || !STORAGE_FOLDER.isDirectory()) {
			System.out.println("Folder does not exists or is not a directory : " + STORAGE_FOLDER);
			return;
		}

		SpringApplication.run(Application.class, args);
	}
}
