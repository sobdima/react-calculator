//МОЖНО ДОБАВИТЬ АНИМАЦИЮ КНОПОК - ТИПА КЛИКНУЛ ПО КНОПКЕ, И ОНА НА ПОЛСЕКУНДЫ ИЗМЕНИЛА ЦВЕТ НА ЖЕЛТЕНКИЙ ИЛИ СЕРЕНЬКИЙ

//ДЕПЛОЙ НА НЕТЛИФАЙ + СДЕЛАТЬ README.MD ФАЙЛ ДЛЯ ГИТХАБА С ОПИСАНИЕМ ПРОЕКТА

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

  function Increment() {
    const expression = display.replace(/[+\-*/]+$/g, '');
    setDisplay((evaluate(expression) + 1).toString());
  }

  function Decrement() {
    const expression = display.replace(/[+\-*/]+$/g, '');
    setDisplay((evaluate(expression) - 1).toString());
  }

  function Clear() {
    setDisplay('0');
  }

  const handleClick = useCallback(
    (value: string) => {
      pressButton(value);

      if (value === '=') {
        const expression = display.replace(/[+\-*/]+$/g, '');
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
      if (key === 'Backspace') {
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
      <h1 className="main-title">useState Calculator</h1>
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
        <Cell className="decrement" onClick={Decrement}>
          -1
        </Cell>

        <Cell
          className={`button ${activeButton === '1' ? 'active' : ''}`}
          onClick={() => handleClick('1')}
        >
          1
        </Cell>
        <Cell className="button" onClick={() => handleClick('2')}>
          2
        </Cell>
        <Cell className="button" onClick={() => handleClick('3')}>
          3
        </Cell>
        <Cell
          className={`button operator ${activeButton === '+' ? 'active' : ''}`}
          onClick={() => handleClick('+')}
        >
          +
        </Cell>
        <Cell className="button" onClick={() => handleClick('4')}>
          4
        </Cell>
        <Cell className="button" onClick={() => handleClick('5')}>
          5
        </Cell>
        <Cell className="button" onClick={() => handleClick('6')}>
          6
        </Cell>
        <Cell className="button operator" onClick={() => handleClick('-')}>
          -
        </Cell>
        <Cell className="button" onClick={() => handleClick('7')}>
          7
        </Cell>
        <Cell className="button" onClick={() => handleClick('8')}>
          8
        </Cell>
        <Cell className="button" onClick={() => handleClick('9')}>
          9
        </Cell>
        <Cell className="button operator" onClick={() => handleClick('*')}>
          x
        </Cell>
        <Cell className="button" onClick={() => handleClick('0')}>
          0
        </Cell>
        <Cell className="button" onClick={() => handleClick('.')}>
          ,
        </Cell>
        <Cell className="button" onClick={() => handleClick('=')}>
          =
        </Cell>
        <Cell className="button operator" onClick={() => handleClick('/')}>
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
