function getElement(e) {
    return document.querySelector(e)
}

function getElementById(elem) {
    try {
        return document.getElementById(elem);
    } catch (e) {
        webrtcdev.error(e);
        return "";
    }
}

function getElementByName(elem) {
    try {
        if (document.getElementsByName(elem))
            return document.getElementsByName(elem)[0];
    } catch (e) {
        webrtcdev.error(e);
        return "";
    }
}

function isHTML(str) {
    var a = document.createElement('div');
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--;) {
        if (c[i].nodeType == 1) return true;
    }

    return false;
}


/* ********************************************************
UI / DOM related functions
****************************************************** */

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// function showElement(elem){
//     if(elem.vide) elem.video.hidden = false;
//     elem.removeAttribute("hidden");
//     elem.setAttribute("style","display:block!important");
// }

/**
 * function to show an elemnt by id or dom
 * @method
 * @name showelem
 * @param {dom} elem
 */
function showelem(elem) {
    if (!elem) {
        webrtcdev.error("show elem undefined");
        return;
    }
    try {

        webrtcdev.log(" [init] show elem", elem, " , type ", typeof elem, " , nodetype ", elem.nodeType);
        if (typeof elem === 'object' && elem.nodeType !== undefined) {
            // validate its is a dom node
            elem.removeAttribute("hidden");
            elem.setAttribute("style", "display:block!important");
        } else if (getElementById(elem)) {
            // search by ID
            elem = getElementById(elem);
            elem.removeAttribute("hidden");
            elem.setAttribute("style", "display:block");
        } else if (getElementByName(elem)) {
            // search by name
            elem = getElementByName(elem);
            elem[0].removeAttribute("hidden");
            elem[0].setAttribute("style", "display:block");
        } else {
            // not found
            webrtcdev.warn("elem not found ", elem);
        }
    } catch (err) {
        webrtcdev.error("showeleem", err);
    }
}

/**
 * function to hide an Element by id of dom
 * @method
 * @name hideelem
 * @param {dom} elem
 */
function hideelem(elem) {
    try {
        if (typeof elem === 'object' && elem.nodeType !== undefined) {
            elem.setAttribute("hidden", true);
            elem.setAttribute("style", "display:none!important");
        } else if (getElementById(elem)) {
            getElementById(elem).setAttribute("hidden", true);
            getElementById(elem).setAttribute("style", "display:none");
        }
    } catch (err) {
        webrtcdev.error(elem, err)
    }
}


function existselem(elem) {
    return getElementById(elem) ? true : false;
}