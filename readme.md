Answer to the Question No - 1

getElementById("id") → returns single element with that id.

getElementsByClassName("class") → returns HTMLCollection (live) of all elements with that class.

querySelector("css") → returns first match for a CSS selector.

querySelectorAll("css") → returns a NodeList (static) of all matches.





Answer to the Question No - 2

const div = document.createElement("div");  
div.textContent = "Abdul Hasib Zahid";  
document.body.appendChild(div); 




Answer to the Question No - 3

When an event (e.g., click) happens on an element, it bubbles up from the target → parent → root (document).






Answer to the Question No-4

Attaching one event listener on a parent, instead of each child.

Uses bubbling to catch events from children.

Useful for dynamic elements and performance optimization.





Answer to the Question No-5

preventDefault() → stops the default browser action (e.g., link navigation, form submit).

stopPropagation() → stops the event from bubbling up to parent elements.