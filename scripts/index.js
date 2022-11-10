const results = document.getElementById('results')

let url = ''

const btnGet1 = document.getElementById('btnGet1')
const inputSearchid = document.getElementById('inputGet1Id')

// this function disables a button if the value of an input is empty
function disabledButtons(inp, btn){
    inp.addEventListener('input', ()=>{
        if (!inp.value){
            btn.disabled = true
        } else {
            btn.disabled = false
        }
    })
}

// alert function
const alert = document.querySelector('.alert')
function showError(){
    alert.classList.remove('inactive')
    alert.classList.add('acitve')

    setTimeout(()=>{
        alert.classList.remove('acitve')
        alert.classList.add('inactive')
    }, 3000)
}

// this function disables a button if the value of two inputs is empty
function disabledButtonsFormControl(container, input1, input2, btn){
    for (const input of container){
        if(input.className.includes('form-control')){
            input.addEventListener('input', ()=>{
                if (!input1.value || !input2.value){ return btn.disabled = true} 

                return btn.disabled = false
            })
        }
    }
}

let dataList;

// get data function
function getData(){
    url = 'https://63612cf467d3b7a0a6c01fae.mockapi.io/users/'

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
            
          }else{
            throw Error(response.statusText);
          }
    })
    .then(data => {
        dataList = data
        let appendToHtml = ''
        
        for (const list of data){
            appendToHtml += `
            <div class="p-3 list-unstyled">
                <li>ID: ${list.id}</li>
                <li>NAME: ${list.name}</li>
                <li>LASTNAME: ${list.lastname}</li>
            </div>
            `
        }

        results.innerHTML = appendToHtml
    })
}



// get data by id function
function getDataByID(){        
    btnGet1.addEventListener('click', ()=>{
        if(inputSearchid.value !== ''){
            url = `https://63612cf467d3b7a0a6c01fae.mockapi.io/users/${inputSearchid.value}`

            fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                  }
            })
            .then(data => {
                let appendToHtml = ''
                if(data !== undefined){
                    appendToHtml = `
                        <div class="p-3 list-unstyled">
                            <li>ID: ${data.id}</li>
                            <li>NAME: ${data.name}</li>
                            <li>LASTNAME: ${data.lastname}</li>
                        </div>
                    `
                } else{
                    showError()
                }

                inputSearchid.value = ''
                results.innerHTML = appendToHtml
            })

        } else {
            getData()
        }
    })
}

// post data function
const inputPostName = document.getElementById('inputPostNombre')
const inputPostLastName = document.getElementById('inputPostApellido')
const btnPost = document.getElementById('btnPost')
const postBox = document.getElementById('post-box').children

function postData(){

    
    disabledButtonsFormControl(postBox, inputPostLastName, inputPostName, btnPost)

    btnPost.addEventListener('click', ()=>{
        if(inputPostLastName !== '' && inputPostName !== ''){
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    name: inputPostName.value,
                    lastname: inputPostLastName.value
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(response => {if(response.ok){
                response.json()
             }
             })
             .then(data =>{ 
                inputPostName.value = ''
                inputPostLastName.value = ''
                getData()
            })
        }
    })
}

// put data function
const btnPut = document.getElementById('btnPut')
const inputPutName = document.getElementById('inputPutNombre')
const inputPutLastName = document.getElementById('inputPutApellido')
const inputPutId = document.getElementById('inputPutId')
const btnSendChanges = document.getElementById('btnSendChanges')
const modalBody = document.getElementById('modalBody').children

function putData(){
    disabledButtonsFormControl(modalBody, inputPutLastName, inputPutName, btnSendChanges)

    inputPutId.addEventListener('input', ()=>{
        let result = dataList.find(elem => elem.id === inputPutId.value)

        if (!inputPutId.value || result === undefined){
            btnPut.disabled = true
        } else {
            btnPut.disabled = false
        }
    })

    btnPut.addEventListener('click', (e)=>{
        url = `https://63612cf467d3b7a0a6c01fae.mockapi.io/users/${inputPutId.value}`

        fetch(url).then(response => {if(response.ok){return response.json()}}).then(data => {
            if(data !== undefined){
                inputPutName.value = data.name
                inputPutLastName.value = data.lastname
            } else {
                inputPutName.value = ''
                inputPutLastName.value = ''
            }

        })
    })
    
    btnSendChanges.addEventListener('click', () => {
        if (inputPutName.value && inputPutLastName.value){
            url = `https://63612cf467d3b7a0a6c01fae.mockapi.io/users/${inputPutId.value}`

            fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    name: inputPutName.value,
                    lastname: inputPutLastName.value
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                getData()
                inputPutId.value = ''
            })
        }
    })
}

// delete data function
const inputDelete = document.getElementById('inputDelete')
const btnDelete = document.getElementById('btnDelete')

function deleteData(){

    disabledButtons(inputDelete, btnDelete)

    btnDelete.addEventListener('click', ()=>{
        url = `https://63612cf467d3b7a0a6c01fae.mockapi.io/users/${inputDelete.value}`

        fetch(url, {
            method: 'delete',
        })
        .then(response => {
            if(!response.ok) showError()
            response.json()
        })
        .then(data => {
            getData()
            inputDelete.value = ''
        })
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    // diferent methods
    getData()
    getDataByID()
    postData()
    putData()
    deleteData()
})