/**
* @param parrent {Node} Parrent node
* @param tree {object} Tree
* @returns {Node} Returns a node
*/
export function build(parrent, tree){
    function ApplyTree(parrent, tree){
        for (var key in tree){
            if (!key.startsWith("UUID") && (tree[key] instanceof Object || tree[key] instanceof Array)){
                ApplyTree(parrent, tree[key])
                continue
            }

            const InnerContent = tree[key]
            const OuterElement = ElementCache[key].clone ? ElementCache[key].cloneNode(true) : ElementCache[key]

            parrent.appendChild(OuterElement)
 
            if (InnerContent.nodeType !== undefined){
                OuterElement.appendChild(InnerContent)
            } 
            else if (InnerContent instanceof Array) {
                for (var element of InnerContent){
                    if (!(element instanceof Object)) continue
                    ApplyTree(OuterElement, element)
                }
            } 
            else if (InnerContent instanceof Object){
                ApplyTree(OuterElement, InnerContent)
            } 
            else OuterElement.innerHTML = InnerContent
        }

        return parrent
    }

    ApplyTree(parrent, tree)
    return parrent
}

/**
* @param name {String} Tag name
* @param attributes {Object} Atributes
* @param clone {Boolean} Does the object get coloned. U can not clone a node with properties
* @returns {Node} Returns a node
*/
export function node(name, attributes = {}, clone = false) {
    function ApplyAattributes(element, attributes = {}){
        if (attributes == {}) return element
        for (var key in attributes){
            const custom = CustomArgumentMap[key]
            const value = custom ? custom(attributes[key], element) : attributes[key]
            if (!value) continue

            element.setAttribute(key, value)
        }
        
        return element
    }

    const element = ApplyAattributes(document.createElement(name), attributes)
    const key = uuid()
    
    element.clone = clone
    element.toString = () => {return key}
    
    ElementCache[element.toString()] = element
    return element
}

/**
* @returns {Object} Returns a tree
* @param routes {Object} Route map
*/
export function router(routes){
    for (var [path, handler] of Object.entries(routes)){
        if (path == window.location.pathname) return handler
    }
}

//? Short version for the (node) function
export const N = node
//?

//? Simple utility functions
const uuid = () => "UUID" + URL.createObjectURL(new Blob([])).substr(-36)
const FunctionAttribute = (attr) => (value, element) => {
    if (value instanceof Function) element[attr] = value  
    else return value
}
//?

//? Global variables
const ElementCache = {}
//?

//? Custom argument map
const CustomArgumentMap = {
    style(value) {
        if (value instanceof Object){
            var style = ""
            for (var key in value){
                style += `${key}:${value[key]};`
            }
            return style

        } else return value
    },

    class(value) {
        if (value instanceof Array) return value.join(" ")
        else return value
    },

    onabort: FunctionAttribute("onabort"),
    onafterprint: FunctionAttribute("onafterprint"),
    onbeforeprint: FunctionAttribute("onbeforeprint"),
    onbeforeunload: FunctionAttribute("onbeforeunload"),
    onblur: FunctionAttribute("onblur"),
    oncanplay: FunctionAttribute("oncanplay"),
    oncanplaythrough: FunctionAttribute("oncanplaythrough"),
    onchange: FunctionAttribute("onchange"),
    onclick: FunctionAttribute("onclick"),
    oncontextmenu: FunctionAttribute("oncontextmenu"),
    oncopy: FunctionAttribute("oncopy"),
    oncuechange: FunctionAttribute("oncuechange"),
    oncut: FunctionAttribute("oncut"),
    ondblclick: FunctionAttribute("ondblclick"),
    ondrag: FunctionAttribute("ondrag"),
    ondragend: FunctionAttribute("ondragend"),
    ondragenter: FunctionAttribute("ondragenter"),
    ondragleave: FunctionAttribute("ondragleave"),
    ondragover: FunctionAttribute("ondragover"),
    ondragstart: FunctionAttribute("ondragstart"),
    ondrop: FunctionAttribute("ondrop"),
    ondurationchange: FunctionAttribute("ondurationchange"),
    onemptied: FunctionAttribute("onemptied"),
    onended: FunctionAttribute("onended"),
    onerror: FunctionAttribute("onerror"),
    onfocus: FunctionAttribute("onfocus"),
    onhashchange: FunctionAttribute("onhashchange"),
    oninput: FunctionAttribute("oninput"),
    oninvalid: FunctionAttribute("oninvalid"),
    onkeydown: FunctionAttribute("onkeydown"),
    onkeypress: FunctionAttribute("onkeypress"),
    onkeyup: FunctionAttribute("onkeyup"),
    onload: FunctionAttribute("onload"),
    onloadeddata: FunctionAttribute("onloadeddata"),
    onloadedmetadata: FunctionAttribute("onloadedmetadata"),
    onloadstart: FunctionAttribute("onloadstart"),
    onmousedown: FunctionAttribute("onmousedown"),
    onmousemove: FunctionAttribute("onmousemove"),
    onmouseout: FunctionAttribute("onmouseout"),
    onmouseover: FunctionAttribute("onmouseover"),
    onmouseup: FunctionAttribute("onmouseup"),
    onmousewheel: FunctionAttribute("onmousewheel"),
    onoffline: FunctionAttribute("onoffline"),
    ononline: FunctionAttribute("ononline"),
    onpagehide: FunctionAttribute("onpagehide"),
    onpageshow: FunctionAttribute("onpageshow"),
    onpaste: FunctionAttribute("onpaste"),
    onpause: FunctionAttribute("onpause"),
    onplay: FunctionAttribute("onplay"),
    onplaying: FunctionAttribute("onplaying"),
    onpopstate: FunctionAttribute("onpopstate"),
    onprogress: FunctionAttribute("onprogress"),
    onratechange: FunctionAttribute("onratechange"),
    onreset: FunctionAttribute("onreset"),
    onresize: FunctionAttribute("onresize"),
    onscroll: FunctionAttribute("onscroll"),
    onsearch: FunctionAttribute("onsearch"),
    onseeked: FunctionAttribute("onseeked"),
    onseeking: FunctionAttribute("onseeking"),
    onselect: FunctionAttribute("onselect"),
    onstalled: FunctionAttribute("onstalled"),
    onstorage: FunctionAttribute("onstorage"),
    onsubmit: FunctionAttribute("onsubmit"),
    onsuspend: FunctionAttribute("onsuspend"),
    ontimeupdate: FunctionAttribute("ontimeupdate"),
    ontoggle: FunctionAttribute("ontoggle"),
    onunload: FunctionAttribute("onunload"),
    onvolumechange: FunctionAttribute("onvolumechange"),
    onwaiting: FunctionAttribute("onwaiting"),
    onwheel: FunctionAttribute("onwheel"),
}
//?