const main = document.getElementById("main")
const uploadForm = document.getElementById("post-recipe")
const exitButton = document.getElementById("exit")
const accButton = document.getElementById("username")
const loginForm = document.getElementById("login")
const registerForm = document.getElementById("register")
const accRepices = document.getElementById("account-repices")
const localStorageName = "medenkiIme"

const postFetch = async (url, data) => {
    let response = await fetch(getUrlServer(url), {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let par = await response.json()
    return par
}

const fetchAsync = async (url) => {
    let response = await fetch(getUrlServer(url));
    let data = await response.json();
    return data;
}

const getUrlServer = (URI) => `http://127.0.0.1:3000/${URI}`

const getUrlClient = (URI) => `http://127.0.0.1:5500/${URI}`

const stringHtmlBuilder = ({author, ingredients, recipe, img}) => {
    return `
    <div class="card" onClick="window.location.href='/account.html?id=${author}'">
        <div class="card-inner">    
            <div class="card-front"> 
                <img src="${img}"/> 
            </div>
            <div class="card-back">
                <p><b><u>Автор:</u></b> ${author}</p>
                <p><b><u>Съставки:</u></b> ${ingredients}</p>
                <p><b><u>Рецепта:</u></b> ${recipe}</p>
            </div>
        </div>
    </div>`
}

if(localStorage.getItem(localStorageName) == null) {
    let isNLogin = window.location.href != getUrlClient("login.html")
    let isNRegister = window.location.href != getUrlClient("register.html")
    let isNHome = window.location.href != getUrlClient("home.html")
    let isNAccount = window.location.href != getUrlClient("account.html") 
    if(isNLogin && isNRegister && isNHome && isNAccount) {
        window.location.href = getUrlClient("login.html")
    }
    
}

if(accRepices) {
    let id;
    if(window.location.search == "") {
        id = localStorage.getItem(localStorageName)
    } else {
        id = window.location.search.replace("?id=", "")
    }
    fetchAsync(id).then(receivedData => {
        console.log(receivedData)
        receivedData.recepti = receivedData.recepti.map(curRecipe => {
            return {...curRecipe, author: receivedData.username}
        })
        accRepices.innerHTML = receivedData.recepti.map(stringHtmlBuilder).join(" ")
    })
}

if(accButton) {
    if(localStorage.getItem(localStorageName)) {
        accButton.innerHTML = localStorage.getItem(localStorageName)
    }
    exitButton.addEventListener("click", (e) => {
        localStorage.removeItem(localStorageName);
        window.location.href = "/login.html"
    })
}

if(uploadForm) {
    const fileUpload = uploadForm.getElementsByClassName("file")[0]
    let img;
    fileUpload.addEventListener("change", (e) => {
        let selected = e.target.files[0]
        if(selected) {
            img = selected
        }
    })
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let ingredients = e.target.elements.ingredients.value
        let recipe = e.target.elements.recipe.value
        if(img && ingredients && recipe) {
            let fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent) => {
                let imgBase64 = fileLoadedEvent.target.result
                const dataPosted = {ingredients, recipe, img: imgBase64}
                console.log(dataPosted)
                postFetch(localStorage.getItem(localStorageName), dataPosted).then((res) => {
                    window.location.href = getUrlClient("logged.html")
                    console.log(res)
                })
            }
            fileReader.readAsDataURL(img)
        }
    })
}

if(main) {
    fetchAsync("logged").then(receivedData => {
        main.innerHTML = receivedData.map(stringHtmlBuilder).join(" ")
        console.log(receivedData)
    })
}

if(loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let username = e.target.elements.username.value
        let password = e.target.elements.password.value
        postFetch("login", {username, password}).then((ret) => {
            if(ret) {
                if(ret.message) {
                    alert(ret.message)
                } else {
                    localStorage.setItem(localStorageName, username)
                    window.location.href = "/logged.html"
                }
            }
        })
    })
}

if(registerForm) {
    register.addEventListener("submit", (e) => {
        e.preventDefault()
        let username = e.target.elements.username.value
        let password = e.target.elements.password.value
        postFetch("signup", {username, password}).then((ret) => {
            if(ret) {
                if(ret.message) {
                    alert(ret.message)
                } else {
                    window.location.href = "/login.html"
                }
            }
        })
    })
}