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

export default router;
