
import Win from "./components/win";
import Start from "./components/start";
import Pause from "./components/pause";
import Lose from "./components/lose";
import React from "react";
import "./page.css"
export default function Home() {



  return (
    <main className="m-5 p-2">
      <div className="flex flex-col justify-center items-center m-2 ">
        
       
       
      <div className=" flex  py-4 items-center gap-32 w-fit ">
        <h2 className="p-3 font-serif  text-2xl">Dealer:</h2>
        <p className=" p-3 font-serif bg-red-800 rounded-full text-white text-2xl">Points: 16</p>
      </div>

      
      <div className="Dealer-cards flex">
      <img src=".//cards/BACK.png"/>
      <img src=".//cards/10-C.png"/>
      </div>
  
      
       </div>
     
     <br></br>
     <br></br>
     <br></br>
  {/*    <Win/>
      <Start/>
      <Pause/>
     <Lose/>
   */}
       
      <div className="flex flex-col justify-center items-center m-2 "> 

      <div className=" flex  py-4 items-center gap-32 w-fit">
        <h2 className="p-3 font-serif  text-2xl">You:</h2>
         <p className=" p-3 font-serif bg-blue-800 rounded-full text-white  text-2xl">Points: 14</p>
      </div>

      <div className="Your-cards flex">
      <img src=".//cards/3-C.png"/>
      <img src=".//cards/10-C.png"/>
      </div>
      </div>


        <div className="justify-center gap-16 my-8 items-center   flex">
        <button className="bg-green-600 p-4 rounded-lg w-40 ">Hit</button>
        <button className="bg-red-600 p-4 rounded-lg w-40 ">Stay</button>
        </div>
       

        
        
    </main>
  )
}
