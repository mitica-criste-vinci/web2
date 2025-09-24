import { Router } from "express";
import { NewDrink } from "../types";

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

const drinks: Drink[] = [
  {
    id: 1,
    title: "Coca-Cola",
    image:
      "https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 2,
    title: "Pepsi",
    image:
      "https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg=",
    volume: 0.33,
    price: 2.5,
  },
  {
    id: 3,
    title: "Eau Minérale",
    image:
      "https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk=",
    volume: 0.5,
    price: 1.5,
  },
  {
    id: 4,
    title: "Jus d'Orange",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.25,
    price: 4.5,
  },
  {
    id: 5,
    title: "Limonade",
    image:
      "https://images.unsplash.com/photo-1583064313642-a7c149480c7e?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    volume: 0.33,
    price: 5,
  },
];  

const router = Router();

router.get("/",(req,res) => {
if (!req.query["budget-max"]) {  // on regarde si la query n'est pas falsey
    // Cannot call req.query.budget-max as "-" is an operator
    return res.json(drinks);  // si elle est vide on retourne la list car c'est un get all
  }
  const budgetMax = Number(req.query["budget-max"]); //On va récupperé le budget max en convertissat le parametre dans la querry en Number
  const filteredDrinks = drinks.filter((drink) => { // içi le .filter va regarder dans la liste de drinks ou le prix est <= au budget max
    return drink.price <= budgetMax;                // ((drink) => { ce qui suit met la condition
  });

  return res.json(filteredDrinks);

});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drink = drinks.find((drink) => drink.id === id);
  if (!drink) {
    return res.sendStatus(404);
  }
  return res.json(drink);
});



router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("image" in body) ||
    !("volume" in body) ||
    !("price" in body) ||
    typeof body.title !== "string" ||
    typeof body.image !== "string" ||
    typeof body.volume !== "number" ||
    typeof body.price !== "number" ||
    !body.title.trim() ||  //.trim vérifie ci il y'a que des espaces
    !body.image.trim() ||
    body.volume <= 0 ||  // volume négatif impossible
    body.price <= 0
  ) {
    return res.sendStatus(400);
  }

  const { title, image, volume, price } = body as NewDrink;

  const nextId =
    drinks.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) +  // .reduce pertemt de réduire un list à un seule nombre
    1;                                                                           // elle prend 2 parametres 1er element de comparasion et 2ieme element courant
     // ? veut dire si true et : veut dire si c'est faux, c'est un if else et 0 à la fin initie une valeu sûre                                                                           

  const newDrink: Drink = {
    id: nextId,
    title,
    image,
    volume,
    price,
  };

  drinks.push(newDrink);
  return res.json(newDrink);
});



router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = drinks.splice(index, 1); // splice() returns an array of the deleted elements
                                                   // ici .splice renvoie une arrayList
                                                   // index nous dis que on veux supprimer à partir de la
                                                   // et 1 veut dire le nombre de suppression que l'on veux faire
  return res.json(deletedElements[0]);             // on renvois le premier éléments car il n'y a que lui dans la liste
});


export default router;
