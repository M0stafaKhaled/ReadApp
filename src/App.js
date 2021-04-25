import React, { useEffect, useState , } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import Book from './components/Book'
import './App.css'



function App  ()  {

              const searchp = async(e)=>{
                    const value = e.target.value;
                   if(value.trim()=== '')
                   setBooks([]);
                   
                 try{
                  const l = await BooksAPI.searchP(value.trim());
                  if(l.length >0)
                      setBooks(l);

                      
                 }
                 catch(e){}
              }

             const grapall = async()=>{
                const l=  await BooksAPI.getAll();
              const current =  l.filter(book => 
                 book.shelf === "currentlyReading"
                  ) 
                  setCurrently(current)

                  const want = l.filter(book => 
                    book.shelf === "wantToRead"
                     ) 
                     setWantToRead(want)
                     const read = l.filter(book => 
                      book.shelf === "read"
                       ) 
                        setRead(read)
              }
        
      const[showSearchPage , setShowSearchPage] = useState('list');
      const[Books , setBooks] = useState([]); 
      const[Currently ,setCurrently] = useState([]);
      const[WantToRead , setWantToRead] = useState([]);
      const[read , setRead] = useState([]);
      useEffect(()=>{
        grapall()
    }, []) // <-- empty dependency array
    return (
      <div className="app">
      {showSearchPage === 'serch' ? (
        <div className="search-books">
          <div className="search-books-bar">
          <Link to="/"> 
          <button className="close-search" onClick={() => setShowSearchPage('list') }>Close</button>
           </Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}       
              <input type="text"  onKeyUp={searchp}  placeholder="Search by title or author"/>
            
                
            </div>
            
          </div>
          <div className="search-books-results">
            
            <Book Books={Books} 
                    setBooks={setBooks}
                    setCurrently={setCurrently}
                    setRead={setRead}
                    setWantToRead={setWantToRead}
                  />
           
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2   className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <Book Books={Currently} 
                    setBooks={setBooks}
                    setCurrently={setCurrently}
                    setRead={setRead}
                    setWantToRead={setWantToRead}
                  />
                  
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                 
                    
                      <Book  setBooks={setBooks} Books={WantToRead}
                       setCurrently={setCurrently}
                       setRead={setRead}
                       setWantToRead={setWantToRead}
                      />
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  
                    
                  <Book Books={read} setBooks={setBooks} 
                   setCurrently={setCurrently}
                   setRead={setRead}
                   setWantToRead={setWantToRead} />
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            
         
            <Link to="/serch">

            <button  onClick={() =>{ 
                  
                  setShowSearchPage("serch")
                   }}> 
               Add a book
               </button>

            </Link>
            
             
              {/* <a   href="serch" onClick={()=>setShowSearchPage('serch')}>d </a> */}
          </div>
        </div>
      )}
    </div>
         )
  }


export default App
