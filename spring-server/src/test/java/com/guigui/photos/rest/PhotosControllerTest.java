package com.guigui.photos.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PhotosControllerTest {

	private static final String AUTHORIZATION = "Authorization";
	private static final String JWT_TOKEN = "Bearer "
			+ "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbm9ueW1lIiwiZXhwIjoxNTUyMzAwMTE2fQ"
			+ ".jfbBxTtkgD1u3SpQlDGLk0o47qbnRnu09fM08XdlZ-MRWZybbYjnXKk3T3V3ein5vo-v1aQBP4h8teb8sf1dng";

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testLogin() throws Exception {
		System.out.println("==================== testLogin ====================");
		// Do not accept GET method
		this.mockMvc.perform(get("/login")).andExpect(status().isForbidden());

		// Do not authenticate wrong password
		Map<String, String> postData = new HashMap<>();
		postData.put("username", "anonyme");
		postData.put("sha1Password", "wrongPassword");
		this.mockMvc.perform(
				post("/login").contentType(MediaType.APPLICATION_JSON).content(JSONObject.toJSONString(postData)))
				.andExpect(status().isUnauthorized());

		// Success
		postData.put("sha1Password", "b81d9d756d5930ce7004a794df01196c26c77e0e");
		this.mockMvc
				.perform(post("/login").contentType(MediaType.APPLICATION_JSON)
						.content(JSONObject.toJSONString(postData)))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
	}

	@Test
	public void testAllAlbums() throws Exception {
		System.out.println("==================== testAllAlbums ====================");
		JSONArray expectedListOfAlbums = new JSONArray();
		expectedListOfAlbums.add("album caracteres chelous !!");
		expectedListOfAlbums.add("album1");
		expectedListOfAlbums.add("albumSansEspaceSansPhotos");
		this.mockMvc.perform(get("/allAlbums").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isOk()).andExpect(jsonPath("$").value(expectedListOfAlbums));
	}

	@Test
	public void testAlbumPhoto() throws Exception {
		System.out.println("==================== testAlbumPhoto ====================");
		// Test avec un répertoire inexistant
		this.mockMvc.perform(get("/album/inexistant").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isBadRequest());

		// Test avec un répertoire vide
		JSONArray expectedListOfPhotos = new JSONArray();
		this.mockMvc.perform(get("/album/albumSansEspaceSansPhotos").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isOk()).andExpect(jsonPath("$").value(expectedListOfPhotos));

		// Succes
		expectedListOfPhotos.add("320 SI.jpg");
		expectedListOfPhotos.add("911.jpg");
		expectedListOfPhotos.add("911_2.jpg");
		expectedListOfPhotos.add("aerodynamic.jpg");
		expectedListOfPhotos.add("amphibie_jpg.jpg");
		expectedListOfPhotos.add("Apprendre à chier sur les piétons.bmp");
		expectedListOfPhotos.add("Argentées.jpg");
		expectedListOfPhotos.add("Aston-Martin-One-77-2009.jpg");
		expectedListOfPhotos.add("Audi A6 (2).jpg");
		this.mockMvc.perform(get("/album/album1").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isOk()).andExpect(jsonPath("$").value(expectedListOfPhotos));
	}

	@Test
	public void testPhoto() throws Exception {
		System.out.println("==================== testPhoto ====================");
		this.mockMvc.perform(get("/album/album1/photo/manqueUnParametre").header(AUTHORIZATION, JWT_TOKEN))
				.andDo(print()).andExpect(status().isNotFound());

		this.mockMvc.perform(get("/album/album1/photo/photoInexistante/MIN").header(AUTHORIZATION, JWT_TOKEN))
				.andDo(print()).andExpect(status().isBadRequest());

		this.mockMvc.perform(get("/album/album1/photo/911.jpg/mauvaiseTaille").header(AUTHORIZATION, JWT_TOKEN))
				.andDo(print()).andExpect(status().isBadRequest());

		this.mockMvc.perform(get("/album/album1/photo/911.jpg/MAX").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isBadRequest());

		this.mockMvc.perform(get("/album/album1/photo/911.jpg/MIN").header(AUTHORIZATION, JWT_TOKEN)).andDo(print())
				.andExpect(status().isBadRequest());

		// Succes
		this.mockMvc.perform(get("/album/album1/photo/911.jpg/ORIGINAL").header(AUTHORIZATION, JWT_TOKEN))
				.andDo(print()).andExpect(status().isOk());

	}

}
