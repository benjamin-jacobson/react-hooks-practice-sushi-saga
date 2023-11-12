import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {

  const [sushis, setSushis] = useState([])
  // const [sushi4Count, setSushi4Count] = useState(0)
  const [wallet, setWallet] = useState(100)
  // const [plates, setPlates] = useState([])

  // useEffect(() => {
  //   console.log("I ran")
  //   fetch(API,
  //     {
  //       method: "GET",
  //       headers: {"Content-Type":"application/json"},
  //       body: null
  //     })
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     // .then((data) =>displayedDataFunc(data))
  // }
  // ,[]);

  useEffect(() => {
    console.log("I ran")
    fetch(API,
      {
        method: "GET",
        headers: {"Content-Type":"application/json"},
        body: null
      })
      .then((res) => res.json())
      .then((sushis) => {
        const updatedSushis = sushis.map((sushi) => {
          return {...sushi, eaten:false};
        });
        setSushis(updatedSushis)
      })
      
  }
  ,[]);

  function handleEatSushi(eatenSushi) {
    if (wallet >= eatenSushi.price) {
      const updatedSushis = sushis.map((sushi) => {
        if (sushi.id === eatenSushi.id) return { ...sushi, eaten: true };
        return sushi;
      });

      setSushis(updatedSushis);
      setWallet((wallet) => wallet - eatenSushi.price);
    } else {
      alert("Need more 💸");
    }
  }

  function handleAddMoney(moreMoney) {
    setWallet((wallet) => wallet + moreMoney);
  }

  const eatenSushis = sushis.filter((sushi) => sushi.eaten);

  return (
    <div className="app">
      <SushiContainer 
        sushis={sushis} 
        onEatSushi={handleEatSushi}/>
      <Table wallet={wallet}  onAddMoney={handleAddMoney} plates={eatenSushis}/>
    </div>
  );
}

export default App;

// APP
    // SushiContainer
        // Sushi
        // MoreButton
    // Table