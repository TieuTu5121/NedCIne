package com.nthao.nedcine.dto.comments;

import lombok.*;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentReQuestDto {
    private long userId;
    private int movieId;
    private int rating;
    private String description;
    private String createdAt;

}
