package com.guigui.photos;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	// Valeur initiale pour les tests JUnit...
	public static File STORAGE_FOLDER = new File("src/test/resources/storage");

	public static void main(String[] args) {

		if (args.length == 0) {
			System.out.println("No parameter specified. 1 required : the storage path");
			return;
		}
		STORAGE_FOLDER = new File(args[0]);
		if (!STORAGE_FOLDER.exists() || !STORAGE_FOLDER.isDirectory()) {
			System.out.println("Folder does not exists or is not a directory : " + STORAGE_FOLDER);
			return;
		}

		SpringApplication.run(Application.class, args);
	}
}
