import { useState } from "react";

interface ClickCounterProps {
    title: string,
    message?:string;
    hooverMessage?:string;
}

const ClickCounter = ({title,message} : ClickCounterProps) => {
  // État local pour le compteur
  const [count, setCount] = useState(0);
  

  return (
    <div className="card">
        <h2>{title}</h2>
        
      <button onClick={() => setCount(count + 1)}>
        count is {count}

        <h4>{count >= 10 && message}</h4>
      </button>
    </div>
  );
};

export default ClickCounter;
