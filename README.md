# BulletJS

## Use javascript objects to write declarative html and css code.

BulletJS is a super fast and light way to create html in pure JS.
Package is only 100 or less lines.

## Usage


```javascript
// Import 2 light functions !Client side
import {node, CreateHtml} from "./bullet.js"

// USE node(TagName, attr) to create tag element
// USE CreateHtml(parent, tree) to build html tree

CreateHtml(document.body, {[node("p")]: "This is inside a P element!"})
```


## Example


```javascript
import {node, CreateHtml} from "./bullet.js"

function ExampleComponent(color){
    // Classes and styles accept custom inputs
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
    
    // A node element is a normal html element
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

#### Output

![image](https://user-images.githubusercontent.com/62665817/177183801-02d01caf-88f1-40f9-931d-c5dce6ff4c64.png)

