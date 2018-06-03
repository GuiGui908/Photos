package com.guigui.photos.auth;

public class SecurityConstants {

	// Expiration du token (1 heure)
	public static final long EXPIRATION_TIME = 3_600_000L;// 3_600_000;

	public static final String HEADER_STRING = "Authorization";

	public static final String SECRET = "SecretKeyToGenJWTs";

	public static final String TOKEN_PREFIX = "Bearer ";

	// Cette URL est publique, les autres sont filtrées
	public static final String[] PUBLIC_URLS = { "/public", "/*.html", "/*.css", "/*.js" };
}
