const e = require("express");

class GeometryMath {
    constructor(data) {
        this.data = data;
        this.operations = ["quad-perimeter", "quad-area", "circ-circum-radius", "circ-area", "degree-sin", "degree-cos", "degree-tan"];
    }

    calc() {
        let result;        
        switch (this.data.operation) {
            // Perimeter of a Quadrilateral
            case this.operations[0]:
                if (this.data.values.length < 2) {
                    return "Not enough values";
                } else if (this.data.values.length > 2) {
                    return "Too many values";
                } else {
                    result = this.findQuadPerimeter();
                }
                break;
            // Area of a Quadrilateral
            case this.operations[1]:
                if (this.data.values.length < 2) {
                    return "Not enough values";
                } else if (this.data.values.length > 2) {
                    return "Too many values";
                } else {
                    result = this.findQuadArea();
                }
                break;
            // Circumference of a Circle Radius
            case this.operations[2]:
                if (this.data.values.length > 1) {
                    return "Too many values";
                } else {
                    result = this.findCircCircumR();
                }
                break;
            case this.operations[3]:
                if (this.data.values.length > 1) {
                    return "Too many values";
                } else {
                    result = this.findCircArea();
                }
                break;
            // Degree Sin
            case this.operations[4]:
                if (this.data.values.length > 1) {
                    return "Too many values";
                } else {
                    result = this.findSinDeg();
                }
                break;
            // Degree Cos
            case this.operations[5]:
                if (this.data.values.length > 1) {
                    return "Too many values";
                } else {
                    result = this.findCosDeg();
                }
                break;
            // Degree Tan
            case this.operations[6]:
                if (this.data.values.length > 1) {
                    return "Too many values";
                } else {
                    result = this.findTanDeg();
                }
                break;
            default:
                result = "System Error";
                break;
        }
        return result;
    }

    findQuadPerimeter() {
        let l;
        let w;
        for (let i = 0; i < this.data.values.length; i++) {
            if (i === 0){
                l = this.data.values[i];
            } else {
                w = this.data.values[i];
            }
        }
        return (2 * l) + (2 * w);
    }

    findQuadArea() {
        let l;
        let w;
        for (let i = 0; i < this.data.values.length; i++) {
            if (i === 0){
                l = this.data.values[i];
            } else {
                w = this.data.values[i];
            }
        }
        
        return (l * w);
    }

    findCircCircumR() {
        let r;
        if (this.data.values[0]) {
            r = this.data.values[0];
            return 2 * (Math.PI * r);
        } else {
            return "Not enough values";
        }
    }

    findCircArea() {
        let r;
        if (this.data.values[0]) {
            r = this.data.values[0];
            return Math.PI * (r * r);
        } else {
            return "Not enough values";
        }
    }

    findSinDeg() {
        let val;
        if (this.data.values[0]) { 
            val = this.data.values[0];
            return Math.sin(val * Math.PI/180);
        }
        else {
            return "Not enough values";
        }
    }
    
    findCosDeg() {
        let val;
        if (this.data.values[0]) { 
            val = this.data.values[0];
            return Math.cos(val * Math.PI/180);
        } else {
            return "Not enough values";
        }
    }

    findTanDeg() {
        let val;
        if (this.data.values[0]) { 
            val = this.data.values[0];
            return Math.tan(val * Math.PI/180);
        } else {
            return "Not enough values";
        }
    }
}

class AlgebraOneMath {
    constructor({...data}) {
        this.data = data;
        this.listSteps = [];
        this.stepsToAnswer = "";
        this.variables = ["x", "y", "z", "=", "<", ">", "≤", "≥"];
    }

