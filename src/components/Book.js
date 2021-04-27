import React from 'react'; 
import { update } from '../BooksAPI';
import * as BooksAPI from '../BooksAPI'
const Book = ({Books , setCurrently , setWantToRead , setRead , setBooks})=>{
  
  const grapall = async()=>{
    const l=  await BooksAPI.getAll();
    if(l.error){
      setBooks([]);
    }
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
     const statusHandler = async(e , book)=>{
        let value = e.target.value;
        console.log(value)
        //  book.shelf = value; 
      await  update(book ,  value );
       grapall();
     }
     const getBook = (id)=>{  
      
      
    }
  //  getBook("1w4fAwAAQBAJ")
    //  let lp  = getBook("1w4fAwAAQBAJ") ; 
    //   (async () => {
    //   await lp
    //  })()
        
    // console.log(
    //   
    // )
    getBook("1w4fAwAAQBAJ")
       
    return(
      <ol className="books-grid">
          { Book.length >0 ? (
            Books.map(p=>{
              return (
                <li key={p.id}>
                  <div className="book">
                          <div  className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${ p.imageLinks  ?  p.imageLinks.smallThumbnail : '' })` }}></div>
                            <div className="book-shelf-changer">
                              <select value = {p.shelf}                              
                               onChange ={(e) => {return statusHandler(e,p)} } >
                                <option value="move" disabled>Move to...</option>
                                <option  value="currentlyReading"> currently Reading </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{p.title}</div>
                          <div className="book-authors">{p.authors}</div>
                        </div>
                       </li>

              )
              })
          )
          :
          ''
          }
  </ol>
    )
  

}

export default Book;









