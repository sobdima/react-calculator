import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell';
import { evaluate } from 'mathjs';
import allowKeys from './components/allowKeys';

function App() {
  const [display, setDisplay] = useState('0');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  function pressButton(key: string) {
    setActiveButton(key);
    setTimeout(() => setActiveButton(null), 150);
  }

  const sanitizeDisplay = (expr: string) => {
    return expr.replace(/^([+\-*/])/, '0$1');
  };

  function Increment() {
    const expression = sanitizeDisplay(display.replace(/[+\-*/]+$/g, ''));
    setDisplay((evaluate(expression) + 1).toString());
  }

  function Decrement() {
    const expression = sanitizeDisplay(display.replace(/[+\-*/]+$/g, ''));
    setDisplay((evaluate(expression) - 1).toString());
  }

  function Clear() {
    setDisplay('0');
  }

  const handleClick = useCallback(
    (value: string) => {
      pressButton(value);

      if (value === '=') {
        const expression = sanitizeDisplay(display.replace(/[+\-*/]+$/g, ''));
        console.log('dimon', expression);
        setDisplay(evaluate(expression).toString());
        return;
      }

      setDisplay((prev) => (prev === '0' ? value : prev + value));
    },
    [display]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      let value = key;

      if (key === 'Enter') value = '=';
      if (key === 'Backspace' || key === 'c' || key === 'C') {
        value = 'clear';
        setDisplay('0');
        pressButton(value);
      }

      if (allowKeys.includes(value)) {
        pressButton(value);
        handleClick(value);
      }
    },
    [handleClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <h1 className="main-title">Simple Calculator</h1>
      <div className="calculator-container">
        <Cell className="display">{display}</Cell>

        <Cell
          className={`increment ${activeButton === 'increment' ? 'active' : ''}`}
          onClick={() => {
            pressButton('increment');
            Increment();
          }}
        >
          +1
        </Cell>
        <Cell
          className={`decrement ${activeButton === 'decrement' ? 'active' : ''}`}
          onClick={() => {
            pressButton('decrement');
            Decrement();
          }}
        >
          -1
        </Cell>

        <Cell
          className={`button ${activeButton === '1' ? 'active' : ''}`}
          onClick={() => handleClick('1')}
        >
          1
        </Cell>
        <Cell
          className={`button ${activeButton === '2' ? 'active' : ''}`}
          onClick={() => handleClick('2')}
        >
          2
        </Cell>
        <Cell
          className={`button ${activeButton === '3' ? 'active' : ''}`}
          onClick={() => handleClick('3')}
        >
          3
        </Cell>
        <Cell
          className={`button operator ${activeButton === '+' ? 'active' : ''}`}
          onClick={() => handleClick('+')}
        >
          +
        </Cell>
        <Cell
          className={`button ${activeButton === '4' ? 'active' : ''}`}
          onClick={() => handleClick('4')}
        >
          4
        </Cell>
        <Cell
          className={`button ${activeButton === '5' ? 'active' : ''}`}
          onClick={() => handleClick('5')}
        >
          5
        </Cell>
        <Cell
          className={`button ${activeButton === '6' ? 'active' : ''}`}
          onClick={() => handleClick('6')}
        >
          6
        </Cell>
        <Cell
          className={`button operator ${activeButton === '-' ? 'active' : ''}`}
          onClick={() => handleClick('-')}
        >
          -
        </Cell>
        <Cell
          className={`button ${activeButton === '7' ? 'active' : ''}`}
          onClick={() => handleClick('7')}
        >
          7
        </Cell>
        <Cell
          className={`button ${activeButton === '8' ? 'active' : ''}`}
          onClick={() => handleClick('8')}
        >
          8
        </Cell>
        <Cell
          className={`button ${activeButton === '9' ? 'active' : ''}`}
          onClick={() => handleClick('9')}
        >
          9
        </Cell>
        <Cell
          className={`button operator ${activeButton === '*' ? 'active' : ''}`}
          onClick={() => handleClick('*')}
        >
          x
        </Cell>
        <Cell
          className={`button ${activeButton === '0' ? 'active' : ''}`}
          onClick={() => handleClick('0')}
        >
          0
        </Cell>
        <Cell
          className={`button ${activeButton === '.' ? 'active' : ''}`}
          onClick={() => handleClick('.')}
        >
          .
        </Cell>
        <Cell
          className={`button equal ${activeButton === '=' ? 'active' : ''}`}
          onClick={() => handleClick('=')}
        >
          =
        </Cell>
        <Cell
          className={`button operator ${activeButton === '/' ? 'active' : ''}`}
          onClick={() => handleClick('/')}
        >
          ÷
        </Cell>
        <Cell
          className={`button clear ${activeButton === 'clear' ? 'active' : ''}`}
          onClick={() => {
            pressButton('clear');
            Clear();
          }}
        >
          С
        </Cell>
      </div>
    </>
  );
}

export default App;
