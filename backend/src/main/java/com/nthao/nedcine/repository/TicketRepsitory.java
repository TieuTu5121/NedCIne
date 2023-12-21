package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface TicketRepsitory extends JpaRepository<Ticket,Long> {
    List<Ticket> findAllByOrOrderId(long orderId);
    @Query(value = "SELECT * from tickets ticket  where ticket.order_id = :orderId limit 1", nativeQuery = true)
    Ticket findOneByOrderId(long orderId);
}
