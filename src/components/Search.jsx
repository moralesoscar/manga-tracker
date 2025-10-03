import search_light from '../assets/search_light.svg'
import './Search.css'

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search-bar'>
            <img className='search-icon' src={search_light} alt='Search' />
            <input 
                type='text' 
                placeholder='Search through hundreds of titles'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    )
}

export default Search