    calc() {
        const all = [];
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) { 
                if (this.data[key] !== " ") {
                    all.push(this.data[key]);
                }
            }
        }
        
        const answer = this.solveEquation(all);
        
        if (typeof answer === "undefined") {
            return {errorResponse: "Error: Input Format not Valid."}
        }
        else if (typeof answer.type === "undefined") {
            this.listSteps.push(`= ${answer}`);
            return {answer: `${Math.round(answer * 1000) / 1000}`, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps, type: "linear-equation"};
        } else {
            let result;
            switch(answer.type) {
                case "polynomial":
                    this.listSteps.push(`${this.replaceAll(answer.answer.toString())}`)
                    result = {answer: answer.answer, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps};
                    break;
                case "inequality":
                    this.listSteps.push(`${answer.ine} ${answer.answer}`);
                    result = {answer: "x" + answer.ine + Math.round(answer.answer * 1000) / 1000, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps, type: "inequatlity"}
                    break;
            }
            return result
        }

    }

    solveEquation(all) {
        this.listSteps.push(this.replaceAll(all.toString()));

        if (all.includes("=")) {
            // Linear Equations
            const equation = this.getEquation(all);
            if (all.includes("(")) {
                this.stepsToAnswer = "Distributive Property";
                if (equation[0] === "-") {
                    if (equation[equation.indexOf("(") + 1] === "+") {
                        // -(x + Number) = -Number problems
                        if (equation[equation.length - 2] === "-") {
                            this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                            return -this.getAddition(equation[equation.indexOf("+") + 1], -equation[equation.length - 1]);
                        }
                        // -Number(x + Number) = Number problems
                        else if (equation[equation.indexOf("(") - 1] !== "-") {
                            this.listSteps.push(`${equation[0]}${equation[1]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${equation[1]}${all[all.indexOf("(") + 1]}`)
                            return this.getDivision(-equation[equation.indexOf("(") - 1], this.getAddition(this.getMultiplication(equation[equation.indexOf(")") - 1], equation[equation.indexOf("(") - 1]), equation[equation.length - 1]))
                        }
                        // -(x + Number) = Number problems
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        return -this.getAddition(equation[equation.indexOf("+") + 1], equation[equation.length - 1])
                    }
                    else if (equation[equation.indexOf("(") + 1] === "-") {
                        // -(x - Number) = -Number problems
                        if (equation[equation.length - 2] === "-" && equation[1] === "(") {
                            this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                            return this.getSubtraction(equation[3], equation[equation.length - 1])
                        } 
                        // -Number(x - Number) = Number problems
                        else if (all[all.indexOf("(") + 1] === "x") {
                            this.listSteps.push(`${equation[0]}${equation[1]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${equation[1]}${all[all.indexOf("(") + 1]}`)
                            return this.getDivision(-equation[1], this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.lastIndexOf("-") + 1]), equation[equation.length - 1]));
                        }
                        // -Number(-Numberx + Number) = -Number
                        else if (equation[equation.indexOf("(") + 1] === "-" && equation[equation.length - 2] === "-" && equation[equation.indexOf(")") - 2] === "+") {
                            return this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), -equation[equation.length - 1]))
                        }
                        // -Number(-Numberx - Number) = -Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-" && equation[equation.length - 2] === "-") {
                            return this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.indexOf(")") - 1]), -equation[equation.length - 1]))
                        }
                        // -Number(-Numberx - Number) = Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-" && all[all.indexOf("x") + 1] === "-") {
                            return this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.indexOf(")") - 1]), equation[equation.length - 1]))
                        }
                        // -Number(-Numberx + Number) = Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-") {
                            return this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getAddition(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), equation[equation.length - 1]))
                        }
                        // -(x - Number) = Number problems
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        return -this.getSubtraction(equation[equation.lastIndexOf("-") + 1], equation[equation.length - 1]);
                    } 
                    // -(Numberx - Number) = Number problems
                    else if (equation[3] === "-") {
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        return this.getDivision(-equation[2], this.getSubtraction(equation[4], equation[equation.length - 1]))
                    }
                    // -Number(Numberx + Number) = Number
                    else if (equation[equation.indexOf("(") - 1] !== "-") {
                        return this.getDivision(this.getMultiplication(-equation[1], equation[equation.indexOf("(") + 1]), this.getAddition(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), equation[equation.length - 1]))
                    }
                    // -(Numberx + Number) = Number problems
                    this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                    return this.getDivision(-equation[2], this.getSubtraction(-equation[equation.indexOf("+") + 1], equation[equation.length - 1]))
                }
                else {
                    // Number(Numberx + Number) = Number problems
                    if (!this.variables.includes(all[all.indexOf("(") + 1])) {
                        return this.getDivision(this.getMultiplication(equation[0], equation[equation.indexOf("(") + 1]), this.getSubtraction(this.getMultiplication(equation[0], equation[equation.indexOf("+") + 1]), equation[equation.length - 1]))
                    }
                    // Number(x - Number) = Number
                    else if (equation[2] === "-") {
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        return this.getDivision(equation[0], this.getAddition(this.getMultiplication(equation[0], equation[equation.indexOf("-") + 1]), equation[equation.length - 1]));
                    }
                    // Number(x + Number) = Number
                    this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                    return this.getDivision(equation[0], this.getSubtraction(this.getMultiplication(equation[0], equation[equation.indexOf("+") + 1]), equation[equation.length - 1]));
                }
            }
            if (all.includes("x")) {
                // Numberx = Number problems
                if (equation.length === 2) {
                    this.stepsToAnswer = "Division Property";
                    return this.getDivision(equation[0], equation[equation.length - 1]);
                }
                else if (equation.length === 3) {
                    if (equation[0] === "+") {
                        this.stepsToAnswer = "Subtraction Property";
                        return this.getSubtraction(equation[1], equation[equation.length - 1]);
                    }
                    else if (equation[0] === "-" && all[0] === "x") {
                        this.stepsToAnswer = "Addition Property";
                        return this.getAddition(equation[1], equation[equation.length - 1]);
                    }
                    else if (equation[0] === "-" && all[0] !== "x") {
                        this.stepsToAnswer = "Division Property";
                        return this.getDivision(-equation[1], equation[equation.length - 1]);
                    }
                }
                else if (equation[0] === "-") {
                    this.stepsToAnswer = "Isolating the Variable";
                    // -Numberx = Number problems
                    if (equation.length < 4 && equation[equation.length - 2] !== "-") {
                        return this.getDivision(-equation[1], equation[equation.length - 1]);
                    } 
                    // -Numberx + Number = Number problems
                    else if (equation.length < 6 && equation.includes("+") && equation[equation.length - 2] !== "-") {
                        return this.getDivision(-equation[1], this.getSubtraction(equation[equation.indexOf("+") + 1], equation[equation.length - 1]))
                    }
                    // -Numberx - Number = Number problems
                    else if (equation.length < 6 && equation[2] === "-" && equation[equation.length - 2] !== "-") {
                        return this.getDivision(-equation[1], this.getAddition(equation[3], equation[equation.length - 1]));
                    }
                    // -Numberx + Number = -Number problems
                    else if (equation.length < 7 && equation[equation.length - 2] === "-" && equation.includes("+")) {
                        return this.getDivision(-equation[1], this.getSubtraction(equation[equation.indexOf("+") + 1], -equation[equation.length - 1]))
                    }
                    // -Numberx = -Number problems
                    else if (equation.length < 5 && equation[equation.length - 2] === "-") {
                        return this.getDivision(-equation[1], -equation[equation.length - 1]);
                    } 
                    // -Numberx - Number = -Number problems
                    else if (equation.length < 7 && equation[2] === "-" && equation[equation.length - 2] === "-") {
                        return this.getDivision(-equation[1], this.getAddition(equation[3], -equation[equation.length - 1]))
                    }
                }
                else if (equation[equation.length - 2] === "-" ) {
                    this.stepsToAnswer = "Isolating the Variable";
                    // Numberx = -Number problems
                    if (equation.length === 3) {
                        return this.getDivision(equation[0], -equation[equation.length - 1]);
                    }
                    // Numberx + Number = -Number problems
                    else if (equation.length < 6 && equation.includes("+")) {
                        return this.getDivision(equation[0], this.getSubtraction(equation[equation.indexOf("+") + 1], -equation[equation.length - 1]))
                    }
                    // Numberx - Number = -Number problems"
                    else if (equation.length < 6 && equation.includes("-")) {
                        return this.getDivision(equation[0], -this.getSubtraction(equation[equation.indexOf("-") + 1], equation[equation.length - 1]))
                    }
                }
                // Numberx + Number = Number problems
                else if (equation.length > 3 && equation.includes("+")) {
                    this.stepsToAnswer = "Isolating the Variable";
                    return this.getDivision(equation[0], this.getSubtraction(equation[equation.indexOf("+") + 1], equation[equation.length - 1]));
                } 
                // Numberx - Number = Number problems
                else if (equation.length > 3 && equation.includes("-")) {
                    this.stepsToAnswer = "Isolating the Variable";
                    return this.getDivision(equation[0], this.getAddition(equation[equation.indexOf("-") + 1], equation[equation.length - 1]));
                }
            }
        } else if (all.includes("<") || all.includes(">") || all.includes("≤") || all.includes("≥")) {
            const equation = this.getEquation(all);
            if (all.includes("(")) {
                this.stepsToAnswer = "Distributive Property Inequality";
                if (equation[0] === "-") {
                    if (equation[equation.indexOf("(") + 1] === "+") {
                        // -(x + Number) <≤≥> -Number problems
                        if (equation[equation.length - 2] === "-" && equation[0] === "-") {
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    if (value === ">") {
                                        ine = "<";
                                    }
                                    switch (value) {
                                        case ">":
                                            ine = "<";
                                            break;
                                        case "<":
                                            ine = ">";
                                            break;
                                        case "≤":
                                            ine = "≥";
                                            break;
                                        case "≥":
                                            ine = "≤";
                                            break;
                                        default: 
                                            return {errorResponse: "No Inequality Written"}
                                    }
                                }
                            })
                            this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                            return {answer: -this.getAddition(equation[equation.indexOf("+") + 1], -equation[equation.length - 1]), type: "inequality", ine: ine};
                        }
                        // -Number(x + Number) <≤≥> Number problems
                        else if (equation[equation.indexOf("(") - 1] !== "-") {
                            this.listSteps.push(`${equation[0]}${equation[1]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${equation[1]}${all[all.indexOf("(") + 1]}`)
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    if (value === ">") {
                                        ine = "<";
                                    }
                                    switch (value) {
                                        case ">":
                                            ine = "<";
                                            break;
                                        case "<":
                                            ine = ">";
                                            break;
                                        case "≤":
                                            ine = "≥";
                                            break;
                                        case "≥":
                                            ine = "≤";
                                            break;
                                        default: 
                                            return {errorResponse: "No Inequality Written"}
                                    }
                                }
                            })
                            return {answer: this.getDivision(-equation[equation.indexOf("(") - 1], this.getAddition(this.getMultiplication(equation[equation.indexOf(")") - 1], equation[equation.indexOf("(") - 1]), equation[equation.length - 1])), type: "inequality", ine: ine}
                        }
                        // -(x + Number) <≤≥> Number problems
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: -this.getAddition(equation[equation.indexOf("+") + 1], equation[equation.length - 1]), type: "inequality", ine: ine}
                    }
                    else if (equation[equation.indexOf("(") + 1] === "-") {
                        console.log(equation)
                        // -(x - Number) <≤≥> -Number problems
                        if (equation[equation.length - 2] === "-" && equation[1] === "(") {
                            this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    if (value === ">") {
                                        ine = "<";
                                    }
                                    switch (value) {
                                        case ">":
                                            ine = "<";
                                            break;
                                        case "<":
                                            ine = ">";
                                            break;
                                        case "≤":
                                            ine = "≥";
                                            break;
                                        case "≥":
                                            ine = "≤";
                                            break;
                                        default: 
                                            return {errorResponse: "No Inequality Written"}
                                    }
                                }
                            })
                            return {answer: this.getSubtraction(equation[3], equation[equation.length - 1]), type: "inequality", ine: ine}
                        } 
                        // -Number(-Numberx + Number) <≤≥> -Number
                        else if (equation[equation.indexOf("(") + 1] === "-" && equation[equation.length - 2] === "-" && equation[equation.indexOf(")") - 2] === "+") {
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    ine = "<";
                                }
                            })
                            return {answer: this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), -equation[equation.length - 1])), type: "inequality", ine: ine}
                        }
                        // -Number(-Numberx - Number) <≤≥> -Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-" && equation[equation.length - 2] === "-") {
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    ine = "<";
                                }
                            })
                            return {answer: this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.indexOf(")") - 1]), -equation[equation.length - 1])), type: "inequality", ine: ine}
                        }
                        // -Number(-Numberx - Number) <≤≥> Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-" && all[all.indexOf("x") + 1] === "-") {
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    ine = "<";
                                }
                            })
                            return {answer: this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.indexOf(")") - 1]), equation[equation.length - 1])), type: "inequality", ine: ine}
                        }
                        // -Number(-Numberx + Number) <≤≥> Number problems
                        else if (equation[equation.indexOf("(") + 1] === "-") {
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    ine = "<";
                                }
                            })
                            return {answer: this.getDivision(this.getMultiplication(-equation[1], -equation[equation.indexOf("(") + 2]), this.getAddition(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), equation[equation.length - 1])), type: "inequality", ine: ine}
                        }
                        // -Number(x - Number) <≤≥> Number problems
                        else if (all[all.indexOf("(") + 1] === "x") {
                            this.listSteps.push(`${equation[0]}${equation[1]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${equation[1]}${all[all.indexOf("(") + 1]}`)
                            let ine;
                            all.map((value) => {
                                if (["<", ">", "≤", "≥"].includes(value)) {
                                    if (value === ">") {
                                        ine = "<";
                                    }
                                    switch (value) {
                                        case ">":
                                            ine = "<";
                                            break;
                                        case "<":
                                            ine = ">";
                                            break;
                                        case "≤":
                                            ine = "≥";
                                            break;
                                        case "≥":
                                            ine = "≤";
                                            break;
                                        default: 
                                            return {errorResponse: "No Inequality Written"}
                                    }
                                }
                            })
                            return {answer: this.getDivision(-equation[1], this.getSubtraction(this.getMultiplication(-equation[1], -equation[equation.lastIndexOf("-") + 1]), equation[equation.length - 1])), type: "inequality", ine: ine};
                        }
                        // -(x - Number) <≤≥> Number problems
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: -this.getSubtraction(equation[equation.lastIndexOf("-") + 1], equation[equation.length - 1]), type: "inequality", ine: ine};
                    } 
                    // -(Numberx - Number) <≤≥> Number problems
                    else if (equation[3] === "-") {
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[2], this.getSubtraction(equation[4], equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // -Number(Numberx + Number) <≤≥> Number
                    else if (equation[equation.indexOf("(") - 1] !== "-") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(this.getMultiplication(-equation[1], equation[equation.indexOf("(") + 1]), this.getAddition(this.getMultiplication(-equation[1], equation[equation.indexOf(")") - 1]), equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // -(Numberx + Number) <≤≥> Number problems
                    this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                    let ine;
                    all.map((value) => {
                        if (["<", ">", "≤", "≥"].includes(value)) {
                            if (value === ">") {
                                ine = "<";
                            }
                            switch (value) {
                                case ">":
                                    ine = "<";
                                    break;
                                case "<":
                                    ine = ">";
                                    break;
                                case "≤":
                                    ine = "≥";
                                    break;
                                case "≥":
                                    ine = "≤";
                                    break;
                                default: 
                                    return {errorResponse: "No Inequality Written"}
                            }
                        }
                    })
                    return {answer: this.getDivision(-equation[2], this.getSubtraction(-equation[equation.indexOf("+") + 1], equation[equation.length - 1])), type: "inequality", ine: ine}
                }
                else {
                    // Number(Numberx + Number) <≤≥> Number problems
                    if (!this.variables.includes(all[all.indexOf("(") + 1])) {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        return {answer: this.getDivision(this.getMultiplication(equation[0], equation[equation.indexOf("(") + 1]), this.getSubtraction(this.getMultiplication(equation[0], equation[equation.indexOf("+") + 1]), equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // Number(x - Number) <≤≥> Number
                    else if (equation[2] === "-") {
                        this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        return {answer: this.getDivision(equation[0], this.getAddition(this.getMultiplication(equation[0], equation[equation.indexOf("-") + 1]), equation[equation.length - 1])), type: "inequality", ine: ine};
                    }
                    // Number(x + Number) <≤≥> Number
                    this.listSteps.push(`${equation[0]} * ${all[all.indexOf("(") + 1]} = ${equation[0]}${all[all.indexOf("(") + 1]}`)
                    let ine;
                    all.map((value) => {
                        if (["<", ">", "≤", "≥"].includes(value)) {
                            ine = value;
                        }
                    })
                    return {answer: this.getDivision(equation[0], this.getSubtraction(this.getMultiplication(equation[0], equation[equation.indexOf("+") + 1]), equation[equation.length - 1])), type: "inequality", ine: ine};
                }
            }
            if (all.includes("x")) {
                // Numberx <≤≥> Number
                if (equation.length === 2) {
                    let ine;
                    all.map((value) => {
                        if (["<", ">", "≤", "≥"].includes(value)) {
                            ine = value;
                        }
                    })
                    this.stepsToAnswer = "Division Property Inequality";
                    return {answer: this.getDivision(equation[0], equation[equation.length - 1]), type: "inequality", ine: ine};
                }
                else if (equation.length === 3 && equation[equation.length - 2] !== "-") {
                    if (equation[0] === "+") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        this.stepsToAnswer = "Subtraction Property Inequality";
                        return {answer: this.getSubtraction(equation[1], equation[equation.length - 1]), type: "inequality", ine: ine};
                    }
                    else if (equation[0] === "-" && all[0] === "x") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        this.stepsToAnswer = "Addition Property Inequality";
                        return {answer: this.getAddition(equation[1], equation[equation.length - 1]), type: "inequality", ine: ine};
                    }
                    else if (equation[0] === "-" && all[0] !== "x") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        this.stepsToAnswer = "Division Property Inequality";
                        return {answer: this.getDivision(-equation[1], equation[equation.length - 1]), type: "inequality", ine: ine};
                    }
                }
                else if (equation[0] === "-") {
                    this.stepsToAnswer = "Isolating the Variable Inequality";
                    // -Numberx + Number <≤≥> Number problems
                    if (equation.length < 6 && equation.includes("+") && equation[equation.length - 2] !== "-") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[1], this.getSubtraction(equation[equation.indexOf("+") + 1], equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // -Numberx - Number <≤≥> Number problems
                    else if (equation.length < 6 && equation[2] === "-" && equation[equation.length - 2] !== "-") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[1], this.getAddition(equation[3], equation[equation.length - 1])), type: "inequality", ine: ine};
                    }
                    // -Numberx + Number <≤≥> -Number problems
                    else if (equation.length < 7 && equation[equation.length - 2] === "-" && equation.includes("+")) {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[1], this.getSubtraction(equation[equation.indexOf("+") + 1], -equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // -Numberx <≤≥> -Number problems
                    else if (equation.length < 5 && equation[equation.length - 2] === "-") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[1], -equation[equation.length - 1]), type: "inequality", ine: ine};
                    } 
                    // -Numberx - Number <≤≥> -Number problems
                    else if (equation.length < 7 && equation[2] === "-" && equation[equation.length - 2] === "-") {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                if (value === ">") {
                                    ine = "<";
                                }
                                switch (value) {
                                    case ">":
                                        ine = "<";
                                        break;
                                    case "<":
                                        ine = ">";
                                        break;
                                    case "≤":
                                        ine = "≥";
                                        break;
                                    case "≥":
                                        ine = "≤";
                                        break;
                                    default: 
                                        return {errorResponse: "No Inequality Written"}
                                }
                            }
                        })
                        return {answer: this.getDivision(-equation[1], this.getAddition(equation[3], -equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                }
                else if (equation[equation.length - 2] === "-") {
                    this.stepsToAnswer = "Isolating the Variable Inequality";
                    // Numberx <≤≥> -Number problems
                    if (equation.length === 3) {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        return {answer: this.getDivision(equation[0], -equation[equation.length - 1]), type: "inequality", ine: ine};
                    }
                    // Numberx + Number <≤≥> -Number problems
                    else if (equation.length < 6 && equation.includes("+")) {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        return {answer: this.getDivision(equation[0], this.getSubtraction(equation[equation.indexOf("+") + 1], -equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                    // Numberx - Number <≤≥> -Number problems
                    else if (equation.length < 6 && equation.includes("-")) {
                        let ine;
                        all.map((value) => {
                            if (["<", ">", "≤", "≥"].includes(value)) {
                                ine = value;
                            }
                        })
                        return {answer: this.getDivision(equation[0], -this.getSubtraction(equation[equation.indexOf("-") + 1], equation[equation.length - 1])), type: "inequality", ine: ine}
                    }
                }
                // Numberx + Number <≤≥> Number problems
                else if (equation.length > 3 && equation.includes("+")) {
                    this.stepsToAnswer = "Isolating the Variable Inequality";
                    let ine;
                    all.map((value) => {
                        if (["<", ">", "≤", "≥"].includes(value)) {
                            ine = value;
                        }
                    })
                    return {answer: this.getDivision(equation[0], this.getSubtraction(equation[equation.indexOf("+") + 1], equation[equation.length - 1])), type: "inequality", ine: ine};
                } 
                // Numberx - Number <≤≥> Number problems
                else if (equation.length > 3 && equation.includes("-")) {
                    this.stepsToAnswer = "Isolating the Variable Inequality";
                    let ine;
                    all.map((value) => {
                        if (["<", ">", "≤", "≥"].includes(value)) {
                            ine = value;
                        }
                    })
                    return {answer: this.getDivision(equation[0], this.getAddition(equation[equation.indexOf("-") + 1], equation[equation.length - 1])), type: "inequality", ine: ine};
                }
            }
        } else {
            this.stepsToAnswer = "Polynomial Addition and Subtraction";

            // Polynomials
            const polynomial = this.getPolynomial(all);
            const numericLikeTerms = [];
            const variableTerms = [];
            
            let numericalResult;
            let varResult = [];
            let answer = [];
            let commonExt = [];

            for (let i = 0; i < polynomial.length; i++) {
                if (["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].includes(polynomial[i].substring(polynomial[i].length - 1, polynomial[i].length))) {
                    if (polynomial[i - 1] === "-") {
                        variableTerms.push("-" + polynomial[i]);
                    } else {
                        variableTerms.push(polynomial[i]);
                    }
                }
            }
            for (const value of polynomial) {
                if (!["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].includes(value.substring(value.length - 1, value.length))) {
                    numericLikeTerms.push(value);
                }
            }
            if (numericLikeTerms.length > 0) {
                let result = 0;
                for (let i = 0; i < numericLikeTerms.length; i++) {
                    if (numericLikeTerms[i] !== "+" && numericLikeTerms[i] !== "-") {
                        if (polynomial.indexOf(numericLikeTerms[i]) - 1 === -1) {
                            result += this.convertValues(numericLikeTerms[i]);
                        } else if (polynomial[polynomial.indexOf(numericLikeTerms[i]) - 1] === "+") {
                            result += this.convertValues(numericLikeTerms[i]);
                        } else if (polynomial[polynomial.indexOf(numericLikeTerms[i]) - 1] === "-") {
                            result -= this.convertValues(numericLikeTerms[i]);
                        }
                    } 
                }
                numericalResult = result;
            }
            let variableMemory = [];
            for (const index in variableTerms) {
                if (variableMemory.length <= 0) {
                    variableMemory.push(variableTerms[index]);
                } else {
                    for (const miniIndex in variableMemory) {
                        if (variableMemory[miniIndex].substring(variableMemory[miniIndex].length - 1, variableMemory[miniIndex].length) === variableTerms[index].substring(variableTerms[index].length - 1, variableTerms[index].length)) {
                            commonExt.push(variableTerms[index].substring(variableTerms[index].length - 1, variableTerms[index].length))
                            if (!varResult.length <= 0) {
                                for (const value of varResult) {
                                    if (variableTerms[index].substring(variableTerms[index].length - 1, variableTerms[index].length) === value.substring(value.length - 1, value.length)) {
                                        varResult[varResult.indexOf(value)] = (this.convertValues(value.toString()) + this.convertValues(variableTerms[index].toString())) + value.substring(value.length - 1, value.length); 
                                        break;
                                    } else {
                                        varResult.push(this.convertValues(this.replaceAll(variableTerms[index].toString())) + this.convertValues(this.replaceAll(variableMemory[miniIndex].toString())) + "" + variableTerms[index].substring(variableTerms[index].length - 1, variableTerms[index].length));
                                        break;
                                    }
                                }
                            } else {
                                varResult.push(this.convertValues(this.replaceAll(variableTerms[index].toString())) + this.convertValues(this.replaceAll(variableMemory[miniIndex].toString())) + "" + variableTerms[index].substring(variableTerms[index].length - 1, variableTerms[index].length));
                            }
                            break;
                        } else {
                            variableMemory.push(variableTerms[index]);
                        }
                    }
                }
            }
            for (const value of variableTerms) {
                let extUsed = false;
                for (const ext of commonExt) {
                    if (value.substring(value.length - 1, value.length) === ext) {
                        extUsed = true;
                        break;
                    }
                }
                if (!extUsed) {
                    varResult.push(value)
                }
            }
            
            answer = varResult.map((value) => {
                return value;
            })
            if (typeof numericalResult !== "undefined" && numericalResult !== 0) {
                answer.push(numericalResult);
            }

            return {answer: answer.map(value => { return value + " " }), type: "polynomial"};
        }
    }

    getEquation(all) {
        let equationArray = [];
        let temp = [];
        for(let i = 0; i < all.length; i++) {
            if (this.variables.includes(all[i])) {
                if (!temp.length < 1) {
                    equationArray.push(this.replaceAll(temp.toString()));
                    temp = [];
                }
            } else {
                switch(all[i]) {
                    case "+":
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("+");
                        break;
                    case "-":
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("-");
                        break;
                    case "(":
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("(");
                        break;
                    case ")":
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push(")");
                        break;
                    default:
                        temp.push(all[i]);
                        break;
                }
            }
        }

        if (!temp.length < 1) {
            equationArray.push(this.replaceAll(temp.toString()));
        }

        return equationArray;
    }

    getPolynomial(all) {
        let polynomial = [];
        let temp = [];

        for (const key in all) {
            switch(all[key]) {
                case "+":
                    if (!temp.length < 1) {
                        polynomial.push(this.replaceAll(temp.toString()));
                        temp = [];
                    }
                    polynomial.push("+");
                    break;
                case "-":
                    if (!temp.length < 1) {
                        polynomial.push(this.replaceAll(temp.toString()));
                        temp = [];
                    }
                    polynomial.push("-");
                    break;
                case "(":
                    if (!temp.length < 1) {
                        polynomial.push(this.replaceAll(temp.toString()));
                        temp = [];
                    }
                    polynomial.push("(");
                    break;
                case ")":
                    if (!temp.length < 1) {
                        polynomial.push(this.replaceAll(temp.toString()));
                        temp = [];
                    }
                    polynomial.push(")");
                    break;
                default:
                    temp.push(all[key]);
                    break;
            }
        }

        if (!temp.length < 1) {
            polynomial.push(this.replaceAll(temp.toString()));
        }

        return polynomial;
    }

    // Basic Operations
    getDivision(value1, value2) {
        this.listSteps.push(`${value2} / ${value1} = ${value2 / value1}`);
        return value2 / value1;
    }
    
    getSubtraction(value1, value2) {
        this.listSteps.push(`${value2} - ${value1} = ${value2 - value1}`);
        return value2 - value1;
    }
    
    getMultiplication(value1, value2) {
        this.listSteps.push(`${value1} * ${value2} = ${value1 * value2}`);
        return value1 * value2;
    }
    
    getAddition(value1, value2) {
        this.listSteps.push(`${value2} + ${value1} = ${this.convertValues(value2) + this.convertValues(value1)}`);
        value1 = this.convertValues(value1);
        value2 = this.convertValues(value2);
        return value2 + value1;
    }

    // Converters
    convertValues(value) {
        let result;
        for (let i = 0; i < value.length; i++) {
            if (value.toString().substring(i, i+1) === ".") {
                result = Number.parseFloat(value);
                break;
            }
        }
        if (!result) {
            result = Number.parseInt(value);
        }
        return result;
    }

    replaceAll(string) {
        let result = "";
        for (let i = 0; i < string.length; i++) {
            if (string.substring(i, i + 1) !== ",") {
                result += string.substring(i, i+1);
            } else {
                result += "";
            }
        }
        return result;
    }
}

class AlgebraTwoMath {
    constructor({...data}) {
        this.data = data;
        this.listSteps = [];
        this.stepsToAnswer = "";
        this.variables = ["x", "y", "z", "=", "<", ">", "≤", "≥"];
    }

    calc() {
        const all = [];
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) { 
                if (this.data[key] !== " ") {
                    all.push(this.data[key]);
                }
            }
        }

        const answer = this.solveEquation(all);
        if (answer.errorResponse) {
            return {errorResponse: answer.errorResponse, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps, type: "linear-equation", numerator: undefined, denominator: undefined};
        }
        this.listSteps.push(`= ${answer}`);
        if (typeof answer === "string") {
            return {answer: answer, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps, type: "linear-equation", numerator: undefined, denominator: undefined};    
        }
        return {answer: `${Math.round(answer * 1000) / 1000}`, stepsToAnswer: this.stepsToAnswer, listOfSteps: this.listSteps, type: "linear-equation", numerator: undefined, denominator: undefined};
    }

    solveEquation(all) {
        this.listSteps.push(this.replaceAll(all.toString()));
        
        if (all.includes("^")) {
            const expression = this.getExpression(all);
            if (typeof expression[expression.indexOf("^") + 1] === "undefined") {
                return {errorResponse: "Something Went Wrong: Power Was Not Written!!!"}
            } else if (all.includes("x")) {
                return Math.pow(expression[0], expression[expression.indexOf("^") + 1]) + "^x";
            }
            else {
                this.stepsToAnswer = "Powers";
                if (expression.includes("+") || expression.includes("-")) {
                    if (expression.includes("+")) {
                        return Math.pow(this.convertValues(expression[0]), this.convertValues(expression[expression.indexOf("^") + 1]) + this.convertValues(expression[expression.length - 1]));
                    } else {
                        if (Number.isNaN(this.convertValues(expression[expression.indexOf("^") + 1]))) {
                            return Math.pow(this.convertValues(expression[0]), this.convertValues(-expression[expression.indexOf("^") + 2]));
                        }
                        return Math.pow(this.convertValues(expression[0]), this.convertValues(expression[expression.indexOf("^") + 1]) - this.convertValues(expression[expression.length - 1]));
                    }
                } else if (expression.includes("/")) {
                    if (expression.indexOf("/") < expression.indexOf("^") && expression.lastIndexOf("/") < expression.indexOf("^")) {
                        return Math.pow(expression[expression.indexOf("/") - 1] / expression[expression.indexOf("/") + 1], expression[expression.indexOf("^") + 1]);
                    } else if (expression.indexOf("/") < expression.indexOf("^") && expression.lastIndexOf("/") > expression.indexOf("^")) {
                        return Math.pow(expression[expression.indexOf("/") - 1] / expression[expression.indexOf("/") + 1], expression[expression.lastIndexOf("/") - 1] / expression[expression.lastIndexOf("/") + 1])
                    }
                    return Math.round(Math.pow(expression[0], expression[expression.indexOf("/") - 1] / expression[expression.indexOf("/") + 1]) * 100) / 100;
                } else {
                    return Math.pow(expression[0], expression[expression.indexOf("^") + 1])
                }
            }
        }
    }

    // Exponent Functions
    getExpression(all) {
        let expression = [];
        let temp = [];
        for(let i = 0; i < all.length; i++) {
            if (this.variables.includes(all[i])) {
                if (!temp.length < 1) {
                    expression.push(this.replaceAll(temp.toString()));
                    temp = [];
                }
            } else {
                switch(all[i]) {
                    case "^":
                        if (!temp.length < 1) {
                            expression.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        expression.push("^");
                        break;
                    case "+":
                        if (!temp.length < 1) {
                            expression.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        expression.push("+");
                        break;
                    case "-":
                        if (!temp.length < 1) {
                            expression.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        expression.push("-");
                        break;
                    case "/":
                        if (!temp.length < 1) {
                            expression.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        expression.push("/");
                        break;
                    case "=":
                        if (!temp.length < 1) {
                            expression.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        expression.push("=");
                        break;
                    default:
                        temp.push(all[i]);
                        break;
                }
            }    
        }    

        if (!temp.length < 1) {
            expression.push(this.replaceAll(temp.toString()));
        }

        return expression;
    }

    // Basic Operations
    getDivision(value1, value2) {
        this.listSteps.push(`${value2} / ${value1} = ${value2 / value1}`);
        return value2 / value1;
    }
    
    getSubtraction(value1, value2) {
        this.listSteps.push(`${value2} - ${value1} = ${value2 - value1}`);
        return value2 - value1;
    }
    
    getMultiplication(value1, value2) {
        this.listSteps.push(`${value1} * ${value2} = ${value1 * value2}`);
        return value1 * value2;
    }
    
    getAddition(value1, value2) {
        this.listSteps.push(`${value2} + ${value1} = ${this.convertValues(value2) + this.convertValues(value1)}`);
        value1 = this.convertValues(value1);
        value2 = this.convertValues(value2);
        return value2 + value1;
    }

    // Converters
    convertValues(value) {
        let result;
        for (let i = 0; i < value.length; i++) {
            if (value.toString().substring(i, i+1) === ".") {
                result = Number.parseFloat(value);
                break;
            }
        }
        if (!result) {
            result = Number.parseInt(value);
        }
        return result;
    }

    replaceAll(string) {
        let result = "";
        for (let i = 0; i < string.length; i++) {
            if (string.substring(i, i + 1) !== ",") {
                result += string.substring(i, i+1);
            } else {
                result += "";
            }
        }
        return result;
    }
}

class PreCalculusMath {
    constructor({...data}) {
        this.data = data;
        this.stepsToAnswer = "";
        this.variables = ["x", "y", "z", "="];
        this.trigfunctions = ["sin", "cos", "tan", "csc", "sec", "cot"];
    }

    calc() {
        const all = [];
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) { 
                if (this.data[key] !== " ") {
                    all.push(this.data[key]);
                }
            }
        }

        const answer = this.solveEquation(all);
        let numerator;
        let denominator;
        let finalAnswer;

        if (answer.type === "error") {
            return {error: answer.error};
        }

        switch(answer.type) {
            case "radians":
                numerator = answer.numerator;
                denominator = answer.denominator;
                finalAnswer = "";
                break;
            case "degrees":
                finalAnswer = answer.answer + "°";
                break;
        }

        return {answer: finalAnswer, type: answer.type, stepsToAnswer: this.stepsToAnswer, numerator: numerator, denominator: denominator};
    }

    solveEquation(all) {
        const equation = this.getEquation(all);
        if (equation.includes("°")) {
            this.stepsToAnswer = "Degrees To Radians";
            return this.degreesToRadians(equation[equation.indexOf("°") - 1]);
        }
        // 𝝅 "\ud835" identification
        else if (equation.includes("𝝅")) {
            this.stepsToAnswer = "Radians To Degrees";
            return {type: "degrees", answer: this.getMultiplication(this.getDivision(equation[equation.indexOf("/") + 1], this.getMultiplication(equation[equation.indexOf("𝝅") - 1], Math.PI)), this.getDivision(Math.PI, 180))};
        }

        return {type: "error", error: "Error, unrecognizable input"};
    }

    getEquation(all) {
        let equationArray = [];
        let temp = [];
        for(let i = 0; i < all.length; i++) {
            if (this.variables.includes(all[i])) {
                if (!temp.length < 1) {
                    equationArray.push(this.replaceAll(temp.toString()));
                    temp = [];
                }
            } else {
                switch (all[i]) {
                    case "-":
                        temp = this.checkForUni(temp);
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("-");
                        break;
                    case "(":
                        temp = this.checkForUni(temp);
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("(");
                        break;
                    case ")":
                        temp = this.checkForUni(temp);
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push(")");
                        break;
                    case "/":
                        temp = this.checkForUni(temp);
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("/");
                        break;
                    // Special Characters
                    case "°":
                        this.checkForUni(temp)
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("°");
                        break;
                    case "\ud835":
                        if (!temp.length < 1) {
                            equationArray.push(this.replaceAll(temp.toString()));
                            temp = [];
                        }
                        equationArray.push("𝝅");
                        break;
                    default:
                        temp.push(all[i]);
                        break;
                    }
                }
        }

        if (!temp.length < 1) {
            equationArray.push(this.replaceAll(temp.toString()));
        }
        return equationArray;
    }

    degreesToRadians(degrees) {
        return this.convertToFraction(degrees);
    }

    // Basic Operations
    getDivision(value1, value2) {
        return value2 / value1;
    }
    
    getSubtraction(value1, value2) {
        return value2 - value1;
    }
    
    getMultiplication(value1, value2) {
        return value1 * value2;
    }
    
    getAddition(value1, value2) {
        value1 = this.convertValues(value1);
        value2 = this.convertValues(value2);
        return value2 + value1;
    }

    convertToFraction(degrees) {
        var denominator = 180;
        var numerator = degrees;
        var divisor = this.gcd(degrees, 180);
        
        numerator /= divisor;
        denominator /= divisor;
        
        return {type: "radians", numerator: `${Math.floor(numerator)}𝝅`, denominator: Math.floor(denominator)};
    }

    gcd(a, b) {
        if (b < 0.0000001) return a;
      
        return this.gcd(b, Math.floor(a % b));
    };

    checkForUni(data) {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].toString() !== "\uDF45") {
                temp.push(data[i]);
            }
        }

        return temp;
    }

    replaceAll(string) {
        let result = "";
        for (let i = 0; i < string.length; i++) {
            if (string.substring(i, i + 1) !== ",") {
                result += string.substring(i, i+1);
            } else {
                result += "";
            }
        }
        return result;
    }
}

module.exports.GeometryMath = (data) => {
    return new GeometryMath(data).calc();
};

module.exports.AlgebraOneMath = (data) => {
    return new AlgebraOneMath(data).calc();
}

module.exports.AlgebraTwoMath = (data) => {
    return new AlgebraTwoMath(data).calc();
}

module.exports.PreCalculusMath = (data) => {
    return new PreCalculusMath(data).calc();
}