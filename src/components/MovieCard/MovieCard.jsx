import './MovieCard.css'; 

function MovieCard({movie, onClick}){
    let movie_url= ``
    if(movie.poster_path===null){
        movie_url=`https://placehold.co/300x450/333333/AAAAAA?text=No+Poster`
    }
    else{
            movie_url=`https://image.tmdb.org/t/p/w300${movie.poster_path}`

    }
    return(
        <div className="movieItem" onClick={() => onClick(movie.id)}>
            <img src={movie_url} alt={movie.title}/>
            
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-release-date"><b>Released:</b> {movie.release_date}</p>
            <p className="movie-vote-average"><b>Ratings:</b> {movie.vote_average}</p>
            

        </div>
    )
}
export default MovieCard