<div className="relative w-full h-full ">
              <>
              { isRender && arrayAssume.length > 0 ? (
                arrayAssume.map( (item, index)=>{
                  let top, left : number;
                  do {
                    top = (Math.floor(Math.random()*80) +  5);
                    left = (Math.floor(Math.random()*80) + 5);
                  } while (isPositionOccupied(top, left, arrayAssume, index) )
                  
                  const zindex = Math.floor(160/length) +1;
                  return (
                    <span
                      key={index}
                      className={`absolute top-${top} left-${left} w-[30px] h-[30px] rounded-full flex justify-center items-center
                      text-slate-900 border border-slate-900 ${ 
                        isCorrectNumber === 0 
                        ? 'bg-transparent'
                        : isCorrectNumber === 1 
                        ? "bg-green-600 transition-background-color duration-300 ease-in"
                        : "bg-red-600 transition-background-color duration-300 ease-in" 
                        }`}
                      style={{zIndex: zindex}}
                      onClick={handleClickNumber}
                      >
                      {item}
                    </span>
                  )
                })           
                ) : ( (""))
              }            
              </>
          </div>