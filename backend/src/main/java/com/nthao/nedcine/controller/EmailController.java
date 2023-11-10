package com.nthao.nedcine.controller;


import com.nthao.nedcine.entity.EmailDetails;
import com.nthao.nedcine.service.EmailService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Annotation
@RestController
@RequestMapping ("/api/v1/emails")
// Class
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping ("/sendMail")
    public Response sendMail(@RequestBody EmailDetails details) {
        long start = System.currentTimeMillis();
        try {
            emailService.sendEmail(details);
            return new Response(200, "Email send success!!", start);

        } catch (Exception e) {
            return new Response(400, "Email sended failed with :" + e.getMessage(), start);
        }

    }

    // Sending email with attachment
    @PostMapping ("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details) {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}