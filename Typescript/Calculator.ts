
type simbolType = "+" | "x" |  "-"|  "/"|  "*"|  "**"| "%"| "";

class CalculatorCl {
	prevNumber: number;
	prevDot: boolean;
	prevOperation: simbolType;
	currentNumber: number;
	previousResultElement: HTMLElement;
	currentResultElement: HTMLElement;
	constructor(
		previousResultElement: HTMLElement | null,
		currentResultElement: HTMLElement | null
	) {
		this.prevNumber = -0; /// this is a A params waiting for simbol + number  ( a + simbol + b )(23 / 1)
		this.currentNumber = -0; // B
		this.prevOperation = "";
		this.prevDot = false;
		this.previousResultElement =
			previousResultElement ?? document.createElement("span");
		this.currentResultElement =
			currentResultElement ?? document.createElement("span");
	}
	get_currentNumber(): string {
		var parts = this.currentNumber.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		const result = parts.join(",");
		return result;
	}
	get_prevResult(): number {
		return this.prevNumber;
	}
	get_prevOperation(): string {
		return this.prevOperation;
	}
	set_dot(bol: boolean = true): void {
		this.prevDot = bol;
		this.updateDisplay();
	}
	set_prevOperation(simbol: simbolType): void {
		this.prevOperation = simbol;
	}
	set_currentNumber(number: number): void {
		this.currentNumber = number;
	}
	set_prevNumber(number: number): void {
		this.prevNumber = number;
	}

	clear(): void {
		this.prevNumber = 0; /// this is a A params waiting for simbol + number  ( a + simbol + b )(23 / 1)
		this.currentNumber = 0; // B
		this.prevOperation = "";
		this.updateDisplay();
	}
	deleteAction(): void {
		const newNumber: number =
			this.currentNumber.toString().length > 1
				? parseInt(
						this.currentNumber
							.toString()
							.substr(0, this.currentNumber.toString().length - 1)
				  )
				: 0; /// delete a rightest number
		this.set_currentNumber(newNumber);
		this.updateDisplay();
	}
	numberAction(tipyingNumber: string): void {
		if (this.prevDot) tipyingNumber = "." + tipyingNumber;
		this.prevDot = false;
		let newNumber: any =
			this.currentNumber > 0
				? parseFloat(this.currentNumber.toString() + tipyingNumber)
				: parseInt(tipyingNumber); /// add new number at right

		if (tipyingNumber.toString() == ".0") newNumber = newNumber.toFixed(1);

		if (tipyingNumber === "0" && newNumber.toString().split(".").length > 1)
			newNumber = newNumber.toFixed(
				newNumber.toString().split(".")[1].toString().length + 1
			);

		this.set_currentNumber(newNumber);
		this.updateDisplay();
	}
	simbolAction(simbol: simbolType): void {
		if (this.prevNumber === -0) {
			this.prevOperation = simbol;
			this.prevNumber = this.currentNumber;
			this.updateDisplay();
			this.currentNumber = 0;
			return;
		}
		console.log("New Result and New Simbol");
		if (this.prevOperation !== "") {
			this.compute(simbol);
		}
	}
	compute(simbol: simbolType = "", equal:boolean =false): void {
		let compute: number;
		console.log(this.prevOperation, simbol);

		if (this.prevNumber === 0 || this.currentNumber == 0) return;
		switch (this.prevOperation.toString()) {
			case "+":
				compute = this.prevNumber + this.currentNumber;
				break;
			case "-":
				compute = this.prevNumber - this.currentNumber;
				break;
			case "/":
				compute = this.prevNumber / this.currentNumber;
				break;
			case "x":
				compute = this.prevNumber * this.currentNumber;
				break;
			case "%":
				compute = this.prevNumber % this.currentNumber;
				break;

			default:
				compute = this.prevNumber;
				break;
		}
		console.log(
			compute,
			this.prevNumber * this.currentNumber,
			this.prevNumber,
			this.currentNumber
		);
		this.prevNumber = compute;
		this.prevOperation = simbol;
		if(equal) {
			this.prevOperation = '';
			this.prevNumber = 0
			this.currentNumber = compute;
			this.previousResultElement.innerText = '0';
			this.currentResultElement.innerText = this.get_currentNumber();
			this.currentNumber = 0;
		}else{
			this.updateDisplay();
			this.currentNumber = 0;
		}
	}

	updateDisplay() {
		this.previousResultElement.innerText =
			this.prevNumber.toString() + " " + this.prevOperation ?? "";
		this.currentResultElement.innerText = !this.prevDot
			? this.get_currentNumber()
			: this.get_currentNumber() + ".";
	}
}

const newCalculator = (): CalculatorCl => {
	const previousResultElement: HTMLElement | null =
		document.querySelector("[data-input-prev]");
	const currentResultElement: HTMLElement | null = document.querySelector(
		"[data-input-current]"
	);
	const cal = new CalculatorCl(previousResultElement, currentResultElement);
	return cal;
};

async function main() {
	const calculator: CalculatorCl = newCalculator();
	// select all number AND SIMBOL and add action listener
	const number_pad: NodeListOf<HTMLElement> | null =
		await document.querySelectorAll(".number-pad");
	number_pad.forEach((e: HTMLElement) =>
		e.addEventListener("click", (e: any) => {
			if (
				isNaN(e.target.innerText) &&
				calculator.get_currentNumber() === "0"
			) {
				return;
			}
			if ( isNaN(e.target.innerText) &&  e.target.innerText === "." ) {
				console.log( calculator.get_currentNumber());
				calculator.set_dot();
				return;
			}
			if (isNaN(e.target.innerText) && e.target.innerText != ".") {
				calculator.simbolAction(e.target.innerText);
				return;
			}

			calculator.numberAction(e.target.innerText);
		})
	);
	// select reset and delete button and add action listener
	const delete_button: NodeListOf<HTMLElement> | null =
		await document.querySelectorAll(".number-pad-del");
	delete_button.forEach((e: HTMLElement) =>
		e.addEventListener("click", (e: any) => {
			if (e.target.innerText == "RESET") calculator.clear();
			else calculator.deleteAction();
		})
	);
	// select equal
	const equal_button: NodeListOf<HTMLElement> | null =
		await document.querySelectorAll(".number-pad-equal");
	equal_button.forEach((e: HTMLElement) =>
		e.addEventListener("click", (e: any) => {
			calculator.compute("", true);
		})
	);
}

main();


