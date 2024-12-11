import React, {useState} from 'react';
import '.SearchBar.css' ;

const SearchBar = ({placeholder = 'search...', data = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');

    //filter data base on search input
    const filterData = data.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
);
    return (
        <div className="searchBar">
            <input
            type ="text"
            className = "search-input"
            placeholder ={placeholder}
            value = {searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)} // update the search term
            />

            <ul className="search-result">
                {filterData.map((item, index) => (
                    <li key={index} className="search-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;