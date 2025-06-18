import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import MovieList from './components/MovieList/MovieList'


const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria]= useState('')

  
  //For when the Enter key is used instead of the submit button
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(); 
    }
  };

  //To trigger use effect from movieList
  const handleSearchSubmit =(event) =>{
  event.preventDefault();
  setSubmittedSearchQuery(searchQuery);
  }

  const handleNowPlayingClick = () => {
    setSearchQuery(''); 
    setSubmittedSearchQuery(''); 
  };

  const handleDropdownClick = (event) => {
    let newSortCriteria = event.target.value;
    setSortCriteria(newSortCriteria);
  }






  return (
    <div className="App">
      <Header/>
      <div className='centerBar'>
      <form className='searchBar' onSubmit={handleSearchSubmit}>
      <div className='searchBar'>
        <input className='search-text'
          type="text" 
          placeholder='Search' 
          value={searchQuery} 
          // Updates the searchQuery state as the user types
          onChange={(e)=> setSearchQuery(e.target.value)}/>

          <button className='searchBtn'
          onClick={handleSearchSubmit}
          type='submit'
          >Search</button>
          
          <button className='Now-Playing-Btn'
          onClick={handleNowPlayingClick}
          >Now Playing</button>
      </div>
      </form>
      
      
        <select 
        className='dropdown-Menu'

        value={sortCriteria}
        
        onChange={handleDropdownClick}
        >
          //<option value="popularity.desc">Sort By</option>
          <option value="title.desc">Alphabetic</option>
          <option value="primary_release_date.desc">Release Date Descending</option>
          <option value="vote_average.desc">Popularity Descending</option>
        </select>
        </div>
        
      


      <MovieList searchQuery={submittedSearchQuery} sortCriteria={sortCriteria}/>
      <div className='footer'>
      <p color:black>Mamadou's Flixter App &copy; </p>

      </div>
      
    </div>
    
    
  )

}



export default App
