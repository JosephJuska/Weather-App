import { Link } from "react-router-dom";
import '../style/Header.css';
export function Header(){
    return(
        <header>
            <h1>Weather App</h1>
            <h2>Click down below to learn about Tech:</h2>
            <ul>
                <li><Link to="https://www.w3schools.com/html/" target="_blank"><img className="logo" src="src/icons/html5/html5-original.svg" alt="HTML5 Logo" /></Link></li>
                <li><Link to="https://sass-lang.com/" target="_blank"><img className="logo" src="src/icons/sass/sass-original.svg" alt="Sass Logo" /></Link></li>
                <li><Link to="https://react.dev/" target="_blank"><img className="logo" src="src/icons/react/react-original.svg" alt="React Logo" /></Link></li>
                <li><Link to="https://www.typescriptlang.org/" target="_blank"><img className="logo" src="src/icons/typescript/typescript-original.svg" alt="Typescript Logo" /></Link></li>
            </ul>
        </header>
    );
}