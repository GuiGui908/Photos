package com.guigui.photos.auth;

import static com.guigui.photos.auth.SecurityConstants.PUBLIC_URLS;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	private UserDetailsService userDetailsService;

	public WebSecurity(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Configuration des connexions entrantes
		http
				// OSEF de CORS et CSRF
				.cors().and().csrf().disable()
				// Autorise les URL qui n'ont pas besoin d'autentification
				.authorizeRequests().antMatchers(HttpMethod.GET, PUBLIC_URLS).permitAll()
				// Authent : la connection
				.anyRequest().authenticated().and().addFilter(getJWTAuthenticationFilter())
				// Autorisation : vérifier qu'on a le droit à une page donnée
				.addFilter(new JWTAuthorizationFilter(authenticationManager()))
				// Désactive la création de session dans Spring Security
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	/**
	 * Fonction qui renvoie un Filter. Elle permet de customiser l'URL de login
	 * 
	 * @return
	 * @throws Exception
	 */
	private Filter getJWTAuthenticationFilter() throws Exception {
		final JWTAuthenticationFilter filter = new JWTAuthenticationFilter(authenticationManager());
		filter.setFilterProcessesUrl("/api/login");
		return filter;
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
		return source;
	}
}