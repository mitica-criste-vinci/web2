import "../Header/Header.css";
import "../UserCard/UserCard.css";
import "../Footer/Footer.css";
import "./App.css";
import "../../index.css";

import Header from "../Header/index";
import UserCard from "../UserCard/UserCard";
import Footer from "../Footer/index";

function App() {
 
  return (
    <div className="page">
      <Header title="Welcome to My App"/>
      <UserCard />
      <Footer/>
    </div>
  );
}

export default App;
