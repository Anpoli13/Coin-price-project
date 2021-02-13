const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceTag = document.querySelector("h1");
const spanTag = document.querySelector("p span")
let current = "USD";

// function to grab data from Coindesc

const checkPrice = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //data.bpi or data["bpi"]
            priceTag.innerHTML = data.bpi[current].rate_float.toFixed(1);
        })
}

// run this on loud

checkPrice();

// loop over every nav link and add click event

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        current = this.getAttribute("data-currency");
        checkPrice();

        //remove ALL previous selected states
        navLinks.forEach(link => link.classList.remove("selected"));

        //and THEN only do it on thr clicked link
        this.classList.add("selected");

        //update spanTag
        spanTag.innerHTML = current;

        //or update all p
        // const pTag = document.querySelector("p")
        // pTag.innerHTML = current + " per BTC"
         
    })
})

// check the price every 60sec

setInterval(function () {
    checkPrice();
}, 60000)