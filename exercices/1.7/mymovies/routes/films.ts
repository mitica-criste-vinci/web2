import { Router } from "express";
import { Film } from "../types";
import { parse, serialize } from "../utils/json";
import path from "path";


const jsonDbPath = path.join(__dirname, "/../data/films.json");



const defaultFilm: Film[] = [

  
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

const router = Router();


// GET /films → Lire toutes les ressources
router.get("/", (_req, res) => {
const films = parse(jsonDbPath,defaultFilm);
  return res.json(films);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const film = defaultFilm.find((film) => film.id === id);

  if(!film) {
    return res.status(404);
  }

  return res.json(film);
  
});


router.get("/", (req,res) => {

  const films = parse(jsonDbPath,defaultFilm);

  if (!req.query["minimum-duration"]){
    return res.json(films);
  }

  const duration = Number(req.query["minimum-duration"]);

  if (duration<=0){
    return res.sendStatus(400);
  }

  const filtredFilms = films.filter((film) => {
    return film.duration <= duration;
  });

  return res.json(filtredFilms);

});


router.post("/",(req,res)=>{

  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ) {
    return res.sendStatus(400);
  }


  const { title,director, duration} = body as Film;
  const { budget, description, imageUrl } = body as Film;

  const films = parse(jsonDbPath,defaultFilm);


  const nextId = films.reduce((maxId,film) => (film.id>maxId ? film.id : maxId), 0) + 1;

const film : Film = {
  id:nextId,
  title,
  director,
  duration,
  budget,
  description,
  imageUrl
};

films.push(film);
serialize(jsonDbPath, films);

return res.json(film);
});


router.get("/", (req,res) => {

  if (!req.query["minimum-duration"]){
    return res.json(defaultFilm);
  }

  const duration = Number(req.query["minimum-duration"]);

  if (duration<=0){
    return res.json({ error: "Wrong minimum duration" });
  }

  const filtredFilms = defaultFilm.filter((film) => {
    return film.duration <= duration;
  });

  return res.json(filtredFilms);

});

router.get("/title/:prefix", (req, res) => {
  const prefix = req.params.prefix.toLowerCase();

  const results = defaultFilm.filter((film) =>
    film.title.toLowerCase().startsWith(prefix)
  );
  return res.json(results);
});

// sort (default asc)
router.get("/sort/title", (_req, res) => {
  const sorted = defaultFilm.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return res.json(sorted);
});



// sort desc
router.get("/sort/title/desc", (_req, res) => {
  const sorted = defaultFilm.sort((a, b) => {
    if (a.title > b.title) return -1;
    if (a.title < b.title) return 1;
    return 0;
  });
  return res.json(sorted);
});


// delete

router.delete("/:id",(req,res) => {

  const id = Number(req.params.id);

  const films = parse(jsonDbPath,defaultFilm);

  const index = films.findIndex((film) => film.id === id);

  if (index === - 1) {
    return res.status(404);
  }

  const deletedElements = films.splice(index,1);
  serialize(jsonDbPath,films);

  return res.send(deletedElements[0]);
});




router.patch("/:id",(req,res) => {

  const id = Number(req.params.id);

  const films = parse(jsonDbPath,defaultFilm);

  const film = films.find((film) => film.id === id);

  if(!film){
    return res.sendStatus(404);
  }

  const body : unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
      "budget" in body &&
    (typeof body.budget !== "number" || body.budget <= 0) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) 

  )

   {
    return res.sendStatus(400);
  }


  const {title, director, duration, budget, description, imageUrl} : Partial<Film> = body;

  if(title){
    film.title = title;
  }

  if(director){
    film.director = director;
  }

  if(duration){
    film.duration = duration;
  }

  if(budget){
    film.budget=budget;
  }

  if(description){
    film.description= description;
  }

  if(imageUrl){
    film.imageUrl= imageUrl;
  }


  serialize(jsonDbPath,films);

  return res.json(film);
});





router.put("/:id",(req,res) => {

  const id = Number(req.params.id);

  const films = parse(jsonDbPath,defaultFilm);

  let film = films.find((film) => film.id === id);

  if(!film){
    return res.sendStatus(404);
  }

  const body : unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
      "budget" in body &&
    (typeof body.budget !== "number" || body.budget <= 0) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) 

  )

   {
    return res.sendStatus(400);
  }


  const {title, director, duration, budget, description, imageUrl} : Film = body as Film;

  if(film){

    film.title = title;
    film.director = director;
    film.duration = duration;

    if (budget !== undefined) film.budget = budget;
    if (description !== undefined) film.description = description;
    if (imageUrl !== undefined) film.imageUrl = imageUrl;
  } else {

    film = { id, title, director, duration, budget, description, imageUrl };
    defaultFilm.push(film);
  }

  serialize(jsonDbPath,films);
  return res.json(film);
  
});


export default router;
