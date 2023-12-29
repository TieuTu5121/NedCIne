package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.user.UserRegisterDto;
import com.nthao.nedcine.dto.user.UserLoginDto;
import com.nthao.nedcine.dto.user.UserResponseDto;
import com.nthao.nedcine.contants.Role;
import com.nthao.nedcine.dto.user.UserUpdateDto;
import com.nthao.nedcine.entity.Order;
import com.nthao.nedcine.entity.UserEntity;
import com.nthao.nedcine.repository.UserRepository;
import com.nthao.nedcine.service.UserService;
import com.nthao.nedcine.util.UserProfileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtServiceImpl jwtService;
    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public UserResponseDto userMapper(UserEntity user) {
        Set<String> roleNames = user.getAuthorities()
                .stream()
                .map(role -> role.toString()) // Assuming Role is an enum with a 'name()' method
                .collect(Collectors.toSet());
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .address(user.getAddress())
                .sex(user.getSex())
                .role(StringUtils.collectionToCommaDelimitedString(roleNames))
                .phone(user.getPhone())
                .build();
    }

    @Override
    public UserResponseDto register(UserRegisterDto userCreateDto) {

        UserEntity newUser = userRepository.save(
                new UserEntity().builder()
                        .username(userCreateDto.getUsername())
                        .email(userCreateDto.getEmail())
                        .password(passwordEncoder.encode(userCreateDto.getPassword()))
                        .roles(Collections.singleton(Role.USER))
                        .build());
        return userMapper(newUser);
    }

    @Override
    public Map<String, Object> login(UserLoginDto userLoginDto) {
        if (Objects.isNull(userLoginDto)) throw new RuntimeException("Something went wrong");
        if (userLoginDto.getEmail().isEmpty()) throw new RuntimeException("Email is not null!");
        if (userLoginDto.getPassword().isEmpty()) throw new RuntimeException("Password is not null!");
        Map<String, Object> req = new HashMap<>();
        UserEntity user = userRepository.getUserByEmail(userLoginDto.getEmail());
        if (Objects.nonNull(user) && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            String idRefreshToken = jwtService.generateToken(userLoginDto.getEmail());
            req.put("id_refresh_token", idRefreshToken);
            req.put("user", user);
            req.put("role", user.getRoles());
        } else {
            req.put("message", "Incorrect email or password");
        }
        return req;
    }

    @Override
    public UserResponseDto profile() {
        Long userId = UserProfileUtils.getUserId();
        UserResponseDto userResponseDto = new UserResponseDto();
        UserEntity user = userRepository.getById(userId);

        if (Objects.isNull(user)) {
            throw new RuntimeException("User not found!");
        }

        userResponseDto.setId(user.getId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setUsername(user.getUsername());
        return userResponseDto;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        List<UserResponseDto> userResponseDtos = new ArrayList<>();

        try {
            List<UserEntity> userEntities = userRepository.findAll();

            for (UserEntity user : userEntities) {
                userResponseDtos.add(userMapper(user));
            }
        } catch (Exception exception) {
            throw new RuntimeException("error getAll user");
        }
        return userResponseDtos;
    }

    @Override
    public void updateUserById(long id, UserUpdateDto userUpdateDto) {
        UserEntity user = userRepository.findById(id).get();
        Set<Role> roles = EnumSet.of(Role.valueOf(userUpdateDto.getRole()));
        if (user != null) {
            user.setUsername(userUpdateDto.getUsername());
            user.setEmail(userUpdateDto.getEmail());
            user.setAddress(userUpdateDto.getAddress());
            user.setBirthday(userUpdateDto.getBirthday());
            user.setSex(userUpdateDto.getSex());
            user.setRoles(roles);
            user.setPhone(userUpdateDto.getPhone());
            userRepository.save(user);
        }
    }
    @Override
    public  void updateRoleById(long id,String role){
        UserEntity user = userRepository.findById(id).get();
        Set<Role> roles = EnumSet.of(Role.valueOf(role));

        if (user!=null){
            user.setRoles(roles);
            userRepository.save(user);
        }
    }


}
