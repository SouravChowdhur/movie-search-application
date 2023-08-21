//APIURL is the url to show/get popular movies
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const movieBox = document.querySelector("#movie-box");

//getMovies is a function to get data about movies by using url
//it should be async function as we use third party api to fetch data
const getMovies = async (api) =>{
     const response = await fetch(api);
     const data = await response.json();
     //console.log(response);
     //console.log(data);
     showMovies(data.results);//data.results is an array of  movies objects
}


//showMivies function show the movies in browser to the user
const showMovies = (data) =>{
    movieBox.innerHTML = ""; //empty the page first
    //console.log(data);
    //as data is an array, we can use forEach loop
    data.forEach(
        (item)=>{
           //console.log(item);//we can access the object individually 
           const imagePath = item.poster_path === null ? "image-missing.png":IMGPATH + item.poster_path;
           const box = document.createElement("div");//step - 1
           box.classList.add("box");//step - 2
           box.innerHTML = `
           <img src="${imagePath}" alt="">
           <div class="overlay">
               <div class="title">
                   <h2>${item.original_title}</h2>
                   <span>${item.vote_average}</span>
                   <span>${item.release_date}</span>
               </div>
               <h3>Overview: </h3>
               <p>
                   ${item.overview}
               </p>
           </div>
           `;//step - 3
           movieBox.appendChild(box);//step - 4
        }
    )
}


//init call in js --> when the page is refreshed, then and there this function is automatically invoked.
getMovies(APIURL);


document.getElementById("search").addEventListener("keyup",
function(event){
   if(event.target.value != "")
      getMovies(SEARCHAPI + event.target.value);
   else 
      getMovies(APIURL);
})