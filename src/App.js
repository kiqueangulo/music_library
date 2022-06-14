import { useState, useRef } from 'react';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import './App.css';
import Gallery from './components/Galley';
import SearchBar from './components/SearchBar';

function App() {
  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('');

  const handleSearch = (e, term) => {
    e.preventDefault();
    
    const fetchData = async () => {
      document.title =`${term} Music`;
      
      const response = await fetch(`https://itunes.apple.com/search?term=${term}`);
      const resData = await response.json();

      if (resData.resultCount > 0) {
        setData(resData.results)
      } else setMessage('Not Found');
    }

    fetchData();
  }

  return (
    <div className="App">
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
