import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import useInfiniteScroll, { ScrollDirection } from 'react-easy-infinite-scroll-hook';
import './App.css'
import Search from './components/Search.jsx'
import CardContainer from './components/CardContainer.jsx'
import Spinner from './components/Spinner.jsx'


const manga_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOffset, setCurrentOffset] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [mangaResults, setMangaResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);

  // Effect, when searchTerm changes and wait for 1 sec
  useDebounce(() => 
    setDebounceSearchTerm(searchTerm), 
    1000,
    [searchTerm]);

  // Effect, when debounceSearchTerm changes
  useEffect(() => {
    setCurrentOffset(0);
    setMangaResults([]);
    setHasMore(true);
    //fetchData(debounceSearchTerm, 0);
  }, [debounceSearchTerm]);

  // Get data form API
  const fetchData = async (query = '', offset = 0) => {
    if (offset === 0) {
      setMangaResults([]);
    }

    setIsLoading(true);
    console.log(offset);
    try {
      const endpoint = query ? `${manga_url}/manga?title=${encodeURIComponent(query)}&offset=${offset}` : `${manga_url}/manga?offset=${offset}`;
      const response = await fetch(endpoint)
      if (!response.ok) {
        console.log(response);
          throw new Error('Error al comunicarse con manga-tracker API');
      }
      const data = await response.json();
      
      if (data.result != 'ok') {
        throw new Error('Result status was different to "ok"');
      }

      setCurrentOffset(data.offset + data.limit);
      if (data.offset + data.limit >= data.total) {
        setHasMore(false);
      }
      return(data.data);

    } catch (error) {
      console.log(`Error while fetching data: ${error}`);
      setErrorMessage('Error. Try again Later');
    } finally {
      setIsLoading(false);
    }
  }

  // Get next, paginated, data from API
  const next = async (direction) => {
    console.log("NEXT");
    console.log(currentOffset);
    try {
        setIsLoading(true);
        const newMangas = await fetchData(debounceSearchTerm, currentOffset);
        setMangaResults((prevMangas) => direction === 'up' ? [...newMangas, ...prevMangas] : [...prevMangas, ...newMangas]);
        
    } finally {
        setIsLoading(false);
    }
  }

  const ref = useInfiniteScroll({
      next,
      rowCount: mangaResults.length,
      hasMore: { down: hasMore }
  });

  return (
    <main>
      <header>
        <h1>Manga Buzz</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        Count: {mangaResults.length}
      </header>

      <section>
        <CardContainer _ref={ref} mangaList={mangaResults} preferedLanguage={'en'}/>
        { isLoading && <Spinner/> }
      </section>
    </main>
  )
}

export default App
