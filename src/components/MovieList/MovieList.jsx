//Show a no image picture if no image appears
//Refactor Use effect that resets the data when sorting and searching
//tofix(1) for rating
import MovieCard from "../MovieCard/MovieCard"
import { useEffect, useState } from "react"
import axios from "axios";
import './MovieList.css'; 
import MovieModal from "../MovieModal/MovieModal";

const API_KEY=import.meta.env.VITE_API_KEY;
const previousMovies=[];
//const pageNum = 1;

function MovieList({searchQuery, sortCriteria}){
    //so the movies only load/change when user searches
    const loadMovies =false;

    const [movies, setMovies]= useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    
    //UseStates for modal
    const[selectedMovie, setSelectedMovie ]=useState(null  )
    const [showModal, setShowModal]=useState(false)


    useEffect(()=>{
        setPageNumber(1)
        setMovies([])
    }, [searchQuery, sortCriteria])


    // Re-run useEffect when page number changes
    // Get new data from new page 
    // Update the moves data while persisting already existing data.


    useEffect(()=>{

        let url='';

        if(searchQuery.trim()){
            url =`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=${pageNumber}&api_key=${API_KEY}`;
        }
        else if(sortCriteria=="popularity.desc"){
            url =`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&api_key=${API_KEY}`
        }
        else if(sortCriteria=="title.desc"){
            url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=title.desc&api_key=${API_KEY}`
        }
        else if(sortCriteria=="primary_release_date.desc"){
            url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=primary_release_date.desc&api_key=${API_KEY}`
        }
        else if(sortCriteria=="vote_average.desc"){
            url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=vote_average.desc&api_key=${API_KEY}`
        }
        else{
            url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}&api_key=${API_KEY}`;
            }
        


        const fetchList = async () => {
            try{
                const {data} = await axios.get(url);
                if (pageNumber===1){
                    setMovies(data.results)
                }
                else{
                setMovies(previousMovies => [...previousMovies, ...data.results]);
                }
                //Incase no moves are found
                if (data.results.length === 0 && pageNumber === 1) {
                    if (searchQuery.trim()) {
                        setError(`No movies found for "${searchQuery}".`);
                    } else {
                        setError("No 'Now Playing' movies available.");
                    }
                }
            }
            catch(error){
                console.error("Error Fetching list: ", error);
            }
        }
        fetchList();
    }, [pageNumber, searchQuery, sortCriteria]);

    //For when user clicks on Movie and triggers modal to open
    const handleCardClick =async(movie_id) =>{
        setShowModal(true)
        setSelectedMovie(null)
        try{
        const{data}=await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`)
        setSelectedMovie(data)
    } catch(err){
            console.error("error fetching data for modal")
        }
    }

    //For closing modal
    const handleClose=()=>{
        setShowModal(false);
        setSelectedMovie(null);
    }

    return( 
        <>
    <div className="movieList">
        {movies.map((m,index)=>(
            <MovieCard 
                key={index}
                movie={m}
                //movie_id={m.id}
                onClick ={handleCardClick}
                />
        )
    )
        }
    </div>
        <MovieModal shown ={showModal} 
        onClose ={handleClose}
        movie={selectedMovie }/>
        <button onClick={() => setPageNumber(prevState => prevState + 1)} className="load-more-btn">Load More</button>

    </>)
}

{/* 
    //Function to fetch next page of movies when load more is click so it can be appended to original array
    const loadMore = ()=>{
        pageNum++
        const load_url =`https://api.themoviedb.org/3/movie/now_playing?language=en-US\&api_key=${API_KEY}`
        {movies.map((m)=>(
            <MovieCard
                key={m.id}
                movie={m}
                />
                )
            )
        }
    }
        */}
export default MovieList
//For t