import { Router } from "express";
import { Film } from "../types";

const films: Film[] = [
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
  return res.json(films);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const film = films.find((film) => film.id === id);

  if(!film) {
    return res.status(404);
  }

  return res.json(film);
  
});


router.get("/", (req,res) => {

  if (!req.query["minimum-duration"]){
    return res.json(films);
  }

  const duration = Number(req.query["minimum-duration"]);

  if (duration<=0){
    return res.json({ error: "Wrong minimum duration" });
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

return res.json(film);
});


router.get("/", (req,res) => {

  if (!req.query["minimum-duration"]){
    return res.json(films);
  }

  const duration = Number(req.query["minimum-duration"]);

  if (duration<=0){
    return res.json({ error: "Wrong minimum duration" });
  }

  const filtredFilms = films.filter((film) => {
    return film.duration <= duration;
  });

  return res.json(filtredFilms);

});

router.get("/title/:prefix", (req, res) => {
  const prefix = req.params.prefix.toLowerCase();

  const results = films.filter((film) =>
    film.title.toLowerCase().startsWith(prefix)
  );
  return res.json(results);
});

// sort (default asc)
router.get("/sort/title", (_req, res) => {
  const sorted = films.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return res.json(sorted);
});



// sort desc
router.get("/sort/title/desc", (_req, res) => {
  const sorted = films.sort((a, b) => {
    if (a.title > b.title) return -1;
    if (a.title < b.title) return 1;
    return 0;
  });
  return res.json(sorted);
});





export default router;
