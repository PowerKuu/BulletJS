# BulletJS

#### Its recommended to use (webpack, vite, etc..) with bullet.
To install run:
```
npm install @powerkuu/bullet
```
Or download from releases.


## Use javascript objects to write declarative html and css code.

BulletJS is a super fast and light way to create html in pure JS.
Package is only 200 or less lines.

## Usage


```javascript
// Import 2 light functions !Client side
import {node, build} from "@powerkuu/bullet"

// USE node(TagName, attr) to create tag element
// USE build(parent, tree) to build html tree

build(document.body, {[node("p")]: "This is inside a P element!"})
```


## Example


```javascript
import {node, build} from "@powerkuu/bullet"

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


build(document.body, tree)
```

#### Output

![image](https://user-images.githubusercontent.com/62665817/177183801-02d01caf-88f1-40f9-931d-c5dce6ff4c64.png)

