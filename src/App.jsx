import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { Tabs } from 'antd';
import { debounce } from 'lodash';

import SearchInput from './components/SearchInput.jsx';
import MovieList from './components/MovieList.jsx';
import PaginationComp from './components/PaginationComp.jsx';
import { fetchMovies, authUser, addRateMovie, getRateMovie } from './API/api.js';

function App() {
  const [searchState, setSearchState] = useState({
    movieDb: [],
    page: 1,
    totalPages: 1,
    searchQuery: '',
    debouncedSearchQuery: '',
    isLoading: false,
    error: null,
  });

  const [ratedState, setRatedState] = useState({
    movieRateDb: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  });

  const [guestId, setGuestId] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [rated, setRated] = useState([]);

  // Гостевая сессия по API
  useEffect(() => {
    const authenticate = async () => {
      setAuthError(null);
      try {
        const result = await authUser();
        setGuestId(result.guest_session_id);
      } catch (err) {
        setAuthError(err.message);
      }
    };
    authenticate();
  }, []);

  // Изменение поиска
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: value,
      page: 1,
    }));
  };

  // Дебаунс для поиска
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setSearchState((prevState) => ({
        ...prevState,
        debouncedSearchQuery: query.trim(),
      }));
    }, 500),
    []
  );

  // Вызов дебаунса при изменении поиска
  useEffect(() => {
    debouncedSetSearchQuery(searchState.searchQuery);
  }, [searchState.searchQuery, debouncedSetSearchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === '1' && searchState.debouncedSearchQuery) {
        setSearchState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));

        try {
          const result = await fetchMovies(searchState.debouncedSearchQuery, searchState.page);
          setSearchState((prevState) => ({
            ...prevState,
            movieDb: result.results,
            totalPages: result.total_pages,
          }));
        } catch (err) {
          setSearchState((prevState) => ({
            ...prevState,
            error: err.message,
          }));
        } finally {
          setSearchState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      } else if (activeTab === '2' && guestId) {
        setRatedState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));

        try {
          const result = await getRateMovie(guestId, ratedState.page);
          setRatedState((prevState) => ({
            ...prevState,
            movieRateDb: result.results,
            totalPages: result.total_pages,
          }));
        } catch (err) {
          setRatedState((prevState) => ({
            ...prevState,
            error: 'Не удалось загрузить или не нашлось оцененных фильмов!',
          }));
        } finally {
          setRatedState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      }
    };

    fetchData();
  }, [activeTab, searchState.debouncedSearchQuery, searchState.page, ratedState.page, guestId]);

  // Изменение страницы пагинации
  const handleChangePage = (page) => {
    if (activeTab === '1') {
      setSearchState((prevState) => ({
        ...prevState,
        page,
      }));
    } else if (activeTab === '2') {
      setRatedState((prevState) => ({
        ...prevState,
        page,
      }));
    }
  };

  // Изменение рейтинга фильма с пост запросом на сервер
  const handleChangeRate = (val, id) => {
    if (!guestId) return;
    const ratemovie = async () => {
      await addRateMovie(id, val, guestId);
    };
    ratemovie();
    setRated((prevState) => {
      const index = prevState.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedState = [...prevState];
        updatedState[index] = { id, val };
        return updatedState;
      }
      return [...prevState, { id, val }];
    });
  };

  const handleChangeTabs = (tab) => {
    setActiveTab(tab);
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <SearchInput value={searchState.searchQuery} onChange={handleInputChange} />
          <MovieList
            rated={rated}
            movies={searchState.movieDb}
            isLoading={searchState.isLoading}
            error={searchState.error}
            handleChangeRate={handleChangeRate}
          />
          <PaginationComp current={searchState.page} totalPages={searchState.totalPages} onChange={handleChangePage} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <MovieList
            movies={ratedState.movieRateDb}
            isLoading={ratedState.isLoading}
            error={ratedState.error}
            handleChangeRate={handleChangeRate}
          />
          <PaginationComp current={ratedState.page} totalPages={ratedState.totalPages} onChange={handleChangePage} />
        </>
      ),
    },
  ];
  return (
    <div className="main">
      {authError ? (
        <p>Error: {authError}</p>
      ) : (
        <Tabs defaultActiveKey="1" centered size="large" items={items} onChange={handleChangeTabs} />
      )}
    </div>
  );
}

export default App;
