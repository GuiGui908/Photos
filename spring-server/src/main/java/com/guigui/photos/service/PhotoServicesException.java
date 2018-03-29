package com.guigui.photos.service;

public class PhotoServicesException extends Exception {

	private static final long serialVersionUID = -2021923523265572661L;

	public PhotoServicesException() {
	}

	public PhotoServicesException(String message) {
		super(message);
	}

	public PhotoServicesException(Throwable cause) {
		super(cause);
	}

	public PhotoServicesException(String message, Throwable cause) {
		super(message, cause);
	}

}
