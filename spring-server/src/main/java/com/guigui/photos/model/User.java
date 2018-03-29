package com.guigui.photos.model;

public class User {

	private String username;
	private String sha1Password;

	public User() {
	}

	public User(String name, String sha1Password) {
		super();
		this.username = name;
		this.sha1Password = sha1Password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getSha1Password() {
		return sha1Password;
	}

	public void setSha1Password(String sha1Password) {
		this.sha1Password = sha1Password;
	}

	@Override
	public String toString() {
		return "User [username=" + username + "; sha1Password=" + sha1Password + "]";
	}

}
