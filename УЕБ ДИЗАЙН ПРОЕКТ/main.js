const main = document.getElementById("main")
const arr = [
    {
        id: "123123asdf",
        author: "Pesho",
        ingredients: "mlqko, qica, bob, 2x supeni lujici zahar",
        recipe: "long text",
    },
    {
        
        author: "Pesho",
        imageSource: "Image source",
        ingredients: "text",
        recipe: "long text",
    },
    {
        author: "Author name",
        imageSource: "Image source",
        ingredients: "Text",
        recipe: "Long text",
    },
    {
        author: "Author name",
        imageSource: "Image source",
        ingredients: "Text",
        recipe: "Long text",
    },
    {
        author: "Author name",
        imageSource: "Image source",
        ingredients: "Text",
        recipe: "Long text",
    },
    {
        author: "Author name",
        imageSource: "Image source",
        ingredients: "Text",
        recipe: "Long text",
    }
]

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

const stringHtmlBuilder = ({author, imageSource, ingredients, recipe}) => {
    return `<div class="element-post">
        <p>author: ${author}</p>
        <p>imageSource: ${imageSource}</p>
        <p>ingredients: ${ingredients}</p>
        <p>recipe: ${recipe}</p>
    </div>`
}

main.innerHTML = arr.map(stringHtmlBuilder).join(" ")