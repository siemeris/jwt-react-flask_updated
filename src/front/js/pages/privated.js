import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Privated = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();
   // const token = localStorage.getItem('token');
   useEffect(() => {
    actions.private();
  }, []); 

        return (
            <>
                {store.token != null && store.auth == true? 
                    <div className="text-center"> 
                        <h1>Página personal que ha realizado la autentificacion jwt_require</h1>
                        {/* <Link className="btn btn-primary" to="/privates">Home</Link> */}
                    </div>
                : <Navigate to="/"/> 
                }
            </>
        )

};