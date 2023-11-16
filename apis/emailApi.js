import axios from "axios";
import http from "../configs/http";

const emailApi = {
  sendEmail: async (emailDetails) => {
    const response = await http.post("/emails/sendMail", emailDetails);
    return response;
  },
  sendMailWithAttachment: async (emailDetails) => {
    const response = await http.post(
      "/emails/sendMailWithAttachment",
      emailDetails
    );
    return response;
  },
};

export default emailApi;
