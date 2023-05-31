// TMDB API KEY
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTU4YzgzNGRjNWU5ZTk4MmNkNWU5YzYyMWQ3ZjEzYiIsInN1YiI6IjY0NzA5ZWM1NTQzN2Y1MDBjMzI4MzY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ohD6y4xS5i0GFnbWHvCuUNrNPvenh2u3bCJLYPxKSA0",
  },
};

const resultArray = [];
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_btn");

// Top Rated 영화 목록 받기
// index.html id="movies" 부분에 카드 추가 (forEach 사용)
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((movie) => {
      resultArray.push(movie);

      let temp_html = `<div class="movie-card" onclick="alert('${movie.title}의 영화 ID는 ${movie.id} 입니다');">
                        <img
                          class="movie_img"
                          src="https://image.tmdb.org/t/p/original${movie.poster_path}"
                          alt=""
                        />
                        <p class="movie_name"><b>${movie.title}</b></p>
                        <p class="movie_desc">${movie.overview}</p>
                        <p class="movie_rate">평점 | <b>${movie.vote_average}</b></p>
                      </div>`;

      document
        .querySelector("#movies")
        .insertAdjacentHTML("beforeend", temp_html);
    });

    // 검색
    searchButton.addEventListener("click", () => {
      document.querySelector("#movies").innerHTML = "";

      const searchTerm = searchInput.value.toLowerCase();
      const filteredMovies = resultArray.filter((resultArray) =>
        resultArray.title.toLowerCase().includes(searchTerm)
      );

      if (filteredMovies.length >= 1) {
        document
          .querySelector(".info-card")
          .setAttribute("style", "display: flex");
        document.querySelector(".info-card").textContent =
          "검색 결과 : " + filteredMovies.length + "개";

        filteredMovies.forEach((movie) => {
          let search_html = `<div class="movie-card" onclick="alert('${movie.title}의 영화 ID는 ${movie.id} 입니다');">
                              <img
                                class="movie_img"
                                src="https://image.tmdb.org/t/p/original${movie.poster_path}"
                                alt=""
                              />
                              <p class="movie_name"><b>${movie.title}</b></p>
                              <p class="movie_desc">${movie.overview}</p>
                              <p class="movie_rate">평점 | <b>${movie.vote_average}</b></p>
                            </div>`;

          document
            .querySelector("#movies")
            .insertAdjacentHTML("beforeend", search_html);
        });
      } else {
        document
          .querySelector(".info-card")
          .setAttribute("style", "display: flex");
        document.querySelector(".info-card").textContent =
          "검색 결과가 없습니다";
      }
    });
  })
  .catch((err) => console.error(err));
