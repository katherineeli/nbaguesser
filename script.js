const url = "https://www.balldontlie.io/api/v1/players"

async function getapi(url) { 
    
    // Storing response 
    const response = await fetch(url); 
    
    // Storing data in form of JSON 
    var data = await response.json(); 
    console.log(data); 
    if (response) { 
        hideloader(); 
    } 
    show(data); 
} 
// Calling that async function 
getapi(url); 