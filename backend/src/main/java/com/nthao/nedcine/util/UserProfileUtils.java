package com.nthao.nedcine.util;

import com.nthao.nedcine.dto.auth.UserPrincipal;
import com.nthao.nedcine.entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class UserProfileUtils {
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static UserEntity getUserPrincipal() {
        UserEntity userEntity = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Optional) {
            userEntity = ((Optional<UserEntity>) authentication.getPrincipal()).get();

        }
        return userEntity;
    }

    public static String getEmailLogin() {
        return getUserPrincipal() != null ? getUserPrincipal().getEmail() : null;
    }

    public static Long getUserId() {
        return getUserPrincipal() != null ? getUserPrincipal().getId() : null;
    }


}
