// ----------------------- responsive navbar ------------------------------

const nav_toggle = document.querySelector(".fa");

  nav_toggle.addEventListener("click", function () {
  document.querySelector(".navlink").classList.toggle("showNav");
  document.querySelector(".fa").classList.toggle("fa-rotate");
  document.querySelector(".body").classList.toggle("body-overflow");
  document.querySelector(".main").classList.toggle("hide");
});


// ----------------------- dark mode ------------------------------

var dark_icon = document.getElementById("dark-icon");

if(localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "dark");
}

let localData = localStorage.getItem("theme");

if(localData == "light"){
    dark_icon.src = dark_icon.src = "moon.png";
    document.body.classList.remove("dark-theme");
}
else if (localData == "dark"){
    dark_icon.src = dark_icon.src = "sun.png";
    document.body.classList.add("dark-theme");
}

dark_icon.onclick = function() {
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")) {
        dark_icon.src = "sun.png"
        localStorage.setItem("theme", "dark");
    }else{
        dark_icon.src = "moon.png"
        localStorage.setItem("theme", "light");
    }
}

// ----------------------- type writing ------------------------------


// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 200;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 250;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }




// ----------------------- contact page ------------------------------

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


// ----------------------- google sheet connection ------------------------------
const scriptURL = 'https://script.google.com/macros/s/AKfycbxaBu4TA0iev2snejP6RdX0ulbzUIShVgiXSxBs8CJpyae1lQeMfwYecsG5obfuXze0/exec'
const form = document.forms['google-sheet']
          
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
  .catch(error => console.error('Error!', error.message))
})