import { useState, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';

import Gallery from './components/Galley';
import SearchBar from './components/SearchBar';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';

import './App.css';

function App() {
  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('');

  const handleSearch = (e, term) => {
    e.preventDefault();

    if (term === '') setData([]);
    
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
      {message}
      <Router>
        <Routes>

          <Route path='/' element={
            <Fragment>
              <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
              }}>
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
            </Fragment>
          } />

          <Route path='/album/:id' element={<AlbumView />}/>
          
          <Route path='/artist/:id' element={<ArtistView />}/>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
