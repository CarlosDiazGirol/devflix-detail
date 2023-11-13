import peliculas from './peliculas.js'

const mostrarPeliculasPorGenero = (generoId, contenedorId) => {
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        const peliculasGenero = peliculas.filter((pelicula) => pelicula.genre_ids.includes(generoId));
        
        for(const pelicula of peliculasGenero){
            const {id, title, poster_path: poster} = pelicula
            const templatePelis = `
            <div class="pelicula">
                <a href="pelicula.html?id=${id}">
                    <img class="poster" src="https://image.tmdb.org/t/p/w200${poster}" alt="${title}"/>
                    <p class="titulo">${title}<p/>
                </a>
            </div>`
        contenedor.innerHTML += templatePelis
        }
    } 
}

// Mostrar películas de acción (Género 28)
mostrarPeliculasPorGenero(28, "genero-28");

// Mostrar películas de thriller (Género 53)
mostrarPeliculasPorGenero(53, "genero-53");

// Mostrar películas de aventura (Género 12)
mostrarPeliculasPorGenero(12, "genero-12");


/* Detalles película */

document.addEventListener('DOMContentLoaded', () => {
    const detallesPeliculaContainer = document.getElementById('detalles-pelicula');
    const peliculaIdFromURL = new URLSearchParams(window.location.search).get('id');

    if (peliculaIdFromURL) {
        const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id.toString() === peliculaIdFromURL);
        if (peliculaSeleccionada) {
            mostrarDetallesPelicula(peliculaSeleccionada);
        } else {
            detallesPeliculaContainer.innerHTML = "<p>No se encontraron detalles para esta película.</p>";
        }
    }
});

const mostrarDetallesPelicula = (pelicula) => {
    const detallesPeliculaContainer = document.getElementById('detalles-pelicula');
    const {title, poster_path: poster, overview, vote_average, vote_count, release_date} = pelicula
    const templateDetalles = `
        <h1>${title}</h1>
        <img class="poster" src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}"/>
        <p><strong>Descripción:</strong> ${overview}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${release_date}</p>
        <p><strong>Puntuación:</strong> ${vote_average}</p>
        <p><strong>Número de votos:</strong> ${vote_count}</p>
    `;
    detallesPeliculaContainer.innerHTML = templateDetalles;
}