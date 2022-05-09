import React from "react";
import { useParams, Link } from "react-router-dom";

const TokenView = () => {
    let { token } = useParams()
    return (
        <>
            <div className="container">
                <h1 className="token-header">{token}</h1><br />

                <Link to="/">Home</Link>
            </div>

        </>
    )
}

export default TokenView