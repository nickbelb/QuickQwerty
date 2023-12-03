'use strict';

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function selectObject(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function addChildToElement(parent,...child){
    child.forEach(element => {
        parent.appendChild(element);
    });
}

function addClassToItems(element,...classes){
    classes.forEach(className => {
        element.classList.add(className);
    })
}
export {onEvent,selectObject,selectAll,addChildToElement,addClassToItems}; 