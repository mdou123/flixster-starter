import { useEffect, useState } from "react";
import "./MovieModal.css"
import axios from 'axios';

const API_KEY=import.meta.env.VITE_API_KEY;

const MovieModal =({shown, onClose, movie}) =>{
    const [trailerKey, setTrailerKey]=useState(null)
    const [videoLoading, setVideoLoading] = useState(false);

useEffect(() => {
        if (shown && movie && movie.id) {
            setTrailerKey(null);
            setVideoLoading(true);

            const fetchVideos = async () => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
                    );
                    const videos = response.data.results;

                    const trailer = videos.find(
                        vid => vid.site === 'YouTube' && vid.type === 'Trailer' && vid.official === true
                    );

                    if (trailer) {
                        setTrailerKey(trailer.key);
                    } else {
                        const anyTrailer = videos.find(vid => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser'));
                        if (anyTrailer) {
                            setTrailerKey(anyTrailer.key);
                        }
                    }
                } catch (err) {
                    // Error occurred, but no error state is being set or displayed
                } finally {
                    setVideoLoading(false);
                }
            };

            if (API_KEY) {
                fetchVideos();
            }
        }
    }, [shown, movie, API_KEY]);
    if (!shown){ 
        return null;
}
return(
    <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <button class className="x-button" onClick={onClose}>X</button>
            </div>
            <div className="modal-body">
                {!movie ?(<p>Loading...</p>):(
                    <div className="movie-details">
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="modal-movie-poster" />
                        <div className='movie-text'>
                            <h2>{movie.title}</h2>
                            <h3><b>Released:</b> {movie.release_date}</h3>
                            <p><b>Rating:</b> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10 ({movie.vote_count} votes)</p>
                            <p><b>Runtime:</b> {movie.runtime} minutes</p>
                            {movie.genres && movie.genres.length > 0 && (
                                    <p className="movie-genres">
                                        <b>Genres:</b> {
                                            movie.genres.map(genre => genre.name).join(', ')
                                        }
                                    </p>
                                )}
                            <p><b>Overview:</b> {movie.overview}</p>
                            {videoLoading ? (
                                <p>Loading trailer...</p>
                            ) : trailerKey ? (
                                <div className="movie-trailer"> {/* New container for bottom video */}
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Movie Trailer"
                                        className="youtube-iframe-bottom" // New class for bottom video
                                    ></iframe>
                                </div>
                            ) : null 
                        }

                        </div>
                        </div>
                )}
            </div>
        </div>
    </div>
)
}

export default MovieModal;