const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: "",
      auth: false,
    },
    actions: {
      // Use getActions to call a function within a fuction

      signup: async (infouserpassw) => {
        await fetch(
          "https://3001-siemeris-jwtreactflask-oof6h8xklme.ws-eu62.gitpod.io/signup",
          {
            method: "POST",
            body: JSON.stringify(infouserpassw),
            headers: { "Content-Type": "application/json" },
          }
        ).then((resp) => {
          if (resp.ok) {
            console.log("registro OK");
          }
        });
      },

      login: (infouserpass) => {
        const response = fetch(
          "https://3001-siemeris-jwtreactflask-oof6h8xklme.ws-eu62.gitpod.io/token",
          {
            //mode: 'no-cors',
            method: "POST",
            body: JSON.stringify(infouserpass),
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function(response) {
          if (!response.ok) {
          throw Error(response.statusText);
          }
          else{
            setStore({ auth: true });
            const { auth } = getStore();
		        console.log("auth1", auth)
            
          }
          return response.json()
          // Aquí es donde pones lo que quieres hacer con la respuesta.
      })
      .then(data =>{localStorage.setItem("token", data.token); })
      .catch();
      },

      private: async () => {
        let tok = localStorage.getItem("token");
        
        //if (tok == getStore().token) {
          await fetch(
            "https://3001-siemeris-jwtreactflask-oof6h8xklme.ws-eu62.gitpod.io/privated",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tok,
              },
            }
          ).then((res) => {
            if (res.status == 200) {
              console.log("Todo bien con el fetch en private");
              const { auth } = getStore();
              console.log("auth4", auth)
              setStore({ auth: true });
            } else {
              console.log(
                "Algo ha ido mal con el token y el require en el private Fetch"
              );
              // return res.json()
            }
          });
        // } else {
        //   return "Validation error flux 97";
        // }
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

	  logout: ()=>{
    const { auth } = getStore();
		localStorage.removeItem("token")
		setStore({auth: false})
    console.log("auth3", auth)
	  },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
