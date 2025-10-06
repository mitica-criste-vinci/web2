import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/drinks.json");


const defaultFilms: Film[] = [

  
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "Un voleur s'infiltre dans les rêves pour voler des secrets.",
    imageUrl: "https://m.media-amazon.com/images/I/51s+uZ5cGxL._AC_.jpg"
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana & Lilly Wachowski",
    duration: 136,
    budget: 63,
    description: "Un hacker découvre la vérité sur la réalité.",
    imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description: "Des explorateurs voyagent à travers un trou de ver.",
    imageUrl: "https://m.media-amazon.com/images/I/71n58ZzKJjL._AC_SY679_.jpg"
  }
];

function readAllFilms(minimumDuration : number) : Film[] {

    const films = parse(jsonDbPath,defaultFilms);

    if(!minimumDuration){
        return films;
    }

    const minimumDurationNumber = Number(minimumDuration);

    const filteredFilms = films.filter((film) => {
        return film.duration >= minimumDurationNumber;
    });
    return filteredFilms;


}


function readOneFilm(id:number) : Film | undefined {

    const films = parse(jsonDbPath,defaultFilms);

    const film = films.find((film) => film.id === id);

    if(!film){
        return undefined;
    }

    return film;
}



function createdFilm(newFilm : NewFilm) : Film {

    const films = parse(jsonDbPath,defaultFilms);

    const nextId =
            films.reduce((maxId,film) => (film.id > maxId ? film.id : maxId), 0) + 1;


    const createdFilm = {
        id : nextId,
        ...newFilm,
    };

    films.push(createdFilm);
    serialize(jsonDbPath,films);

    return createdFilm;
}



function deleteOneFilm(filmId:number) : Film | undefined {


    const films = parse(jsonDbPath,defaultFilms);

    const index = films.findIndex((film) => film.id = filmId);

    if (index === -1){
        return undefined;
    }

    const deletedFilm = films.splice(index,1);

    serialize(jsonDbPath,defaultFilms);

    return deletedFilm[0];
}


// patch

function uptadeOneFilm (filmId : number, newFilm: Partial<NewFilm>)
: Film | undefined {

    const films = parse(jsonDbPath, defaultFilms);

    const film = films.find((film) => film.id === filmId);


    if(!film){
        return undefined;
    }

    if(newFilm.title !== undefined){
        film.title = newFilm.title;
    }

    if (newFilm.budget !== undefined){
        film.budget = newFilm.budget;
    }

    if(newFilm.description!== undefined){
        film.description = newFilm.description;
    }

    if(newFilm.director !== undefined) {
        film.director = newFilm.director;
    }

    if (newFilm.duration !== undefined) {
        film.duration = newFilm.duration;
    }

    if ( newFilm.imageUrl !== undefined) {
        film.imageUrl = newFilm.imageUrl;
    }

    serialize(jsonDbPath,defaultFilms);
    return film;
    }

    export {
        readAllFilms,
        readOneFilm,
        createdFilm,
        deleteOneFilm,
        uptadeOneFilm,
    };



