package br.edu.ufop.web.gateway.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class GatewayApiConfig {
    @Value("${gateway.frontend.uri}")
    private String frontEndUri;

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("users-api", pred ->
                        pred.path("/api/users/**").filters(filter ->
                                        filter.rewritePath("/api/users", "/users"))
                                .uri("lb://users-service")
                )

                .route("users", pred ->
                        pred.path("/users/**").uri("lb://users-service")
                )

                .route("sales", pred ->
                        pred.path("/sales/**")
                                .filters(filter -> filter.rewritePath("/sales/(?<segment>.*)", "/${segment}"))
                                .uri("lb://sales-service")
                )

                .route("frontend", pred ->
                        pred.path("/**").uri(this.frontEndUri)
                )

                .build();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // URL do seu Vite/React
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}