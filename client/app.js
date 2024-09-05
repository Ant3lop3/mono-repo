//! for GET requests from db
const moviessongsConstainer = document.getElementById("moviessongsCont");

async function getMoviessongs() {
    const response = await fetch("http://localhost:8080/moviessongs");
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
    await fetch("http://localhost:8080/moviessongs", {
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

