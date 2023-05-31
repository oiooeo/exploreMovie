// TMDB API KEY
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTU4YzgzNGRjNWU5ZTk4MmNkNWU5YzYyMWQ3ZjEzYiIsInN1YiI6IjY0NzA5ZWM1NTQzN2Y1MDBjMzI4MzY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ohD6y4xS5i0GFnbWHvCuUNrNPvenh2u3bCJLYPxKSA0",
  },
};

let resultArray = [];

// Top Rated 영화 목록 받기
// index.html id="movies" 부분에 카드 추가 (forEach 사용)
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((movie) => {
      resultArray.push({
        id: movie.id,
        title: movie.title,
        img: movie.poster_path,
        desc: movie.overview,
        rate: movie.vote_average,
      });

      let id = movie["id"];
      let title = movie["title"];
      let img = movie["poster_path"];
      let desc = movie["overview"];
      let rate = movie["vote_average"];

      let temp_html = `<div class="movie-card" onclick="alert('${title}의 영화 ID는 ${id} 입니다');">
                        <img
                          class="movie_img"
                          src="https://image.tmdb.org/t/p/original${img}"
                          alt=""
                        />
                        <p class="movie_name"><b>${title}</b></p>
                        <p class="movie_desc">${desc}</p>
                        <p class="movie_rate">평점 | <b>${rate}</b></p>
                      </div>`;

      document
        .querySelector("#movies")
        .insertAdjacentHTML("beforeend", temp_html);
    });
  })
  .catch((err) => console.error(err));

console.log(resultArray);
