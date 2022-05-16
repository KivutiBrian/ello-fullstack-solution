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


  // create a helper function that enables each word in the content to be clickable and perform the mapping
  const prepareTokenLink = (content, tokens) => {

    if (content.length > 0 && tokens.length > 0) {


      let results = tokens.map(tokenObject => {

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

        /* handle the words with hypens
          Trim that word and replace the - with a empty space.
        */

        if (content.slice(first_index, last_index).endsWith("-")) {
          theWord = theWord.trim().replace("-", "").trim()
        }

        /*
         +1 to the last index and then check if the word ends with a closing speech marks
        */
        let newTheWord = content.slice(first_index, last_index + 1)
        let a = newTheWord.charAt(newTheWord.length - 1)


        if (a.match(/^[0-9A-Za-z]+$/) === null) {
          //is not alphanumeric
          theWord = content.slice(first_index, last_index + 1)
        } else {
          //it is alphanumeric
          console.log("it is alphanumeric")
        }

        const theWordValue = tokenObject.value

        // return a span tag that is clickable
        return <span style={{ margin: 0, padding: 0 }} onClick={(e) => navigate(`/token/${theWordValue}`)}>{`${theWord}`}</span>

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