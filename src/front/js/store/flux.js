const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: "",
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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

			private: () => {
				let tok = localStorage.getItem("token")
				if(tok == getStore().token){
			
				fetch("https://3001-miguelubeda-jwtreactfla-xlmfibrzk3v.ws-eu54.gitpod.io/private",{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + tok
					}
				})
				.then(res => {
					if(res.status == 200){
						console.log("Todo bien con el fetch en private")
					} else{
						console.log("Algo ha ido mal con el token y el require en el private Fetch")
						// return res.json()
					}
			
				})} else {
					return "Validation error flux 97"
				}
			
			
			},
		}
	};
};

export default getState;
