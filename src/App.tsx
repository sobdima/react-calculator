//РАЗОБРАТЬСЯ С ПРЕДУПРЕЖДЕНИЕМ в useCallback
//ВЫНЕСТИ ФУНКЦИИ В utils   по типу такого => utils/handleKeyPress.tsx OR utils/functions.tsx
//ПОПРОБОВАТЬ ПОИСКАТЬ ОПТИМИЗАЦИЮ ПО РЕНДЕРИНГУ ВСЕХ КОПМОНЕНТОВ </Cell> - МОЖЕТ МОЖНО НАЙТИ СПОСОБ НЕ ПРОПИСЫВАТЬ ИХ СТОЛЬКО РАЗ ПОДРЯД, МОЖЕТ МОЖНО ПРИДУМАТЬ КАКОЙ-ТО ЦИКЛ
//ПОСМОТРЕТЬ МОЖЕТ В ЭТОЙ ФУНКЦИИ onClick={() => handleClick('1')} МОЖНО ПЕРЕДАВАТЬ НЕ "1", КАК МАГИЧЕСКОЕ ЧИСЛО, А КОНКРЕТНО innerText САМОГО ЭЛЕМЕНТА (ЧЕРЕЗ target ???)
//МОЖНО ДОБАВИТЬ АНИМАЦИЮ КНОПОК - ТИПА КЛИКНУЛ ПО КНОПКЕ, И ОНА НА ПОЛСЕКУНДЫ ИЗМЕНИЛА ЦВЕТ НА ЖЕЛТЕНКИЙ ИЛИ СЕРЕНЬКИЙ
//ДЕПЛОЙ НА НЕТЛИФАЙ + СДЕЛАТЬ README.MD ФАЙЛ ДЛЯ ГИТХАБА С ОПИСАНИЕМ ПРОЕКТА
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell';
import { evaluate } from 'mathjs';

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

  function handleClick(value: string) {
    if (value === '=') {
      console.log('Get an expression: ', display);
      const expression = display.replace(/[+\-*/]+$/g, '');
      console.log('Get a trimmed expression: ', expression);
      setDisplay(evaluate(expression).toString());
      return;
    }

    setDisplay((prev) => (prev === '0' ? value : prev + value));
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const allowKeys = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        ',',
        '.',
        '=',
        '+',
        '-',
        '*',
        '/',
      ];

      const { key } = event;
      let value = key;

      if (key === 'Enter') value = '=';
      if (key === 'Backspace') setDisplay('0');

      if (allowKeys.includes(value)) {
        console.log('Pressed: ', value);
        handleClick(value);
      }
    },
    [display] //РАЗОБРАТЬСЯ С ЭТИМ ПРЕДУПРЕЖДЕНИЕМ
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
        <Cell className="button" onClick={() => handleClick('1')}>
          1
        </Cell>
        <Cell className="button" onClick={() => handleClick('2')}>
          2
        </Cell>
        <Cell className="button" onClick={() => handleClick('3')}>
          3
        </Cell>
        <Cell className="button operator" onClick={() => handleClick('+')}>
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
        <Cell className="button clear" onClick={Clear}>
          С
        </Cell>
      </div>
    </>
  );
}

export default App;
