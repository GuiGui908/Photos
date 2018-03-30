package com.guigui.photos.auth;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import org.apache.commons.codec.binary.Hex;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) {
		String password = "";

		System.out.println("loadUserByUsername(" + username + "); anonyme/guigui ou admin/toornimda ou **/default");
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			if ("anonyme".equals(username)) {
				password = new String(Hex.encodeHex(md.digest("guigui".getBytes())));
			} else if ("admin".equals(username)) {
				password = new String(Hex.encodeHex(md.digest("toornimda".getBytes())));
			} else {
				password = new String(Hex.encodeHex(md.digest("default".getBytes())));
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return new User(username, password, new ArrayList<>());
	}
}