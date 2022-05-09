import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate })=>{

    const pageNumbers = []

    for(let i =1; i <= Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="cards">
                {pageNumbers.map(number=> (
                    <div key={number}>
                        <button onClick={()=> paginate(number)}  className="page-link ">
                            {number}
                        </button>
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination