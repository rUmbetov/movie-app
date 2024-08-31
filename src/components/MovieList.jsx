import React from 'react';
import { Alert, Spin } from 'antd';

import CardList from './CardList';

export default function MovieList({ rated, movies, isLoading, error, handleChangeRate }) {
  if (!movies.length) {
    return <Alert message="Фильмы не найдены!" type="warning" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <ul className="cardRow">
      {movies.map((movie) => (
        <CardList rated={rated} movie={movie} key={movie.id} handleChangeRate={handleChangeRate} />
      ))}
    </ul>
  );
}
