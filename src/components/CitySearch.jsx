import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CitySearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    };
    return (
    <form onSubmit={handleSearch}>
        <input
    type="text"
    placeholder="Search for a city"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
    <FontAwesomeIcon icon={faSearch} />
        </button>
    </form>
    );
};
export default CitySearch