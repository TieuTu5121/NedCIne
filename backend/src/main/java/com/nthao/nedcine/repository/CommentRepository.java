package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query ("select comment from Comment comment where comment.movieId =:movieId")
    List<Comment> findCommentsByMovieId(int movieId);

    @Query ("SELECT COUNT(c) > 0 FROM Comment c WHERE c.userId = :userId AND c.movieId = :movieId")
    boolean existsByUserIdAndMovieId(long userId, int movieId);

    @Query (value = "SELECT count(*) > 0 as booking\n" +
            "          FROM  orders\n" +
            "        JOIN tickets tickets ON orders.id = tickets.order_id\n" +
            "         JOIN seat_settings seatsettings ON tickets.seat_setting_id = seatsettings.id\n" +
            "               JOIN show_times showtimes ON seatsettings.showtime_id = showtimes.id\n" +
            "        where orders.user_id = :userId and  showtimes.movie = :moiveId  ", nativeQuery = true)
    boolean existsCommentByUserIdWithBooking(long userId,int moiveId);

}
