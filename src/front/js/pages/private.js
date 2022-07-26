import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {

    const {store, actions} = useContext(Context)



        return (
            <>
                {store.token != null && store.auth == true? 
                    <div className="text-center"> 
                        <h1>Página personal que ha realizado la autentificacion jwt_require</h1>
                        {/* <Link className="btn btn-primary" to="/privates">Home</Link> */}
                    </div>
                : <Navigate to="/privates"/>
                }
            </>
        )

};

