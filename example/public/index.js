import {node, CreateHtml} from "./bullet.js"

function ExampleComponent(color){
    const comp = node("div", {
        id:"test",
        class: [
            "container",
            "container-fluid"
        ], 
        style: {
            color: color,
            "font-size": "20px"
        }
    })

    comp.addEventListener("click", () => {
        alert("click")
    })

    return comp
}

const tree = {
    [ExampleComponent("red")]: {
        [node("p")]: "Hello world",
    },

    [ExampleComponent("blue")]: "Better than web frameworks!"
}


CreateHtml(document.body, tree)