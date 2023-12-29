import axios from "axios";
import http from "../configs/http";

const commentApi = {
  getCommentsByMovie: async (movieId) => {
    const response = await http.get(`comments/get-by-movie/${movieId}`);
    return response;
  },

  createComment: async (commentReQuestDto) => {
    const response = await http.post(
      "comments/create-comment",
      commentReQuestDto
    );
    return response;
  },
};

export default commentApi;
