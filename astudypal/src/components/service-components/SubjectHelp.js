import React, { useEffect, useState } from 'react';
import { LineGraph } from './Graph';
import "../../CSS/sub-help.css";

export default function SubjectHelp({ match }) {
    const [description, setDescription] = useState();
    const [title, setTitle] = useState("");
    const [solve, setSolve] = useState([]);
    
    const [example, setExample] = useState("");
    const [line, setLine] = useState({});
    
    const descriptions = {
        // Geometry
        quadp: "The Formula for the Perimeter of a Quadrilateral is P = 2l + 2w. Multiply the length by 2 and the width by 2 and add the products.",
        quada: "The Formula for the Area of a Quadrilateral is A = lw. Multipy the length by the width",
        circc: "The Formula for the circumference of a Circle is C = 2πr. The value of pi is 3.14, multiply the value of pi(π) by the radius of the circle. Then, you will multiply the product by 2",
        circa: "The Formula for the area of a Circle is A = πr². Square the radius which in this case is (5) and multiply it by pi(π). This equation is similar to the <a>Circumference Of A Circle<a> formula.",
        // Algebra
        addp: "The addition property is very simple to understand. For this case, x is getting subtracted from 23. Since we do not know what x represents yet, we have to add 23 to the other side in order to find the value of x. Think of it as <a>Isolating the variable<a>.",
        subp: "The subtraction property is very simple to understand. For this case, x is getting added to 5. Since we do not know what x represents yet, we have to subtract 5 from the other side in order to find the value of x. Think of it as <a>Isolating the variable<a>.",
        isov: "Isolating the variable is fairly simple. Look for your the desired variable (x) and separate it. Putting the variable which is (x) in this case on one side of the equation and the numbers or constants on the other.",
        divi: "For the division property, you just divide the number before the variable which is (x) in this case.",
        dist: "With the distributive property, the aim is to mutliply the constant that is connected to the parenthesis. So in this case 2(x + 11) you would multiply the 2. Then you solve the equation by <a>Isolating the variable<a>",
        addpine: "The addition property of inequality takes aim at plotting a point on the line graph. If your inequality provides a < or >, then your circle is open like what you see below",
        subpine: "The addition property of inequality takes aim at plotting a point on the line graph. If your inequality provides a ≤ or ≥, then your circle is closed like what you see below.",
        isovine: "Isolating the variable inequality uses the principle of plotting a point on a line graph, yet applies the same reasoning as its predecessor property <a>Isolating the variable<a>",
        diviine: "The division property of inequality takes the same aim as any of the other inequalities, plotting a point on the line graph. If your inequality provides a < or >, then your circle is open as illustrated below. Yet, as you can see in the answer, the inequality gets flipped from < to >. This is because we divided the opposite side by a negative, if you do so, the eqautions inequality will get flipped.",
        distine: "The distributive property of inequality deals with the same properties as the <a>Distributive Property<a>",
        // Pre-Calculus
        detr: "Conversion factors play a major role in this equation. The equation for converting degrees to radians is 𝝅/180 * (degrees). In this case, 330 * (𝝅/180) in our equation. 330/180 * 𝝅.",
        ratd: "Conversion factors play a major role in this equation. The equation for converting radians to degrees is 180/𝝅 * (radians). In this case, 5𝝅/4 * (180/𝝅) in our equation. 5/4 * 180",
        // General
        gen: "Here you will get step by step examples of all the problems you will come across in this app. If you want to learn more about a certain topic, you can click the link to this page and it will give you an example to help you understand the answer better."
    }
    const examples = {
        // Geometry
        quad_perimeter: "Length: 7, Width: 5",
        quad_area: "Length: 5, Width: 5",
        circ_circum: "Radius: 5",
        circ_area: "Radius: 5",
        // Algebra
        addp: "x - 23 = 53",
        subp: "x + 5 = 23",
        isov: "15x + 45 = 105",
        divi: "14x = 56",
        dist: "2(x + 11) = 30",
        addpine: "x - 5 > 20",
        subpine: "x + 24 ≤ 11",
        isovine: "4x - 9 ≥ 47",
        diviine: "-4x < 44",
        distine: "-4(x + 90) > 180",
        // Pre-Calculus
        detr: "330° --> 11𝝅/6",
        ratd: "5𝝅/4 --> 225°"
    };
    const links = {
        circc: "Circumference%20Of%20A%20Circle",
        isov: "Isolating%20the%20Variable",
        addp: "Addition%20Property",
        subp: "Subtraction%20Property",
        divi: "Division%20Property",
        dist: "Distributive%20Property",
    }

    const checkForLinks = (description) => {
        let link = "";
        switch (description.substring(description.indexOf(">") + 1, description.lastIndexOf("<"))) {
            case "Circumference Of A Circle":
                link = links.circc;
                break;
            case "Isolating the variable":
                link = links.isov;
                break;
            case "Addition Property":
                link = links.addp;
                break;
            case "Subtraction Property":
                link = links.subp;
                break;
            case "Division Property":
                link = links.divi;
                break;
            case "Distributive Property":
                link = links.dist;
                break;
            default:
                link = "";
                break;
        }

        return description.includes("<") ? <>
            {description.substring(0, description.indexOf("<"))}
            {<a href={`/understanding/algebra=${link}`}>{description.substring(description.indexOf(">") + 1, description.lastIndexOf("<"))}</a>}
            {description.substring(description.lastIndexOf(">") + 1)}
        </> : <>{description}</>
    }

    useEffect(() => {
        let userRequest = "";
        switch (match.params.id.substring(match.params.id.indexOf("=") + 1)) {
            // Geometry
            case "Quadrilateral Perimeter":
                userRequest = examples.quad_perimeter;
                setDescription(checkForLinks(descriptions.quadp));
                solve.push("Length: 7, Width: 5");
                solve.push("P = (2 * Length) + (2 * Width)");
                solve.push("P = (2 * 7) + (2 * 5)");
                solve.push("P = (14) + (10)");
                solve.push("P = 24");
                break;
            case "Quadrilateral Area":
                userRequest = examples.quad_area;
                setDescription(checkForLinks(descriptions.quada));
                solve.push("A = Length * Width");
                solve.push("A = 5 * 5");
                solve.push("A = 25");
                break;
            case "Circumference Of A Circle":
                userRequest = examples.circ_circum;
                setDescription(checkForLinks(descriptions.circc));
                solve.push("C = 2πr")
                solve.push("C = 2 * π * (5)")
                solve.push("C = 2 * 15.70");
                solve.push("C = 31.4");
                break;
            case "Area Of A Circle":
                userRequest = examples.circ_area;
                setDescription(checkForLinks(descriptions.circa));
                solve.push("A = πr²")
                solve.push("A = π5²")
                solve.push("A = π * 25")
                solve.push("A = 78.5");
                break;
            // Algebra
            case "Addition Property":
                userRequest = examples.addp;
                setDescription(checkForLinks(descriptions.addp));
                solve.push("x - 23 = 53");
                solve.push("x = 53 + 23");
                solve.push("x = 76");
                break;
            case "Subtraction Property":
                userRequest = examples.subp;
                setDescription(checkForLinks(descriptions.subp));
                solve.push("x + 5 = 23");
                solve.push("x = 23 - 5");
                solve.push("x = 18");
                break;
            case "Isolating the Variable":
                userRequest = examples.isov;
                setDescription(checkForLinks(descriptions.isov));
                solve.push("15x + 45 = 105");
                solve.push("15x = 105 - 45");
                solve.push("x = 60 / 15");
                solve.push("x = 4");
                break;
            case "Division Property":
                userRequest = examples.divi;
                setDescription(checkForLinks(descriptions.divi));
                solve.push("14x = 56");
                solve.push("x = 56 / 14");
                solve.push("x = 4");
                break;
            case "Distributive Property":
                userRequest = examples.dist;
                setDescription(checkForLinks(descriptions.dist));
                solve.push("2(x + 11) = 30");
                solve.push("2 * x, 2 * 22 = 30");
                solve.push("2x + 22 = 30");
                solve.push("2x = 30 - 22")
                solve.push("2x = 8");
                solve.push("x = 8 / 2");
                solve.push("x = 4");
                break;
            case "Addition Property Inequality":
                userRequest = examples.addpine;
                setDescription(descriptions.addpine);
                solve.push("x - 5 > 20");
                solve.push("x - 5 + 5 > 20 + 5");
                solve.push("x > 25");
                setLine({line: 25, equation: "x > 25"});
                break;
            case "Subtraction Property Inequality":
                userRequest = examples.subpine;
                setDescription(descriptions.subpine);
                solve.push("x + 24 ≤ 11");
                solve.push("x + 24 - 24 ≤ 11 - 24");
                solve.push("x ≤ -9");
                setLine({line: 18, equation: "x ≤ 9"});
                break;
            case "Isolating the Variable Inequality":
                userRequest = examples.isovine;
                setDescription(checkForLinks(descriptions.isovine));
                solve.push("4x - 9 ≥ 47");
                solve.push("4x - 9 + 9 ≥ 47 + 9");
                solve.push("4x ≥ 56");
                solve.push("x ≥ 14");
                setLine({line: 14, equation: "x ≥ 14"});
                break;
            case "Division Property Inequality":
                userRequest = examples.diviine;
                setDescription(descriptions.diviine);
                solve.push("-4x < 44");
                solve.push("-4x/-4 < 44/-4");
                solve.push("x < -11");
                setLine({line: -11, equation: "x < -11"});
                break;
            case "Distributive Property Inequality":
                userRequest = examples.distine;
                setDescription(checkForLinks(descriptions.distine));
                solve.push("-4(x + 90) > 180");
                solve.push("-4x - 360 > 180");
                solve.push("-4x - 360 + 360 > 180 + 360");
                solve.push("-4x > 540");
                solve.push("-4x/-4 > 540/-4");
                solve.push("x > -135");
                solve.push("x < -135");
                setLine({line: -135, equation: "x < -135"});
                break;
            // Pre-Calculus
            case "Degrees To Radians":
                userRequest = examples.detr;
                setDescription(checkForLinks(descriptions.detr));
                solve.push("330°");
                solve.push("330 * (𝝅/180)");
                solve.push("330/180 * 𝝅");
                solve.push("11/6 * 𝝅");
                solve.push("11𝝅/6");
                break;
            case "Radians To Degrees": 
                userRequest = examples.ratd;
                setDescription(checkForLinks(descriptions.ratd));
                solve.push("5𝝅/4");
                solve.push("5𝝅/4 * 180/𝝅");
                solve.push("5/4 * 180");
                solve.push("225°");
                break;
            default:
                userRequest = "Welcome to Understanding AStudyPal";
                break;
        }

        if (match.params.id.includes("=")) {
            switch (match.params.id.substring(0, match.params.id.indexOf("="))) {
                case "algebra":
                    setTitle("Algebra");
                    break;
                case "geometry":
                    setTitle("Geometry");
                    break;
                case "pre-calculus":
                    setTitle("Pre-Calculus");
                    break;
                default:
                    setTitle("Pal");
                    break;
            }
        } else {
            setTitle("Pal");
        }

        return setExample(userRequest);
    }, []);

    return (
        <div>
            {title.length > 0 && <h1>Understanding {title}</h1>}
            <div>
                {solve.length > 0 && <h2>{match.params.id.substring(match.params.id.indexOf("=") + 1)}</h2>}
                {example.length > 0 && <h4>{example}</h4>}
                <div className="solve">
                    <p>{description && description}</p>
                    <ul>
                        {solve.map((row, key) => {
                            return <li key={key}>{row}</li>
                        })}
                    </ul>
                </div>
                {match.params.id.includes("Inequality") && <LineGraph line={line}/>}
            </div>
        </div>
    )
}
