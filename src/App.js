import { Fragment, useEffect, useRef, useState } from 'react';

function App() {
  //false 1. player x
  //true 2. player o
  const [toggle, setToggle] = useState(false)
  const [counter, setCounter] = useState(0)
  const [winner, setWinner] = useState("")
  const [values, setValues] = useState(["", "", "", "", "", "", "", "", ""])

  useEffect(() => {
    setCounter(0)
    for (let index = 0; index < 9; index++) {
      if (values[index]) {
        setCounter(counter + 1)
      }
    }
    counter == 8 && setWinner("none")
    checkWinner();

  }, [values])
  const checkWinner = () => {

    const x = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < x.length; i++) {
      const [a, b, c] = x[i];
      values[a] && values[a] == values[b] && values[a] == values[c] && setWinner(toggle ? "X" : "O")
    }

  }

  const setValueArray = (index, value) => {
    let valuesArray = [...values]
    valuesArray[index] = value
    setValues(valuesArray)
  }

  const forLoop = () => {
    let buttons = [];
    for (let index = 0; index < 9; index++) {
      buttons.push(<Squre key={index} index={index} setvalues={setValues} toggle={toggle} setToggle={setToggle} setValueArray={setValueArray} winner={winner}></Squre>)
    }
    return buttons
  }

  const restartGame = () => {
    setWinner("");
    setValues(["", "", "", "", "", "", "", "", ""])
    setToggle(false)
  }

  return (
    <div style={{ textAlign: "center" }}>
      {winner &&
        <div className='winnerModal'>
          <div style={{}}>
            <h1>{winner == "none" ? "" : winner}</h1>
            <h2>{winner == "none" ? "BERABERE" : "OYUNCUSU KAZANDI"}</h2>
            <button onClick={() => restartGame()}>TEKRAR BAŞLA</button>
          </div>
        </div>
      }
      <h1>Oynama Sırası: {toggle ? "O" : "X"}</h1>
      <div className='board'>
        {forLoop()}
      </div >
    </div>

  );
}

export default App;

const Squre = ({ toggle, setToggle, index, setValueArray, winner }) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    winner && setValue("")
  }, [winner])

  return (
    <button style={{fontSize:"25px"}} className={value ? "pointer-events-none squre-btn" : "squre-btn"} onClick={() => { setValue(toggle ? "O" : "X"); setToggle(!toggle); setValueArray(index, toggle ? "O" : "X") }}>{value}</button >

  )

}