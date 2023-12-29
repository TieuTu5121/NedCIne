package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.comments.CommentReQuestDto;
import com.nthao.nedcine.dto.comments.CommentResponseDto;
import com.nthao.nedcine.entity.Comment;
import com.nthao.nedcine.repository.CommentRepository;
import com.nthao.nedcine.repository.MovieRepository;
import com.nthao.nedcine.repository.UserRepository;
import com.nthao.nedcine.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    CommentRepository com;


    public CommentResponseDto commentMapper(Comment comment) {
        String formattedDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        return new CommentResponseDto()
                .builder()
                .id(comment.getId())
                .user(userRepository.findById(comment.getUserId()).get())
                .description(comment.getDescription())
                .rating(comment.getRating())
                .createdAt(formattedDate)
                .movie(movieRepository.findById(comment.getMovieId()).get())
                .build();
    }

    @Override
    public List<CommentResponseDto> getByMovie(int movieId) {
        List<Comment> comments = com.findCommentsByMovieId(movieId);
        List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentResponseDtos.add(commentMapper(comment));

        }
        return commentResponseDtos;
    }

    @Override
    public String createComment(CommentReQuestDto commentReQuestDto) {
        String state = "";
        // Kiểm tra xem đã tồn tại comment cho user và movie chưa
        boolean hasComment = com.existsByUserIdAndMovieId(
                commentReQuestDto.getUserId(), commentReQuestDto.getMovieId());

        if (hasComment) {
            state = "HAD";
            return state;// Đã có comment cho user và movie này
        }

        boolean hasBooking = com.existsCommentByUserIdWithBooking(
                commentReQuestDto.getUserId(), commentReQuestDto.getMovieId());

        if (!hasBooking) {
            state = "NOT BOOKING";
            return state;// User chưa đặt vé cho movie này
        }
        String formattedDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        // Tạo đối tượng Comment và lưu vào cơ sở dữ liệu
        Comment comment = com.save( new Comment()
                .builder()
                .userId(commentReQuestDto.getUserId())
                .createdAt(formattedDate)
                .movieId(commentReQuestDto.getMovieId())
                .description(commentReQuestDto.getDescription())
                .rating(commentReQuestDto.getRating())
                .build());

        return state;
    }

}
