var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CalculatorCl = /** @class */ (function () {
    function CalculatorCl(previousResultElement, currentResultElement) {
        this.prevNumber = -0; /// this is a A params waiting for simbol + number  ( a + simbol + b )(23 / 1)
        this.currentNumber = -0; // B
        this.prevOperation = "";
        this.prevDot = false;
        this.previousResultElement = previousResultElement !== null && previousResultElement !== void 0 ? previousResultElement : document.createElement("span");
        this.currentResultElement = currentResultElement !== null && currentResultElement !== void 0 ? currentResultElement : document.createElement("span");
    }
    CalculatorCl.prototype.get_currentNumber = function () {
        var parts = this.currentNumber.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var result = parts.join(",");
        return result;
    };
    CalculatorCl.prototype.get_prevResult = function () {
        return this.prevNumber;
    };
    CalculatorCl.prototype.get_prevOperation = function () {
        return this.prevOperation;
    };
    CalculatorCl.prototype.set_dot = function (bol) {
        if (bol === void 0) { bol = true; }
        this.prevDot = bol;
        this.updateDisplay();
    };
    CalculatorCl.prototype.set_prevOperation = function (simbol) {
        this.prevOperation = simbol;
    };
    CalculatorCl.prototype.set_currentNumber = function (number) {
        this.currentNumber = number;
    };
    CalculatorCl.prototype.set_prevNumber = function (number) {
        this.prevNumber = number;
    };
    CalculatorCl.prototype.clear = function () {
        this.prevNumber = 0; /// this is a A params waiting for simbol + number  ( a + simbol + b )(23 / 1)
        this.currentNumber = 0; // B
        this.prevOperation = "";
        this.updateDisplay();
    };
    CalculatorCl.prototype.deleteAction = function () {
        var newNumber = this.currentNumber.toString().length > 1
            ? parseInt(this.currentNumber
                .toString()
                .substr(0, this.currentNumber.toString().length - 1))
            : 0; /// delete a rightest number
        this.set_currentNumber(newNumber);
        this.updateDisplay();
    };
    CalculatorCl.prototype.numberAction = function (tipyingNumber) {
        if (this.prevDot)
            tipyingNumber = "." + tipyingNumber;
        this.prevDot = false;
        var newNumber = this.currentNumber > 0
            ? parseFloat(this.currentNumber.toString() + tipyingNumber)
            : parseInt(tipyingNumber); /// add new number at right
        if (tipyingNumber.toString() == ".0")
            newNumber = newNumber.toFixed(1);
        if (tipyingNumber === "0" && newNumber.toString().split(".").length > 1)
            newNumber = newNumber.toFixed(newNumber.toString().split(".")[1].toString().length + 1);
        this.set_currentNumber(newNumber);
        this.updateDisplay();
    };
    CalculatorCl.prototype.simbolAction = function (simbol) {
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
    };
    CalculatorCl.prototype.compute = function (simbol, equal) {
        if (simbol === void 0) { simbol = ""; }
        if (equal === void 0) { equal = false; }
        var compute;
        console.log(this.prevOperation, simbol);
        if (this.prevNumber === 0 || this.currentNumber == 0)
            return;
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
        console.log(compute, this.prevNumber * this.currentNumber, this.prevNumber, this.currentNumber);
        this.prevNumber = compute;
        this.prevOperation = simbol;
        if (equal) {
            this.prevOperation = '';
            this.prevNumber = 0;
            this.currentNumber = compute;
            this.previousResultElement.innerText = '0';
            this.currentResultElement.innerText = this.get_currentNumber();
            this.currentNumber = 0;
        }
        else {
            this.updateDisplay();
            this.currentNumber = 0;
        }
    };
    CalculatorCl.prototype.updateDisplay = function () {
        var _a;
        this.previousResultElement.innerText = (_a = this.prevNumber.toString() + " " + this.prevOperation) !== null && _a !== void 0 ? _a : "";
        this.currentResultElement.innerText = !this.prevDot
            ? this.get_currentNumber()
            : this.get_currentNumber() + ".";
    };
    return CalculatorCl;
}());
var newCalculator = function () {
    var previousResultElement = document.querySelector("[data-input-prev]");
    var currentResultElement = document.querySelector("[data-input-current]");
    var cal = new CalculatorCl(previousResultElement, currentResultElement);
    return cal;
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var calculator, number_pad, delete_button, equal_button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    calculator = newCalculator();
                    return [4 /*yield*/, document.querySelectorAll(".number-pad")];
                case 1:
                    number_pad = _a.sent();
                    number_pad.forEach(function (e) {
                        return e.addEventListener("click", function (e) {
                            if (isNaN(e.target.innerText) &&
                                calculator.get_currentNumber() === "0") {
                                return;
                            }
                            if (isNaN(e.target.innerText) && e.target.innerText === ".") {
                                console.log(calculator.get_currentNumber());
                                calculator.set_dot();
                                return;
                            }
                            if (isNaN(e.target.innerText) && e.target.innerText != ".") {
                                calculator.simbolAction(e.target.innerText);
                                return;
                            }
                            calculator.numberAction(e.target.innerText);
                        });
                    });
                    return [4 /*yield*/, document.querySelectorAll(".number-pad-del")];
                case 2:
                    delete_button = _a.sent();
                    delete_button.forEach(function (e) {
                        return e.addEventListener("click", function (e) {
                            if (e.target.innerText == "RESET")
                                calculator.clear();
                            else
                                calculator.deleteAction();
                        });
                    });
                    return [4 /*yield*/, document.querySelectorAll(".number-pad-equal")];
                case 3:
                    equal_button = _a.sent();
                    equal_button.forEach(function (e) {
                        return e.addEventListener("click", function (e) {
                            calculator.compute("", true);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
