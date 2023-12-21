package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.comments.CommentReQuestDto;
import com.nthao.nedcine.dto.comments.CommentResponseDto;
import com.nthao.nedcine.service.CommentService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/get-by-movie/{movieId}")
    public Response getCommentsByMovie(@PathVariable Integer movieId) {
        long start = System.currentTimeMillis();
        List<CommentResponseDto> commentResponseDtos = commentService.getByMovie(movieId);
        return new Response(commentResponseDtos, start);
    }

    @PostMapping("/create-comment")
    public Response createComment(@RequestBody CommentReQuestDto commentReQuestDto) {
        long start = System.currentTimeMillis();
        String state = commentService.createComment(commentReQuestDto);
        if ("HAD".equals(state)) {
            return new Response(400, "User has already commented on this movie", start);
        } else if ("NOT BOOKING".equals(state)) {
            return new Response(400, "User has not booked tickets for this movie", start);
        } else {
            return new Response(200, "Comment created successfully", start);
        }
    }
}
