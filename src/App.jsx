import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './components/Search.jsx'
import TrendContainer from './components/TrendContainer.jsx'
import CardContainer from './components/CardContainer.jsx'
import Spinner from './components/Spinner.jsx'


const manga_url = import.meta.env.VITE_BACKEND_URL;
const limit_results = 10;

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [mangaResults, setMangaResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [mangaTrends, setMangaTrends] = useState([]);

  // Effect, when loading page
  useEffect(() => {
    fetchMetrics();
  }, []);
  
  // Effect, when searchTerm changes and wait for 1 sec
  useDebounce(() => 
    setDebounceSearchTerm(searchTerm.trim()), 
    1000,
    [searchTerm]);

  // Effect, when debounceSearchTerm changes
  useEffect(() => {
    resetPage(0);
  }, [debounceSearchTerm]);

  // Get metrics form API
  const fetchMetrics = async () => {
    setIsLoadingMetrics(true);
    try {
      const endpoint = `${manga_url}/metrics/search`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        console.log(response);
          throw new Error('Error al comunicarse con manga-tracker API');
      }

      const data = await response.json();
      
      if (data.result != 'ok') {
        throw new Error('Result status was different to "ok"');
      }

      setMangaTrends(data.data);
      
    } catch (error) {
      console.log(`Error while fetching data: ${error}`);
      setErrorMessage('Error. Try again Later');
    } finally {
      setIsLoadingMetrics(false);
    }
  }

  // Get data form API
  const fetchData = async (query = '', offset = 0) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        offset: offset * limit_results
      });
      if (query.trim()) {
        params.append('title', query)
      }
      const endpoint = `${manga_url}/manga?${params.toString()}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        console.log(response);
          throw new Error('Error al comunicarse con manga-tracker API');
      }
      const data = await response.json();
      
      if (data.result != 'ok') {
        throw new Error('Result status was different to "ok"');
      }
      
      setCurrentTotal(data.total);
      setMangaResults(data.data);

    } catch (error) {
      console.log(`Error while fetching data: ${error}`);
      setErrorMessage('Error. Try again Later');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePrev = () => {
    const newPage = currentPage - 1;
    resetPage(newPage);
  }

  const handleNext = () => {
    const newPage = currentPage + 1;
    resetPage(newPage);
  }

  const resetPage = (newPage) => {
    setCurrentPage(newPage);
    fetchData(debounceSearchTerm, newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <main>
      <header>
        <h1>Manga Buzz</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      { errorMessage && <h3>{errorMessage}</h3> }

      { mangaTrends.length > 0 && (
          <section>
            <h2>Trending Mangas</h2>
            { isLoading ? <Spinner/> : <TrendContainer trendList={mangaTrends}/> }
          </section>
        )
      }

      <section>
        <h2>All Mangas</h2>
        { isLoading ? <Spinner/> : <CardContainer mangaList={mangaResults} preferedLanguage={'en'}/> }
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
          <h3>{ currentPage + 1 }</h3>
          <button onClick={handleNext} disabled={(currentPage + 1) * limit_results >= currentTotal}>Next</button>
        </div>
      </section>
    </main>
  )
}

export default App
