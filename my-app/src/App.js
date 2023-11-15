import { useState } from 'react';

function App() {
	// Инициализация состояния калькулятора
	const [calc, setCalc] = useState('');
	// Инициализация состояния результата
	const [result, setResult] = useState('');

	// Операторы калькулятора
	const ops = ['/', '*', '+', '-', '.'];

	// Функция для обновления состояния калькулятора
	const updateCalc = (value) => {
		// Проверяем, возможность добавления оператора
		if (
			(ops.includes(value) && calc === '') || // Если оператор первый символ или
			(ops.includes(value) && ops.includes(calc.slice(-1))) // если предыдущий символ уже оператор
		) {
			return; // Возвращаемся, не обновляя состояние
		}

		// Обновляем состояние калькулятора, добавляя введенный символ
		setCalc(calc + value);

		// Проверяем, является ли символ оператором
		if (!ops.includes(value)) {
			// Если символ не оператор, вычисляем результат и обновляем состояние результата
			setResult(eval(calc + value).toString());
		}
	};

	// Функция для создания кнопок с цифрами
	const createDigits = () => {
		const digits = [];

		for (let i = 1; i < 10; i++) {
			digits.push(
				<button onClick={() => updateCalc(i.toString())} key={i}>
					{i}
				</button>,
			);
		}

		return digits;
	};

	// Функция для выполнения вычислений
	const calculate = () => {
		// Вычисляем результат и обновляем состояние результата
		setCalc(eval(calc).toString());
	};

	// Функция для удаления последнего символа
	const deleteLast = () => {
		if (calc === '') {
			// Проверяем, пустая ли строка
			return; // Возвращаемся, нет символов для удаления
		}

		const value = calc.slice(0, -1); // Удаляем последний символ

		// Обновляем состояние калькулятора
		setCalc(value);
	};

	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : ''}&nbsp;
					{calc || '0'} {/* Если есть результат выводим его, иначе - 0 */}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>{' '}
					{/* Обработчик клика для добавления оператора / */}
					<button onClick={() => updateCalc('*')}>*</button>{' '}
					{/* Обработчик клика для добавления оператора * */}
					<button onClick={() => updateCalc('+')}>+</button>{' '}
					{/* Обработчик клика для добавления оператора + */}
					<button onClick={() => updateCalc('-')}>-</button>{' '}
					{/* Обработчик клика для добавления оператора - */}
					<button onClick={deleteLast}>DEL</button>{' '}
					{/* Обработчик клика для удаления последнего символа */}
				</div>

				<div className="digits">
					{createDigits()} {/* Создаем кнопки с цифрами */}
					<button onClick={() => updateCalc('0')}>0</button>{' '}
					{/* Обработчик клика для добавления цифры 0 */}
					<button onClick={() => updateCalc('.')}>.</button>{' '}
					{/* Обработчик клика для добавления десятичной точки */}
					<button onClick={calculate}>=</button>{' '}
					{/* Обработчик клика для выполнения вычислений */}
				</div>
			</div>
		</div>
	);
}

export default App;
