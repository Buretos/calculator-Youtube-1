import { useState } from 'react';
import styles from './App.module.css';

function App() {
	// Инициализация состояния калькулятора
	const [calc, setCalc] = useState('');
	// Инициализация состояния результата
	const [result, setResult] = useState('');

	// Операторы калькулятора
	const ops = ['+', '-', 'C', '='];

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
		const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

		const numbersButtons = NUMS.map((number) => {
			return (
				<button onClick={() => updateCalc(number.toString())} key={number}>
					{number}
				</button>
			);
		});

		return numbersButtons;
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
		<div className={styles.App}>
			<div className={styles.calculator}>
				<div className={styles.display}>
					{result ? <span>({result})</span> : ''}&nbsp;
					{calc || '0'} {/* Если есть результат выводим его, иначе - 0 */}
				</div>

				<div className={styles.operators}>
					<button
						className={styles.operatorsButton}
						onClick={() => updateCalc('+')}
					>
						+
					</button>{' '}
					{/* Обработчик клика для добавления оператора + */}
					<button
						className={styles.operatorsButton}
						onClick={() => updateCalc('-')}
					>
						-
					</button>{' '}
					{/* Обработчик клика для добавления оператора - */}
				</div>

				<div className={styles.digits}>
					{createDigits()} {/* Создаем кнопки с цифрами */}
					<button className={styles.digitsButton}>C</button>{' '}
					{/* Нужно поставить обработчик клика для сброса всех значений */}
					<button className={styles.digitsButton} onClick={calculate}>
						=
					</button>{' '}
					{/* Обработчик клика для выполнения вычислений */}
				</div>
			</div>
		</div>
	);
}

export default App;
