package com.sq022groupA.escalayt.config;

import com.sq022groupA.escalayt.entity.model.Admin;
import com.sq022groupA.escalayt.entity.model.User;
import com.sq022groupA.escalayt.repository.AdminRepository;
import com.sq022groupA.escalayt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(){
//        return username -> adminRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return username -> {
            Optional<Admin> adminOptional = adminRepository.findByUsername(username);
            if (adminOptional.isPresent()) {
                return adminOptional.get();
            }

            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isPresent()) {
                return userOptional.get();
            }

            throw new UsernameNotFoundException("User not found");
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
