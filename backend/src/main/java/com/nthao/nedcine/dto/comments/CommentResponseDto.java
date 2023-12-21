package com.nthao.nedcine.dto.comments;

import com.nthao.nedcine.entity.Movie;
import lombok.*;
import org.apache.catalina.User;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    private User user;
    private Movie movie;
    private int rating;
    private String description;
    private String createdAt;

}
