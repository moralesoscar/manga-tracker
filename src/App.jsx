import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import CardContainer from './components/CardContainer.jsx'
import Spinner from './components/Spinner.jsx'
import db from './db.json'



const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mangaResults, setMangaResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async () => {
    setIsLoading(true);

    try {
      // TODO: Change to API
      
      if (db.result != 'ok') {
        throw new Error('Result status was different to "ok"');
      }
      
      setMangaResults(db.data)
      

    } catch (error) {
      console.log(`Error while fetching data: ${error}`);
      setErrorMessage('Error. Try again Later');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log('APP has loaded.')
    fetchData();
  }, []);

  return (
    <main>
      <header>
        <h1>Manga Buzz</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        Count: {mangaResults.length}
      </header>

      <section>
        { isLoading ? <Spinner/> : errorMessage ? <p>{errorMessage}</p> : 
        <CardContainer className='card-container' mangaList={mangaResults} preferedLanguage={'en'}/>
        }
      </section>
    </main>
  )
}

export default App
