export default (id) =>{
    return fetch("https://videowithrouter-default-rtdb.firebaseio.com//lists/"+id+"/vids"+".json").then((response) => response.json())
    }