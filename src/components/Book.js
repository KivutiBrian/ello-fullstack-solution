import React from "react";

const Book = ({ pages, title }) => {
    
    return (

        <>
            <div>
                <h2 className="header">{title}</h2>
            </div>

            <div className="cards">
                {pages.map(page => (
                    <div className="">
                        <div key={page.pageIndex} className="card">
                            {page.props.children}
                        </div>
                    </div>
                ))}
            </div>
            

        </>
    )     
}

export default Book