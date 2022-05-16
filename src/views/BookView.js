import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useQuery, gql } from '@apollo/client';

import Book from '../components/Book';
import Pagination from '../components/Pagination';



// setup query
const GET_BOOK = gql`

  query GetBook {
    book {
      author
      title
      pages {
        content
        pageIndex
        tokens {
          position
          value
        }
      }
    }
  }

`
const BookView = () => {

  // create a nav object
  let navigate = useNavigate()

  // setup state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(2)

  // destructure objects from query
  const { error, data, loading } = useQuery(GET_BOOK);

  // check loading status
  if (loading) return <div>Fetching data...</div>

  // check error
  if (error) return <div>Something went wrong...</div>


  // create a helper function that enables each word in the content to be clickable
  const prepareTokenLink = (content, tokens) => {

    if (content.length > 0 && tokens.length > 0) {



      let results = tokens.map(tokenObject => {
        /*
          **TODO - Look for cleaner alternative to include punctions
          Looosing closing speech marks.
          Issue with the hypens

        */
        let first_index;
        let last_index;

        if (tokenObject.position[0] === 0) {
          first_index = tokenObject.position[0]
        } else {
          first_index = tokenObject.position[0] - 1
        }
    
        // last index || add 1 to the last index so that you can capture the closing punctuations
        last_index = tokenObject.position[1] + 1

        let theWord = content.slice(first_index, last_index)


        const theWordValue = tokenObject.value

        // return a span tag that is clickable
        return <span style={{ margin: 0, padding: 0 }} onClick={(e) => navigate(`/token/${theWordValue}`)}>{`${theWord} `} </span>

      })

      return results

    }
    return <span></span>
  }

  // get current content
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.book.pages.slice(indexOfFirstItem, indexOfLastItem)

  const t = currentItems.map(({ content, pageIndex, tokens }) => {
    return (
      <>
        {prepareTokenLink(content, tokens)}
      </>
    )
  })

  // change book page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <Book title={data.book.title} pages={t} />
      <Pagination itemsPerPage={itemsPerPage} totalItems={data.book.pages.length} paginate={paginate} />
    </div>
  )
}

export default BookView