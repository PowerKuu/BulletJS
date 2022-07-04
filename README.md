## Use javascript objects to write declarative html and css code.

BulletJS is a super fast and light way to create html in pure JS.
Package is only 100 or less lines.

## Usage


```javascript
// USE node(TagName, attr) to create tag element
// USE CreateHtml(parent, tree) to build html tree - Example treee input 

CreateHtml(document.body, {[node("p")]: "This is inside a P element!"})
```

```javascript
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
```
