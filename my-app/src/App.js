import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setIsResult] = useState(false);

	// Функция для обновления состояния операндов
	const updateOperand = (value) => {
		// Проверяем, какие операнды обновлять. Если оператор есть то второй, если нет то первый
		if (!operator) {
			setOperand1(operand1 + value);
		} else {
			setOperand2(operand2 + value);
		}
	};

	// Функция для создания кнопок с цифрами
	const createDigits = () => {
		const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

		const numbersButtons = NUMS.map((number) => {
			return (
				<button
					onClick={() => {
						updateOperand(number);
						setIsResult(false);
					}}
					key={number}
				>
					{number}
				</button>
			);
		});

		return numbersButtons;
	};

	// Функция для выполнения вычислений
	const resultat = () => {
		let op1 = 0;
		const op2 = parseInt(operand2);

		if (operand1) {
			op1 = parseInt(operand1);
		}
		if (!operand2) {
			return;
		}

		// Вычисляем результат и обновляем до состояния результата
		if (operator === '-') {
			const resPlus = op1 - op2;
			setOperand1(resPlus.toString());
		}

		if (operator === '+') {
			const resMinus = op1 + op2;
			setOperand1(resMinus.toString());
		}
		setOperand2('');
		setOperator('');
	};

	// Функция для перевода калькуляторя в первоначальное состояние
	const clear = () => {
		// Обновляем состояние калькулятора до первоначального
		setOperand1('');
		setOperand2('');
		setOperator('');
	};

	return (
		<div className={styles.App}>
			<div className={styles.calculator}>
				<div className={`${styles.display} ${isResult ? styles.highlight : ''}`}>
					{/* Если есть результат выводим его, иначе - 0 */}
					{operand1 || '0'} {operator} {operand2}
				</div>
				{/* Блок кнопок операторов */}
				<div className={styles.operators}>
					{/* Кнопка плюс */}
					<button
						className={styles.operatorsButton}
						onClick={() => {
							if (!operator) {
								setOperator('+');
							}
							setIsResult(false);
						}}
					>
						+
					</button>
					{/* Кнопка минус */}
					<button
						className={styles.operatorsButton}
						onClick={() => {
							if (!operator) {
								setOperator('-');
							}
							setIsResult(false);
						}}
					>
						-
					</button>
				</div>
				{/* Блок кнопок в стиле цифровых  */}
				<div className={styles.digits}>
					{/* Создаем кнопки с цифрами */}
					{createDigits()}
					{/* Кнопка С */}
					<button
						className={styles.digitsButton}
						onClick={() => {
							setIsResult(false);
							clear();
						}}
					>
						C
					</button>
					{/* Кнопка = */}
					<button
						className={styles.digitsButton}
						onClick={() => {
							setIsResult(true);
							resultat();
						}}
					>
						=
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
