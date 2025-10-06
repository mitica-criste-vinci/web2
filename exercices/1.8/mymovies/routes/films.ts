import { Router } from "express";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
import path from "path";
import {
  createdFilm,
  deleteOneFilm,
  readAllFilms,
  readOneFilm,
  uptadeOneFilm
} from "../services/films";


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

  const film = readOneFilm(id);

  if(!film) {
    return res.status(404);
  }

  return res.json(film);
  
});


router.get("/", (req,res) => {

  

  const duration = Number(req.query["minimum-duration"]);

  const films = readAllFilms(duration);

  if (duration<=0){
    return res.sendStatus(400);
  }

  return res.json(films);

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


  const { title,director, duration, budget, description, imageUrl} = body as Film;


  const newDrink = createdFilm( { title,director, duration, budget, description, imageUrl});

  return res.json(newDrink);
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

  const deletedFilm = deleteOneFilm(id);


  if (!deletedFilm){
    return res.sendStatus(404);
  }

  return res.json(deletedFilm);
});




router.patch("/:id",(req,res) => {

  const id = Number(req.params.id);

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

  const updatedFilm = uptadeOneFilm(id,{title, director, duration, budget, description, imageUrl});  


  if(!updatedFilm){
    return res.sendStatus(404);
  }

  return res.json(updatedFilm);
});





//*

router.put("/:id", (req, res) => {
  //const id = Number(req.params.id);
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body && typeof body.title === "string" && body.title.trim()) ||
    !("director" in body && typeof body.director === "string" && body.director.trim()) ||
    !("duration" in body && typeof body.duration === "number" && body.duration > 0) ||
    !("budget" in body && typeof body.budget === "number" && body.budget > 0) ||
    !("description" in body && typeof body.description === "string" && body.description.trim()) ||
    !("imageUrl" in body && typeof body.imageUrl === "string" && body.imageUrl.trim())
  ) {
    return res.sendStatus(400);
  }

  //const { title, director, duration, budget, description, imageUrl } = body ;

  //const updatedFilm = updateOneFilm(id, { title, director, duration, budget, description, imageUrl });

  //if (!updatedFilm) return res.sendStatus(404);

  //return res.json(updatedFilm);
});
//*


export default router;
