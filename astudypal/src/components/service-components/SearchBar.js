import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ result }) => {
    function getClassLink(row) {
        let link;
        switch (row) {
            case "Math":
                link = "math-class";
                break;
            case "Science":
                link = "science-class";
                break;
            case "History":
                link = "history-class";
                break;
            case "English":
                link = "english-class";
                break;
            case "Foreign Languages":
                link = "foreign-languages-class";
                break;
            case "Student Resources":
                link = "student-resources";
                break;
            default:
                link = "/";
                break;
        }
        return link;
    }

    const classList = result.map((row, key) => {
        let link;
        link = getClassLink(row);
        return <li key={key}><Link to={`/table-of-contents/${link}`} className="search-bar-link">{row}</Link></li>
    });
    
    return (
        <div className="search-bar-div">
            {classList}
        </div>
    )
}

export default SearchBar;
