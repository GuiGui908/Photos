package com.guigui.photos.auth.fails;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.guigui.photos.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

@RestController
public class AuthController {

	SignatureAlgorithm algo = SignatureAlgorithm.HS256;
	byte[] key = "clé privée de l'application".getBytes();

	@PostMapping(path = "/auth", consumes = "application/json", produces = "text/html")
	public String authenticate(@RequestBody User user, HttpServletResponse response) {

		System.out.println(user);
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.HOUR, 2);
		String jwt = Jwts.builder().setIssuer("http://trustyapp.com/").setIssuedAt(new Date())
				.setSubject(user.getUsername() + "/" + user.getSha1Password()).setExpiration(cal.getTime())
				.claim("scope", "self api/buy").signWith(algo, new SecretKeySpec(key, algo.getJcaName())).compact();
		System.out.println(jwt);

		Cookie authCookie = new Cookie("Bareer", jwt);
		authCookie.setSecure(true);
		authCookie.setHttpOnly(true);
		response.addCookie(authCookie);

		return jwt;
	}

	public boolean verifyJWT(String jwt) {
		try {
			// This line will throw an exception if it is not a signed JWS
			Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(jwt).getBody();
			System.out.println("ID: " + claims.getId());
			System.out.println("Subject: " + claims.getSubject());
			System.out.println("Issuer: " + claims.getIssuer());
			System.out.println("Expiration: " + claims.getExpiration());
		} catch (SignatureException e) {
			System.out.println(e.getMessage() + e);
			return false;
		}
		return true;
	}
}
