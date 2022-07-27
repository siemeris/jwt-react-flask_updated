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
//&& store.auth == true

// asumiendo que "/protected" es un endpoint privado
// const getMyTasks = await (username, password) => {
//     // retrieve token form localStorage
//     const token = localStorage.getItem('token');

//     const resp = await fetch(`https://your_api.com/protected`, {
//        method: 'GET',
//        headers: { 
//          "Content-Type": "application/json",
//          'Authorization': 'Bearer '+token // ⬅⬅⬅ authorization token
//        } 
//     })
//     if(!resp.ok) throw Error("There was a problem in the login request")

//     else if(resp.status === 403){
//         throw Error("Missing or invalid token");
//     }
//     else{
//         throw Error('Uknon error');
//     }

//     const data = await resp.json();
//     console.log("This is the data you requested", data);
//     return data

// }



// export const Privated = () => {
//     const {store, actions} = useContext(Context)
//     const token = localStorage.getItem('token');
//         return (
//             <>
//                 {store.token != null && store.auth == true?
//                     <div className="text-center"> 
//                         <h1>Página personal que ha realizado la autentificacion jwt_require</h1>
//                         {/* <Link className="btn btn-primary" to="/privates">Home</Link> */}
//                     </div>
//                 :<Navigate to="/"/> 
//                 }
//             </>
//         )

// };