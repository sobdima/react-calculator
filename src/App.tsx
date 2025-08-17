import './App.css';
//import cells from './components/arrayOfCells';
import Cell from './components/Cell';

function App() {
  return (
    <>
      <h1 className="main-title">useState Calculator</h1>
      <div className="calculator-container">
        <Cell className="display">0</Cell>
        <Cell className="increment">+1</Cell>
        <Cell className="decrement">-1</Cell>
        <Cell className="button">1</Cell>
        <Cell className="button">2</Cell>
        <Cell className="button">3</Cell>
        <Cell className="button operator">+</Cell>
        <Cell className="button">4</Cell>
        <Cell className="button">5</Cell>
        <Cell className="button">6</Cell>
        <Cell className="button operator">-</Cell>
        <Cell className="button">7</Cell>
        <Cell className="button">8</Cell>
        <Cell className="button">9</Cell>
        <Cell className="button operator">x</Cell>
        <Cell className="button">0</Cell>
        <Cell className="button">,</Cell>
        <Cell className="button">=</Cell>
        <Cell className="button operator">÷</Cell>
        <Cell className="button clear">С</Cell>
      </div>
    </>
  );
}

export default App;
