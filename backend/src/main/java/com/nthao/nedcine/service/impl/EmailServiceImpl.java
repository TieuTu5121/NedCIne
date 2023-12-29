package com.nthao.nedcine.service.impl;


import com.nthao.nedcine.entity.EmailDetails;
import com.nthao.nedcine.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

// Annotation
@Service
// Class
// Implementing EmailService interface
public class EmailServiceImpl implements EmailService {

    @Autowired
    private MailSender mailSender;
    @Autowired
    private JavaMailSender javaMailSender;

    @Value ("${spring.mail.username}")
    private String sender;

    @Override
    public String sendSimpleMail(EmailDetails details) {
        return null;
    }

    // Method 1
    // To send a simple email
    public void sendEmail(EmailDetails emailDetails) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailDetails.getRecipient());
            helper.setSubject(emailDetails.getSubject());
            // Chuyển đổi nội dung React JSX thành chuỗi HTML ở đây
            String htmlContent = "<html>\n" +
                    "\n" +
                    "<head>\n" +
                    "    <title>Xác Nhận Đặt Vé</title>\n" +
                    "    <style>\n" +
                    "        body {\n" +
                    "            font-family: 'Arial', sans-serif;\n" +
                    "            background-color: #f4f4f4;\n" +
                    "            color: #333;\n" +
                    "        }\n" +
                    "\n" +
                    "        .email-container {\n" +
                    "            max-width: 600px;\n" +
                    "            margin: 0 auto;\n" +
                    "            padding: 20px;\n" +
                    "            background-color: #fff;\n" +
                    "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                    "        }\n" +
                    "\n" +
                    "        h1 {\n" +
                    "            color: #e44d26;\n" +
                    "        }\n" +
                    "\n" +
                    "        p {\n" +
                    "            line-height: 1.6;\n" +
                    "        }\n" +
                    "\n" +
                    "        .greeting {\n" +
                    "            font-size: 18px;\n" +
                    "            margin-bottom: 15px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .movie-title {\n" +
                    "            color: #007bff;\n" +
                    "            font-weight: bold;\n" +
                    "        }\n" +
                    "\n" +
                    "        .showtime {\n" +
                    "            font-style: italic;\n" +
                    "        }\n" +
                    "\n" +
                    "        .good-wishes {\n" +
                    "            color: #e44d26;\n" +
                    "            font-weight: bold;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body>\n" +
                    "    <div class=\"email-container\">\n" +
                    "        \n" +
                    "        <p class=\"greeting\">Chào bạn, {{name}}</p>\n" +
                    "            <p>Cảm ơn bạn đã đặt vé tại <strong style=\"color: red\">NEDCINE</strong> để xem phim \"<span class=\"movie-title\">{{movieTitle}}</span>\".</p>\n" +
                    "        <p>Suất chiếu của bạn được lên lịch vào lúc \"<span class=\"showtime\">{{showtime}}</span>\".</p>\n" +
                    "        <p>Vui lòng đến đúng giờ để thưởng thức buổi chiếu.</p>\n" +
                    "        <p>Xem thêm thông tin chi tiết vé <a href={{linkOrder}} style=\"cursor:pointer;font-weight:bold;text-decoration: underline;\">tại đây</a></p>\n" +
                    "      \n" +
                    "        <p class=\"good-wishes\">Cảm ơn bạn và chúc bạn có những giờ phút thú vị tại rạp chiếu phim!</p>\n" +
                    "\n" +
                    "    </div>\n" +
                    "    <p>The Best,<br><span style=\"color:CornflowerBlue;font-weight:550\">NEDCINE</span></p>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>\n";

            helper.setText(htmlContent, true); // Đặt true để gửi email dưới định dạng HTML
            javaMailSender.send(message);
        } catch (MessagingException e) {
            return ;
        }

    }

    // Method 2
    // To send an email with attachment
    public String
    sendMailWithAttachment(EmailDetails details) {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                    file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
    public void sendBookingTickectEmail(EmailDetails emailDetails,String movieName, String username,String showtime,String linkOrder) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailDetails.getRecipient());
            helper.setSubject(emailDetails.getSubject());
            // Chuyển đổi nội dung React JSX thành chuỗi HTML ở đây
            String htmlContent = "<html>\n" +
                    "\n" +
                    "<head>\n" +
                    "    <title>NEDCINE - Xác Nhận Đặt Vé</title>\n" +
                    "    <style>\n" +
                    "        body {\n" +
                    "            font-family: 'Arial', sans-serif;\n" +
                    "            background-color: #f4f4f4;\n" +
                    "            color: #333;\n" +
                    "        }\n" +
                    "\n" +
                    "        .email-container {\n" +
                    "            max-width: 600px;\n" +
                    "            margin: 0 auto;\n" +
                    "            padding: 20px;\n" +
                    "            background-color: #fff;\n" +
                    "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                    "        }\n" +
                    "\n" +
                    "        h1 {\n" +
                    "            color: #e44d26;\n" +
                    "        }\n" +
                    "\n" +
                    "        p {\n" +
                    "            line-height: 1.6;\n" +
                    "        }\n" +
                    "\n" +
                    "        .greeting {\n" +
                    "            font-size: 18px;\n" +
                    "            margin-bottom: 15px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .movie-title {\n" +
                    "            color: #007bff;\n" +
                    "            font-weight: bold;\n" +
                    "        }\n" +
                    "\n" +
                    "        .showtime {\n" +
                    "            font-style: italic;\n" +
                    "        }\n" +
                    "\n" +
                    "        .good-wishes {\n" +
                    "            color: #e44d26;\n" +
                    "            font-weight: bold;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body>\n" +
                    "    <div class=\"email-container\">\n" +
                    "        \n" +
                    "        <p class=\"greeting\">Chào bạn,"+username+"</p>\n" +
                    "            <p>Cảm ơn bạn đã đặt vé tại <strong style=\"color: red\">NEDCINE</strong> để xem phim \"<span class=\"movie-title\">"+movieName+"</span>\".</p>\n" +
                    "        <p>Suất chiếu của bạn được lên lịch vào lúc \"<span class=\"showtime\">"+showtime+"</span>\".</p>\n" +
                    "        <p>Vui lòng đến đúng giờ để thưởng thức buổi chiếu.</p>\n" +
                    "        <p>Xem thêm thông tin chi tiết vé <a href="+linkOrder+" style=\"cursor:pointer;font-weight:bold;text-decoration: underline;\">tại đây</a></p>\n" +
                    "      \n" +
                    "        <p class=\"good-wishes\">Cảm ơn bạn và chúc bạn có những giờ phút thú vị tại rạp chiếu phim!</p>\n" +
                    "\n" +
                    "    </div>\n" +
                    "    <p>The Best,<br><span style=\"color:CornflowerBlue;font-weight:550\">NEDCINE</span></p>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>\n";

            helper.setText(htmlContent, true); // Đặt true để gửi email dưới định dạng HTML
            javaMailSender.send(message);
        } catch (MessagingException e) {
            return ;
        }

    }
}