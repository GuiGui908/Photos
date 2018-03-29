package com.guigui.photos.auth;

import static com.guigui.photos.auth.SecurityConstants.EXPIRATION_TIME;
import static com.guigui.photos.auth.SecurityConstants.HEADER_STRING;
import static com.guigui.photos.auth.SecurityConstants.SECRET;
import static com.guigui.photos.auth.SecurityConstants.TOKEN_PREFIX;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.guigui.photos.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			String body = getStringFromInputStream(request.getInputStream());
			User user = new ObjectMapper().readValue(body, User.class);
			System.out.println("attempt authentication of " + user.getUsername() + "/" + user.getSha1Password());

			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),
					user.getSha1Password(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		String token = Jwts.builder()
				.setSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SECRET.getBytes()).compact();
		System.out.println("successful authentication. Token is " + token);
		response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getOutputStream()
				.write(new String("{\"" + TOKEN_PREFIX + "\":\"" + token + "\"}").getBytes(Charset.forName("UTF-8")));
	}

	/**
	 * Converti l'InputStream en String
	 * 
	 * @param is
	 * @return
	 */
	private String getStringFromInputStream(InputStream is) {

		BufferedReader br = null;
		StringBuilder sb = new StringBuilder();
		String line;
		try {
			br = new BufferedReader(new InputStreamReader(is));
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return sb.toString();
	}
}