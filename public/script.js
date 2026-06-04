const API_KEY = "fa48800486bf625e16b1a2d0a78f8117";

const movieList =
    document.getElementById("movie-list");

const searchInput =
    document.getElementById("search");

const btnSearch =
    document.getElementById("btnSearch");

const message =
    document.getElementById("message");


// Mensagens

function showMessage(text) {
    message.textContent = text;
}


// Buscar filmes

async function fetchMovies(query = "") {

    try {
        let url;

        if (query === "") {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
        }

        else {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;
        }

        showMessage("Carregando...");

        const response =
            await fetch(url);

        const data =
            await response.json();

        return data.results;
    }

    catch (error) {
        showMessage("Erro ao carregar filmes.");
        return [];
    }
}


//Criar cards

function createMovieCard(movie) {
    const card =
        document.createElement("div");
    card.classList.add("movie-card");

    const poster =
        document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const title =
        document.createElement("h2");
    title.textContent = movie.title;

    const year =
        document.createElement("p");
    year.textContent = "Ano: " + movie.release_date.substring(0, 4);

    const rating =
        document.createElement("p");
    rating.textContent = "Nota: " + movie.vote_average;

    const overview =
        document.createElement("p");
    overview.textContent = movie.overview.slice(0, 120) + "...";

    card.appendChild(poster);

    card.appendChild(title);

    card.appendChild(year);

    card.appendChild(rating);

    card.appendChild(overview);
    return card;
}


// Renderizar filmes

function renderMovies(movies) {
    movieList.innerHTML = "";

    if (movies.length === 0) {
        showMessage("Nenhum filme encontrado.");
        return;
    }

    showMessage(
        `${movies.length} filmes encontrados`
    );

    movies.forEach(movie => {
        const card =
            createMovieCard(movie);
        movieList.appendChild(card);
    });
}

async function init() {
    const movies =
        await fetchMovies();

    renderMovies(movies);
}

init();

btnSearch.addEventListener(
    "click",
    async () => {
        const query =
            searchInput.value;

        const movies =
            await fetchMovies(query);
        renderMovies(movies);
    }
);
