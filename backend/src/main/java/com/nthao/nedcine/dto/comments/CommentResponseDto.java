package com.nthao.nedcine.dto.comments;

import com.nthao.nedcine.entity.Movie;
import com.nthao.nedcine.entity.UserEntity;
import lombok.*;
import org.apache.catalina.User;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
    private long id;
    private UserEntity user;
    private Movie movie;
    private int rating;
    private String description;
    private String createdAt;

}
