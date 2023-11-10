package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepsitory extends JpaRepository<Ticket,Long> {
    List<Ticket> findAllByOrOrderId(long orderId);
}
