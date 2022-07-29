import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";


import { Context } from "../store/appContext";

export const Privated = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();
   const token = localStorage.getItem('token');
   useEffect(() =>{
   actions.private()}
   ,[store.auth])

    return (
            <>
                {token && store.auth === true? 
                    <div className="text-center"> 
                        <h1>Página personal que ha realizado la autentificacion jwt_require</h1>
                        {/* <Link className="btn btn-primary" to="/privated">Home</Link>  */}
                    
                          <Link to="/" type="submit" className="btn btn-primary" onClick={() => {
                            actions.logout();
                         }}>
                         Logout
                         </Link>
                       </div>
                : navigate("/") 
                }
            </>
        )

};