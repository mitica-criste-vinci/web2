import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
}

const Header = ({ title, version }: HeaderProps) => { 
  const [menuPrinted, setMenuPrinted] = useState(false);   // menuPrinted c'est l'etat de notre variable définie a false dans notre useState qui permet de modifier notre page dynamiquement
  // setMenuPrinted c'est la fonction qui change ntre menuPrinted

  return (   //one click rend le header clickable
    <header onClick={() => setMenuPrinted(!menuPrinted)}  // des que on clique ca inverse l'etat de notre menu (de false et true et inversement)
    >  
      <h1 className="animate__animated animate__bounce">
        {menuPrinted ? `${title}... and rarely do we hate it!` : title // cette ligne dit que si true on affiche un tel et vice versa
         }   
      </h1>  
      <h4>Version: {version}</h4>
    </header> 
  );
};



export default Header;
