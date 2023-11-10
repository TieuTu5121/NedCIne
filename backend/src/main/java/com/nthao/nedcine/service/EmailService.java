package com.nthao.nedcine.service;

import com.nthao.nedcine.entity.EmailDetails;

// Interface
public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);
void sendEmail(EmailDetails emailDetails);
    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}