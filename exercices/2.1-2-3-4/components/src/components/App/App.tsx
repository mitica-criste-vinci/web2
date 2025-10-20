/*
ex2.1 

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
       <PageTitle title={pageTitle} />
    
    
         <Cinema
        name={cinema1Name}
        movie1Title={cinema1Movie1Title}
        movie1Director={cinema1Movie1Director}
        movie2Title={cinema1Movie2Title}
        movie2Director={cinema1Movie2Director}
      />


       <Cinema
        name={cinema2Name}
        movie1Title={cinema2Movie1Title}
        movie1Director={cinema2Movie1Director}
        movie2Title={cinema2Movie2Title}
        movie2Director={cinema2Movie2Director}
      />
     
    </div>
  );
};


interface HeaderProps {
  title: string;
}

interface CinemaProps {
  name: string;
  movie1Title: string;
  movie1Director: string;
  movie2Title: string;
  movie2Director: string;
}

const PageTitle = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};


const Cinema = (props: CinemaProps) => {
    return (
      <div>
        <h2>{props.name}</h2>
        <ul>
          <li>
            <strong>{props.movie1Title}</strong> - Réalisateur : {props.movie1Director}
          </li>
          <li>
            <strong>{props.movie2Title}</strong> - Réalisateur : {props.movie2Director}
          </li>
        </ul>
      </div>
    );
};




export default App;

*/


/* ex 2.2
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const movie1 = {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  };
  const movie2 = {
    title: "GOODBYE JULIA ",
    director: "Mohamed Kordofani",
  };

  const cinema2Name = "UGC Toison d'Or";
  const movie3 = {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  };
  const movie4 = {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  };

  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movie1={movie1} movie2={movie2} />

      <Cinema name={cinema2Name} movie1={movie3} movie2={movie4} />
    </div>
  );
};

type Movie = {
  title: string;
  director: string;
};

type PageTitleProps = {
  title: string;
};

type CinemaProps = {
  name: string;
  movie1: Movie;
  movie2: Movie;
};

const PageTitle = (props: PageTitleProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};

const Cinema = (props: CinemaProps) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        <li>
          <strong>{props.movie1.title}</strong> - Réalisateur :{" "}
          {props.movie1.director}
        </li>
        <li>
          <strong>{props.movie2.title}</strong> - Réalisateur :{" "}
          {props.movie2.director}
        </li>
      </ul>
    </div>
  );
};
export default App;
*/


import PageTitle from "../PageTitle/PageTitle";
import Cinema from "../Main/Cinema";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const moviesCinema1 = [
    { title: "HAIKYU-THE DUMPSTER BATTLE", director: "Susumu Mitsunaka" },
    { title: "GOODBYE JULIA", director: "Mohamed Kordofani" },
    { title: "INCEPTION", director: "Christopher Nolan" },
    { title: "PARASITE", director: "Bong Joon-ho" },
  ];

  const cinema2Name = "UGC Toison d'Or";
  const moviesCinema2 = [
    { title: "THE WATCHERS", director: "Ishana Night Shyamalan" },
    { title: "BAD BOYS: RIDE OR DIE", director: "Adil El Arbi, Bilall Fallah" },
    { title: "TENET", director: "Christopher Nolan" },
    { title: "THE IRISHMAN", director: "Martin Scorsese" },
  ];

  return (
    <div>
      <Header logoUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c">
        <h2>Bienvenue sur Movie Explorer 🎬</h2>
      </Header>

      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={moviesCinema1} />
      <Cinema name={cinema2Name} movies={moviesCinema2} />

      <Footer logoUrl="https://images.unsplash.com/photo-1564869736745-71bbde5b1e26">
        <p>© 2025 Movie Explorer — Tous droits réservés.</p>
      </Footer>
    </div>
  );
};

export default App;
