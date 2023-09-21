const btn = document.getElementById("buscar");

let title = "esVacio";

btn.addEventListener("click", function(){
    title = document.getElementsByTagName("textarea")[0].value;

    let url = "http://www.omdbapi.com/?apikey=dc1d222d&t=" + title;
    
    console.log(url);

    
    fetch(url).then(response => response.json())
    .then(function(response){
        console.log(response)
        console.log(response.Title);
        document.querySelector(".director").innerHTML = response.Director;
        document.querySelector(".year").innerHTML = response.Year;
    });

})
