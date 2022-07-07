const CustomArgumentMap = {
    style: (value) => {
        if (value instanceof Object){
            var style = ""

            for (var key in value){
                style += `${key}:${value[key]};`
            }

            return style
        } else {
            return value
        }
    },

    class(value) {
        if (value instanceof Array){
            return value.join(" ")
        } else {
            return value
        }
    }
}

const ElementCache = {}

/**
* @param parrent {Node} Parrent node
* @param tree {object} Tree
* @returns {Node} Returns a node
*/
export function build(parrent, tree){
    function drill(parrent, tree){
        for (var key in tree){
            const outer = ElementCache[key]
            const inner = tree[key]

            parrent.append(outer)

            if (inner instanceof Object){
                drill(outer, inner)
            } else {
                outer.innerHTML = inner
            }
        }
    }
    console.log(parrent)
    drill(parrent, tree)
    return parrent
}

/**
* @param name {string} Tag name
* @param attr {object} Atributes
* @returns {Node} Returns a node
*/
export function node(name, attr = {}) {
    function MapArguments(element, attr = {}){
        if (attr == {}) return element

        for (var key in attr){
            const custom = CustomArgumentMap[key]
            const value = custom ? custom(attr[key]) : attr[key]
            if (!value) continue

            element.setAttribute(key, value)
        }
        
        return element
    }

    const element = MapArguments(document.createElement(name), attr)
    element.toString = () => {return btoa(element.outerHTML)}
    
    ElementCache[element.toString()] = element

    return element
}


/**
* @returns {Object} Returns a tree
*/
export function router(routes){
    for (var [path, handler] of Object.entries(routes)){
        if (path == window.location.pathname){
            return handler
        }
    }
}