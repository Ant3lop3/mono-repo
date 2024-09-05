//! for GET requests from db
const moviessongsConstainer = document.getElementById("moviessongsCont");

async function getMoviessongs() {
    // here we will change the localhost url to the url thats hosting (in this case Render.com, then Web Service)
    // make sure to add you endpoint at the end (in this case /moviessongs)
    const response = await fetch("https://mono-repo-wk4-day1.onrender.com/moviessongs");
    const data = await response.json()
    console.log(data);
    moviessongsConstainer.innerHTML = "";
    data.forEach((moviessongs) => {
        const p = document.createElement("p");
        p.textContent = `My top movie is ${moviessongs.movie}, and top song is ${moviessongs.song}`;
        moviessongsConstainer.appendChild(p)
    });
}

getMoviessongs();

//! for POST requests to db
const form = document.getElementById("moviesSongsForm");

async function handlePostMoviessongs(event) {
    event.preventDefault();

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
    await fetch("https://mono-repo-wk4-day1.onrender.com/moviessongs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    form.reset();
    getMoviessongs()
}
form.addEventListener("submit", handlePostMoviessongs)

