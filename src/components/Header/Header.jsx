import { useState } from 'react'
import "./Header.css"
import popcorn from './popcorn.png'

const getFilteredItems =(query, items)=>{
    //if our query doesn't match
    if(!query){
        return items;
    }
    //Filters through items to find movies that match query
    return items.filter(query=> query.title.includes(query))
}
function Header(){
    const [input, setInput]= useState("")


    return(
    <header className='header'>
        <img src={popcorn}/>
        <h1>
            Flixter Project
        </h1>
        {/*<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />*/}
        {/*
        <div className=''>
            <input type="text" 
            placeholder='Search' 
            value={input} 
            onChange={(e)=> setInput(e.target.value)}/>
        </div>
        */}

    </header>
    )
}
export default Header