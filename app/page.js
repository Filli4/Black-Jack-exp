import card from "./cards/BACK.png";
export default function Home() {



  return (
    <main>
      <div className="">
        <div className="">
       <h2>Dealer:</h2>
       <div className="flex justify-center gap-4">
       <div className="w-56 h-60 border-2"></div>
       <div className="w-56 h-60 border-2"></div>
       </div>
       
      </div>
      <div className="">
        <h2>You:</h2>
        <div className="flex justify-center gap-4">
       <div className="w-56 h-60 border-2"></div>
       <div className="w-56 h-60 border-2"></div>
       </div>
        <div className="justify-around  items-center  m-14 flex" id="your-cards">
        <button className="bg-green-600 p-4 rounded-lg w-40 m-4">Hit</button>
        <button className="bg-red-600 p-4 rounded-lg w-40 m-4">Stay</button>
        </div>
        </div>

        <div className="">
        <p id="results"></p>
</div>
        </div>
    </main>
  )
}
