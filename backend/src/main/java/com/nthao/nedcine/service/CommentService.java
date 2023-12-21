package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.comments.CommentReQuestDto;
import com.nthao.nedcine.dto.comments.CommentResponseDto;

import java.util.List;

public interface CommentService {

    List<CommentResponseDto> getByMovie(int movieId);

    String  createComment(CommentReQuestDto commentReQuestDto);
}
