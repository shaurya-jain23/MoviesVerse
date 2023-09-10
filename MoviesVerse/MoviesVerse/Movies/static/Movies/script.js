// Get the container element
const container = document.getElementById("container");

// Get the search elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Define the API key and URL
const apiKey = "266d9b01992964e909bdc8948a2f5218";
const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + apiKey;

// Define a function to fetch and display movies
function fetchMovies(query) {

     // Clear the container element
     container.innerHTML = "";

     // If query is empty, use the default URL
     // Otherwise, use the search URL with the query parameter
     let url = query ? "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query : apiUrl;

     // Use the fetch API to get the data from the URL
     fetch(url)
         .then(response => response.json()) 
         .then(data => {
            
             const movies = data.results;
                console.log(data.results)
             
             if (movies.length === 0) {
                 container.innerHTML = "<p>No movies found.</p>";
             }

             
             for (let movie of movies) {
                 
                 const movieDiv = document.createElement("div");
                 movieDiv.className = "movie";
                 
                 movieDiv.innerHTML = `
                     <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" id ="img">
                
                     <h3>${movie.title}</h3>
                 `;
                 
                 container.appendChild(movieDiv);
             }
         })
         .catch(error => {
             // Handle any errors
             console.error(error);
         });
}


searchBtn.addEventListener("click", function() {
    
    let query = searchInput.value;
    
    fetchMovies(query);
});

// Call the fetchMovies function when the page loads
fetchMovies();
