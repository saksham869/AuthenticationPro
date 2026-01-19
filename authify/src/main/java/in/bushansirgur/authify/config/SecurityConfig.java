package in.bushansirgur.authify.config;

import in.bushansirgur.authify.filter.JwtRequestFilter;
import in.bushansirgur.authify.service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    /**
     * Main Security Filter Chain
     * Stateless JWT + CORS + Protected APIs
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS with our custom configuration
                .cors(Customizer.withDefaults())

                // Disable CSRF (stateless JWT API)
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints (no auth required)
                        .requestMatchers(
                                "/api/v1.0/login",
                                "/api/v1.0/register",
                                "/api/v1.0/send-reset-otp",
                                "/api/v1.0/reset-password",
                                "/api/v1.0/verify-otp",
                                "/api/v1.0/logout"
                        ).permitAll()

                        // Health check for monitoring
                        .requestMatchers("/actuator/health").permitAll()

                        // Swagger docs (disable in production)
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // Stateless session management (JWT)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Disable logout (JWT tokens are client-side)
                .logout(AbstractHttpConfigurer::disable)

                // Add JWT Filter BEFORE UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)

                // Custom 401/403 error responses
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint(customAuthenticationEntryPoint)
                );

        return http.build();
    }

    /**
     * BCrypt Password Encoder (12+ rounds by default)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);  // Strength 12 is production standard
    }

    /**
     * CORS Configuration for React Frontend
     * Allows http://localhost:5173 (Vite dev server)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:5173", "http://localhost:3000"));  // Vite + CRA
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));  // All headers including Authorization
        config.setAllowCredentials(true);        // Cookies + Authorization header
        config.setMaxAge(3600L);                 // 1 hour cache

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * Authentication Manager with UserDetailsService + PasswordEncoder
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(appUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }
}
