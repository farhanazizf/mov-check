// $(document).ready(() => {
//   $("#homeTab").addClass("active");
// });

const urlAPI = "http://omdbapi.com";
const apiKey = "dca61bcc";

$(function () {
  $("#homeTab").addClass("active");
});

$("#homeTab").on("click", () => {
  $("#homeTab").addClass("active");
  $("#searchTitleTab").removeClass("active");

  $("#container-page-home").removeClass("d-none");
  $("#container-page-search").addClass("d-none");
  $("#container-page-details").addClass("d-none");
});

$("#searchTitleTab").on("click", () => {
  $("#searchTitleTab").addClass("active");
  $("#homeTab").removeClass("active");

  $("#container-page-home").addClass("d-none");
  $("#container-page-search").removeClass("d-none");
  $("#container-page-details").addClass("d-none");
});

function getMovies() {
  $.ajax({
    url: urlAPI,
    type: "get",
    dataType: "json",
    data: {
      apikey: apiKey,
      s: $("#input-search").val(),
    },
    beforeSend: function () {
      $("#container-card-movies").html(
        `<i class="fas fa-circle-notch fa-spin fa-5x"></i>`
      );
    },
    success: function (result) {
      $("#input-search").val("");
      if (result.Response === "True") {
        const movies = result.Search;

        const listMovies = movies.map((val) => {
          return `
            <div class="col-md-4 mb-4">
              <div class="card mb-2" style="width: 18rem; min-height: 600px">
                <img
                  src="${val.Poster}"
                  class="card-img-top"
                  alt="${val.Title}"
                  style="max-height: 420px"
                />

                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">
                    ${val.Title}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">${val.Year}</h6>
                  <button class="btn btn-outline-primary btn-block btn-details mt-auto" data-id="${val.imdbID}">Details</button>
                </div>
              </div>
            </div>`;
        });

        $("#container-card-movies").html(listMovies);
      } else {
        $("#container-card-movies").html(`
          <h3>Movie Not Found.</h3>
        `);
      }
    },
  });
}

$("#input-search").on("keyup", function (e) {
  if (e.key === "Enter") {
    getMovies();
  }
});

$("#button-search").on("click", function () {
  getMovies();
});

$("#container-card-movies").on("click", ".btn-details", function () {
  $.ajax({
    url: urlAPI,
    type: "get",
    dataType: "json",
    data: {
      apikey: apiKey,
      i: $(this).data("id"),
    },
    beforeSend: function () {
      $("#container-card-movies").html(
        `<i class="fas fa-circle-notch fa-spin fa-5x"></i>`
      );
    },
    success: function (result) {
      const movies = result;
      console.log(result);

      $("#container-page-home").addClass("d-none");
      $("#container-page-search").addClass("d-none");
      $("#container-page-details").removeClass("d-none");

      if (result.Response === "True") {
        const detailsMovies = `
      <div class="container-details-movies mt-5">
        <!-- disini detail movies -->
        <div class="row justify-content-center bg-dark text-white py-3">
          <div class="col-md-9">
            <p class="h2">${movies.Title}</p>
          </div>
          <div class="col-md-3">
            <p class="h2" style="float: right">
              <i class="fas fa-star" style="color: #e4bb24"></i>
              ${movies.imdbRating ?? "-"} / 10
            </p>
          </div>
        </div>
        <div class="row justify-content-center bg-dark text-white">
          <div class="col-md-9">
            <p>
              ${movies.Rated ?? "-"}
              <i class="fas fa-grip-lines-vertical"></i> ${
                movies.Runtime ?? "-"
              }
              <i class="fas fa-grip-lines-vertical"></i> ${movies.Year ?? "-"}
              <i class="fas fa-grip-lines-vertical"></i>
              ${movies.Production ?? "-"} (${movies.Country ?? "-"})
            </p>
          </div>
          <div class="col-md-3 d-flex flex-column align-items-end">
            <p style="float: right">Metascore <b>${
              movies.Metascore ?? "-"
            }</b></p>
            <p style="float: right">imdb Votes <b>${
              movies.imdbVotes ?? "-"
            }</b></p>
          </div>
        </div>
        <div class="row justify-content-center mt-4 mb-4">
          <div class="col-md-4">
            <img src="${movies.Poster}" class="card-img-top" />
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item">${movies.Plot ?? "-"}</li>
              <li class="list-group-item">
                <div class="d-flex">
                  <p class="h5 col-md-3">Genre</p>
                  <p>${movies.Genre ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Released</p>
                  <p>${movies.Released ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Director</p>
                  <p>${movies.Director ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Writer</p>
                  <p>${movies.Writer ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Actors</p>
                  <p>${movies.Actors ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Awards</p>
                  <p>${movies.Awards ?? "-"}</p>
                </div>
                <div class="d-flex">
                  <p class="h5 col-md-3">Box Office</p>
                  <p>${movies.BoxOffice ?? "-"}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>`;

        $("#container-page-details").html(detailsMovies);
      } else {
        $("#container-page-details").html(
          ` <h3>Internal server error, please try again.</h3>`
        );
      }
    },
  });
});
