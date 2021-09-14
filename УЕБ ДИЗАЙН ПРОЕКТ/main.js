const main = document.getElementById("main")

const getRecepti = (username) => {
    const recepti = {}
    fetch("localhost://3000/recepti", {
        method: "GET",
        body: {
            username
        }
    }).then(res => res.json())
    .then(res => {
        recepti.data = res
    }).catch(err => {
        recepti.err = err
    })
    return recepti
}

const postRecepti = (username) => {
    const recepti = {}
    fetch("localhost://3000/recepti", {
        method: "POST",
        body: {
            username
        }
    }).then(res => res.json())
    .catch(err => {
        recepti.err = err
    })
    return recepti
}

const fetchAsync = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

const getUrl = (URI) => `http://127.0.0.1:3000/${URI}`

const stringHtmlBuilder = ({author, imageSource, ingredients, recipe}) => {
    return `<div class="element-post">
        <p>author: ${author}</p>
        <p>ingredients: ${ingredients}</p>
        <p>recipe: ${recipe}</p>
    </div>`
}

fetchAsync(getUrl("logged")).then(receivedData => {
    main.innerHTML = receivedData.map(stringHtmlBuilder).join(" ")
})