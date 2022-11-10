const url = "https://63639dcf37f2167d6f7e0a7a.mockapi.io/users"




const results = document.getElementById("results")
const inputReg = document.getElementById("inputGet1Id")
const btnReg = document.getElementById("btnGet1")

const btnPost = document.getElementById("btnPost")
let newName = document.getElementById("inputPostNombre")
let lastName = document.getElementById("inputPostApellido")

const inputPutN = document.getElementById("inputPutNombre")
const inputPutApellido = document.getElementById("inputPutApellido")
const inputPutId = document.getElementById("inputPutId")
const modificar = document.getElementById("btnPut")
const save = document.getElementById("btnSendChanges")


const inputDelete = document.getElementById("inputDelete")
const btnDelete = document.getElementById("btnDelete")

 async function getDatos(){
const obtenerDatos = await getJSONData(url);
console.log(obtenerDatos.data)
/* buscar */
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
/* fin buscar */

/* agregar */
btnPost.addEventListener("click",()=>{
  let posting = postJSONData(url,newName,lastName)
  mostrarDatos()
})
/* fin agregar */

console.log(obtenerDatos.data)
/* cambiar los botones de disabled a no disabled */
inputPutId.addEventListener("change",()=>{
  if(!inputPutId.value){
    modificar.disabled = true
  }else{ modificar.disabled = false}
})

newName.addEventListener("change",()=>{
  if(!newName.value){
    btnPost.disabled = true
  }else{ btnPost.disabled = false}
})
lastName.addEventListener("change",()=>{
  if(!lastName.value){
    btnPost.disabled = true
  }else{ btnPost.disabled = false}
})

inputDelete.addEventListener("change",()=>{
  if(!inputDelete.value){
    btnDelete.disabled = true
  }else{ btnDelete.disabled = false}
})


/* modificar */
modificar.addEventListener("click",async ()=>{
  let numero = inputPutId.value

  if(obtenerDatos.data[inputPutId.value] != undefined){
  const modificarValues = await getJSONData(url +"/"+ inputPutId.value)
    console.log(modificarValues)
  inputPutN.value =  modificarValues.data.name
  inputPutApellido.value =  modificarValues.data.lastname
  

}else{}
save.addEventListener("click",()=>{
  let postingModify = putJSONData(url+"/"+inputPutId.value,inputPutN,inputPutApellido)
  console.log(url+"/"+inputPutId.value)
})

})
/* fin modificar */





/* borrar */
btnDelete.addEventListener("click", ()=>{
results.innerHTML = " "
const borrar = deleteJSONData(url +"/"+ inputDelete.value)
mostrarDatos()

})



}

/* fin borrar */





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

let postJSONData = function(url,name,lastname){
  return fetch(url,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body : JSON.stringify({ 
      name : name.value,
      lastname : lastname.value
    })
  })
} 
let putJSONData = function(url,name,lastname){
  let result = {};
  return fetch(url,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body : JSON.stringify({ 
      name : name.value,
      lastname : lastname.value
    })}
    )
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
  return fetch(url,{method: "delete"})
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




async function mostrarDatos(){
  const Datos = await getJSONData(url);
    
    if(!inputReg.value){
      for(let i = 0; i < Datos.data.length; i++){
        createMensages(Datos.data[i].id,Datos.data[i].name,Datos.data[i].lastname)
      }
    }else{
      createMensages(Datos.data[inputReg.value -1 ].id,Datos.data[inputReg.value -1].name,Datos.data[inputReg.value -1].lastname)
    } 
  }
  
  function clearMessages(){
    results.innerHTML = " "
  }