export default (id) =>{
return fetch("https://videowithrouter-default-rtdb.firebaseio.com//vids/"+id+".json").then((response) => response.json())
}