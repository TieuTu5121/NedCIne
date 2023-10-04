import http from "../configs/http";

const movieApi = {
  getAllMovies: async () => await http.get("movies"),

  getMovieById: async (id) => await http.get(`movies/${id}`),

  createMovie: async (movieRequestDto) =>
    await http.post("movies", movieRequestDto),

  updateMovie: async (id, movieRequestDto) =>
    http.put(`movies/${id}`, movieRequestDto),

  deleteMovie: async (id) => http.delete(`movies/${id}`),
};

export default movieApi;
