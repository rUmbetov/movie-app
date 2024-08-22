import { useState, createContext, useEffect } from 'react';

import { getGenreMovie } from './API/api';

export const GenresContext = createContext();

const GenreContext = (props) => {
  const [genre, setGenre] = useState({});

  useEffect(() => {
    const getGenre = async () => {
      try {
        const result = await getGenreMovie();
        const genreMap = result.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenre(genreMap);
      } catch (err) {
        console.log('Не удалось загрузить жанры');
      }
    };
    getGenre();
  }, []);
  return <GenresContext.Provider value={{ genre }}>{props.children}</GenresContext.Provider>;
};

export default GenreContext;
