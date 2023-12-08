// retrieve the number of cookies, purchased items and cookies per second from local storage on page load
let numberOfCookies = parseInt(localStorage.getItem("numberOfCookies")) || 0;
// let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
let cookiesPerSecond = parseInt(localStorage.getItem("cookiesPerSecond")) || 1;

// ⛳️ Set up the interval to increment the number of cookies every second automatically on the page
setInterval(function() {
    numberOfCookies = numberOfCookies + cookiesPerSecond;
    console.log("🍪", numberOfCookies);
    // Call the function to update the HTML element and store in localStorage
    updateNumberOfCookies();
}, 1000) // 1000 milliseconds == 1 second

// function to purchase an item if there is enough cookies and update the cookie count and display items
function purchaseItem(itemName, cost, cookiePerSecondGain) {
    if (numberOfCookies >= cost) {
        numberOfCookies -= cost;
        purchasedItems.push(itemName);
        cookiesPerSecond = cookiePerSecondGain;
        updateNumberOfCookies();
        displayItems();
        updateCookiesPerSecond();
    } else {
        alert("You do not have enough cookies to purchase this item!")
    }
}

// function to display the items
function displayItems() {
    const grannyList = document.getElementById("grannyList")
    grannyList.innerHTML = "";

    purchasedItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        grannyList.appendChild(listItem);
    })
}

// function to update the HTML element with the new number of cookies
function updateNumberOfCookies() {
    document.getElementById("numberOfCookies").textContent = numberOfCookies;
    // store the updated number of cookies, purchased items and cookies per second in local storage
    localStorage.setItem("numberOfCookies", numberOfCookies);
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems))
    localStorage.setItem("cookiesPerSecond", cookiesPerSecond)
}

// functiom to update the HTML element with the number of cookies per second 
function updateCookiesPerSecond() {
    document.getElementById("cookiesPerSecond").textContent = cookiesPerSecond
}

// Event listener for the cookie button 
document.getElementById("cookieBtn").addEventListener("click", function() {
    // increment the number of cookies when the button is clicked 
    numberOfCookies += 1;
    // call the function to update the HTML element and store in local storage
    updateNumberOfCookies();
})

// Event listener for the reset button 
document.getElementById("resetBtn").addEventListener("click", function() {
    // reset the number of cookies to zero, purchased items and cookies per second
    numberOfCookies = 0;
    purchasedItems = [];
    cookiesPerSecond = 1;
    // update the HTML element in local storage and display items
    updateNumberOfCookies();
    displayItems();
    // make the cookie button bounce when the reset button is clicked 
    document.getElementById("resetBtn").classList.add("bounce");
    // remove the bounce clsss after the animation has completed
    setTimeout(function() {
        document.getElementById("resetBtn").classList.remove("bounce")
    }, 600);
})

// Event listener for the purchased item of Granny
document.getElementById("grannyList").addEventListener("click", function() {
    // purhcase granny for 1 cookie, gain 10 cookies and set the cookies per second to 5
    purchaseItem("Granny", 1, 5)
})

// update the HTML element with the cookie count
updateNumberOfCookies();