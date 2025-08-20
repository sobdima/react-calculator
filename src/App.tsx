//МОЖНО ДОБАВИТЬ АНИМАЦИЮ КНОПОК - ТИПА КЛИКНУЛ ПО КНОПКЕ, И ОНА НА ПОЛСЕКУНДЫ ИЗМЕНИЛА ЦВЕТ НА ЖЕЛТЕНКИЙ ИЛИ СЕРЕНЬКИЙ

//ДЕПЛОЙ НА НЕТЛИФАЙ + СДЕЛАТЬ README.MD ФАЙЛ ДЛЯ ГИТХАБА С ОПИСАНИЕМ ПРОЕКТА

import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell';
import { evaluate } from 'mathjs';
import buttons from './components/buttons';
import allowKeys from './components/allowKeys';

function App() {
  const [display, setDisplay] = useState('0');

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
      if (key === 'Backspace') setDisplay('0');

      if (allowKeys.includes(value)) {
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
        <Cell className="increment" onClick={Increment}>
          +1
        </Cell>
        <Cell className="decrement" onClick={Decrement}>
          -1
        </Cell>
        {buttons.map(({ label, value, action, className }, i) => {
          let onClick;

          if (value) onClick = () => handleClick(value);
          if (action === 'clear') onClick = Clear;
          if (action === 'equal') onClick = () => handleClick('=');

          return (
            <Cell
              key={i}
              className={`button ${className ?? ''}`}
              onClick={onClick}
            >
              {label}
            </Cell>
          );
        })}
      </div>
    </>
  );
}

export default App;
