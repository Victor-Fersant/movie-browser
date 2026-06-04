const API_KEY = "fa48800486bf625e16b1a2d0a78f8117";

const movieList =
    document.getElementById(
        "movie-list"
    );

const searchInput =
    document.getElementById(
        "search"
    );

const btnSearch =
    document.getElementById(
        "btnSearch"
    );

const message =
    document.getElementById(
        "message"
    );


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

        showMessage(
            "Carregando..."
        );

        const response =
            await fetch(url);

        const data =
            await response.json();

        return data.results;
    }

    catch (error) {

        showMessage(
            "Erro ao carregar filmes."
        );

        return [];

    }
}


  