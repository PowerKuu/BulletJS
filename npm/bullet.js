//? Simple utility functions
const uuid = () => URL.createObjectURL(new Blob([])).substr(-36)
const FunctionAttribute = (attr) => (value, element) => {
    if (value instanceof Function) element[attr] = value  
    else return value
}
//?

//? Global variables
const ElementCache = {}
//?

/**
* @param parrent {Node} Parrent node
* @param tree {object} Tree
* @returns {Node} Returns a node
*/
export function build(parrent, tree){
    function drill(parrent, tree){
        for (var key in tree){
            const OuterRaw = ElementCache[key]

            const outer = OuterRaw.clone ? OuterRaw.cloneNode(true) : OuterRaw
            const inner = tree[key]

            parrent.appendChild(outer)
 
            if (inner.nodeType !== undefined){
                outer.appendChild(inner)
                continue
            }
            if (inner instanceof Array) {
                for (var element of inner){
                    if (!(element instanceof Object)) continue
                    drill(outer, element)
                }
                continue
            }
            if (inner instanceof Object){
                drill(outer, inner)
                continue
            }
            
            outer.innerHTML = inner
        }

        return parrent
    }

    drill(parrent, tree)
    return parrent
}

/**
* @param name {string} Tag name
* @param attr {object} Atributes
* @returns {Node} Returns a node
*/
export function node(name, attr = {}, clone=false) {
    function MapArguments(element, attr = {}){
        if (attr == {}) return element

        for (var key in attr){
            const custom = CustomArgumentMap[key]
            const value = custom ? custom(attr[key], element) : attr[key]
            if (!value) continue

            element.setAttribute(key, value)
        }
        
        return element
    }

    const element = MapArguments(document.createElement(name), attr)
    const key = uuid()
    
    element.clone = clone
    element.toString = () => {return key}
    
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

//? Custom argument map (ingnore)
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