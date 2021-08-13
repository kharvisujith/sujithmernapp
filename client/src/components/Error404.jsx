import React from 'react'
import { NavLink } from 'react-router-dom'

const Error404 = () => {
    return (
        <>
          <div className="error-div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
            <div className="error-content">
            <img className="img-fluid" src="/images/404error.jpg" alt="pagenotfound image" />
            <NavLink to="/">
            <button className="btn btn-primary"> Go Back</button>
            </NavLink>
            </div>

          </div>

          </div>
          </div>
        </>
    )
}

export default Error404
