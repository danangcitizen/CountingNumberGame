/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"; // , { useState }
import "./style.css";

interface ArrayAssume {
  order: number;
  top: string;
  left: string;
  layer: number;
}

const Main: React.FC = () => {
  const [isCorrectNumber, setIsCorrectNumber] = useState<number>(0)
  const [isInCorrectNumber, setIsInCorrectNumber] = useState<number>(0)
  const [challengeCurrent, setChallengeCurrent] = useState<number>();
  const [challengeNext, setChallengeNext] = useState<number>();
  const [arrayAssume, setArrayAssume] = useState<ArrayAssume[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(1);
  const [isStatusPlay, setIsStatusPlay] = useState<boolean>(false); // start | restart; 
  const [isStatusGame, setIsStatusGame] = useState<number>(0); //  0: start; 1:done; 2: game over
  const [timeCurrent, setTimeCurrent] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handlePlayClick = () =>{
    if(updateChallengePoint() > 0 ){
      setArrayAssume(creativeArrayNumber(updateChallengePoint()));
      setIsStatusPlay(true);
      setIsStatusGame(0);
      setCorrectIndex(1);
      setIsInCorrectNumber(0);
      setIsCorrectNumber(0);
      setTimeCurrent(0);
      
      
    } else {
      alert(`Please input a number`)
    } 
  }

  const updateChallengePoint = () =>{
    const inputElement = document.getElementById('challengePoint') as HTMLInputElement;
    const value = parseInt(inputElement.value, 10)
    return value
  }

  const handleClickNumber = (order : number) =>{
    if( arrayAssume.length>0 ){  
      setCorrectIndex(correctIndex + 1) 
      console.log(correctIndex);  
      if( order === correctIndex){
        const newFilteredArray = arrayAssume.filter((item, index) => item.order !== order);
        setTimeout(()=>{
          setArrayAssume(newFilteredArray); 
        }, 500)
        if(newFilteredArray.length === 0){
          setIsStatusGame(1);

        }
        setIsCorrectNumber(correctIndex); 
      } else{
        setIsInCorrectNumber(order);
        setCorrectIndex(0) 
        setTimeout(()=>{
          setIsStatusGame(2);
        }, 500)
      }
      
    }
    
  }

  const creativeArrayNumber = (point: number): ArrayAssume[] =>{
    const newArray = Array.from({length: point}, (_,i)=> i+1);
    const arrayFinal = newArray.map( (item, index)=>({
        order: item,
        top: `${Math.floor(Math.random()*340) + 3}`,
        left: `${Math.floor(Math.random()*480) + 3}`,
        layer: point-item
      }))
    return arrayFinal
  }

  useEffect(()=>{
    if (challengeCurrent !== undefined && challengeNext !== undefined){
      setChallengeCurrent(challengeNext);
    }
    if (isStatusGame === 1) {
      setIsStatusPlay(true);
      setIsCorrectNumber(0);
      setIsInCorrectNumber(0);
    }
    let intervalId: any;
    if (isStatusGame === 0 && isStatusPlay) {
      intervalId = setInterval(() => {
        setTimeCurrent((prevSeconds) => prevSeconds + 0.1);
      }, 100);
    } else {
      clearInterval(intervalId);
      // Save the final time if the game is over (isStatusGame === 1 or 2)
      if (isStatusGame !== 0) {
        setTimeCurrent(timeCurrent);
      }
    }

  return () => clearInterval(intervalId);
  }, [challengeCurrent, challengeNext, arrayAssume, isStatusGame,isStatusPlay, isCorrectNumber, isInCorrectNumber])

  return (
    <>
      <div className="container shadow-sm shadow-cyan-800 mx-auto my-5  w-[600px] h-[600px] p-10 flex flex-col items-start gap-2"
      >
        <h1 className={`uppercase text-2xl font-bold
          ${ isStatusGame === 0 ? ("text-slate-800")
            : isStatusGame === 1 ? ("text-green-700")
            : ("text-red-700")
            }
          `}>
          <>
            { isStatusGame === 0 ? ("Let's Play")
            : isStatusGame === 1 ? ("All cleared")
            : ("game over")
            }
          </>
        </h1>
        <div className="flex items-center justify-start space-x-4">
          <div className="w-20"> Points</div>
          <input type="number" name="challengePoint" id="challengePoint" 
            className="border border-slate-600 w-24 p-1"
            value={challengeCurrent}
            onChange={updateChallengePoint}
            />
        </div>
        <div className="flex items-center justify-start space-x-4">
          <div className="w-20"> Times</div>
          <div className="w-20 justify-start">{`${timeCurrent.toFixed(1)}`.padStart(3, '0')} s</div>
        </div>
        <button className="text-center bg-slate-600 text-white rounded shadow-cyan-800 shadow-sm w-20
          active:translate-y-1  focus:ease-in-out duration-100 "
          onClick={ handlePlayClick }
          >
            <>
              { isStatusPlay ? ("Restart") : ("Play") }
            </>
        </button>
        <div className="w-full h-[90%] border border-black ">
          <div className="relative w-full h-full ">
            <>
            {arrayAssume.length > 0 ? (
                arrayAssume.map( (item, index)=>(
                    <span
                      key={index}
                      className={`absolute  w-[30px] h-[30px] rounded-full flex justify-center items-center
                      text-slate-900 border border-slate-900 font-bold shadow-sm shadow-slate-600 
                        cursor-pointer
                        ${ (item.order === isCorrectNumber ? (" delayed-removal bg-green-600"): ("bg-white"))} 
                        ${ (item.order === isInCorrectNumber ? ("bg-red-600 delay") : (""))}
                        ${ isStatusGame === 2 ? ("cursor-not-allowed  "): ("")}
                      `} //  delayed-removal
                      style={
                        {zIndex: item.layer , top: `${item.top}px`, left: `${item.left}px`}
                      }
                      onClick={()=> {handleClickNumber(item.order)}}
                      >
                      {item.order}
                    </span>
                    
                  //)
                  )
                )           
              ) 
              : ( (""))
            }            
            </>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
