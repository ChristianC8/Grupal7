const url = "https://63639dcf37f2167d6f7e0a7a.mockapi.io/users"

const results = document.getElementById("results")
const inputReg = document.getElementById("inputGet1Id")
const btnReg = document.getElementById("btnGet1")

 async function getDatos(){
const obtenerDatos = await getJSONData(url);
console.log(obtenerDatos.data)

btnReg.addEventListener("click",()=>{
  results.innerHTML = " "
  console.log(obtenerDatos.data)
  if(!inputReg.value){
    for(let i = 0; i < obtenerDatos.data.length; i++){
      createMensages(obtenerDatos.data[i].id,obtenerDatos.data[i].name,obtenerDatos.data[i].lastname)
    }
  }else{
    createMensages(obtenerDatos.data[inputReg.value -1 ].id,obtenerDatos.data[inputReg.value -1].name,obtenerDatos.data[inputReg.value -1].lastname)
  } 


})


}





let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
        
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
} 

let postJSONData = function(url){
  let result = {};
  return fetch(url,{method: "POST"})
  .then(response => {
    if (response.ok) {
      return response.json();
      
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
  });
} 
let putJSONData = function(url){
  let result = {};
  return fetch(url,{method: "PUT"})
  .then(response => {
    if (response.ok) {
      return response.json();
      
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
  });
} 
 
let deleteJSONData = function(url){
  let result = {};
  return fetch(url,{method: "DELETE"})
  .then(response => {
    if (response.ok) {
      return response.json();
      
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
  });
} 



getDatos()




function createMensages(id,Nname,lastname){
  const idName = document.createElement("li")
  idName.innerHTML = "ID: "+id
  idName.classList.add("mensaje")
  results.appendChild(idName)
  const name = document.createElement("li")
  name.innerHTML = "Name: "+ Nname
  name.classList.add("mensaje")
  results.appendChild(name)
  const lastnam = document.createElement("li")
  lastnam.innerHTML = "LastName: "+lastname
  lastnam.classList.add("mensaje")  
  results.appendChild(lastnam)

}


