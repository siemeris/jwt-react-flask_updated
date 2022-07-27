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
			
			signup: async (infouserpassw) => {
				await fetch("https://3001-miguelubeda-jwtreactfla-xlmfibrzk3v.ws-eu54.gitpod.io/signup", {
					method:"POST",
					body: JSON.stringify(infouserpassw),
					headers:{"Content-Type": "application/json",},
				  })
				  .then((resp)=>{
					 if (resp.ok){
					   console.log("registro OK")
					 }
					})
			},
			
			login: async (infouserpass) => {
				const resp = await fetch("https://3001-miguelubeda-jwtreactfla-xlmfibrzk3v.ws-eu54.gitpod.io/token",{ 
					//mode: 'no-cors', 
					method: "POST",
					body: JSON.stringify(infouserpass), 
					headers: { "Content-Type": "application/json" },
					
				});
				if(!resp.ok) throw Error("There was a problem in the login request")

				if(resp.status === 401){
					 throw("Invalid credentials")
				}
				else if(resp.status === 400){
					 throw ("Invalid email or password format")
				}
				const data = await resp.json()
				// save your token in the localStorage
			   //also you should set your user into the store using the setStore function
				localStorage.setItem("token", data.token)
				return data
			},			

			private: async() => {
				let tok = localStorage.getItem("token")
				if(tok == getStore().token){
			
				await fetch("https://3001-miguelubeda-jwtreactfla-xlmfibrzk3v.ws-eu54.gitpod.io/privated",{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "JWT" + tok
					}
				})
				.then(res => {
					if(res.status == 200){
						console.log("Todo bien con el fetch en private")
						const {auth} = getStore();
						auth = true
						setStore({auth})
						
					} else{
						console.log("Algo ha ido mal con el token y el require en el private Fetch")
						// return res.json()
					}
				})} else {
					return "Validation error flux 97"
				}
			},

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
		}
	};
};

export default getState;
