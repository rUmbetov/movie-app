import React from 'react';
import { Rate } from 'antd';

import noPic from '../../public/noPic.jpg';

const CardList = ({ movie, handleChangeRate, rating }) => {
  const resizeDescription = (desc) => {
    if (desc.length > 20) {
      return desc.split(' ').slice(0, 20).join(' ') + '...';
    }
    return desc;
  };
  const resizeTitle = (title) => {
    if (title.length > 10) {
      return title.split('').slice(0, 9).join('') + ' ...';
    }
    return title;
  };
  const onChange = (value) => {
    handleChangeRate(value, movie.id);
  };
  const getRatingColor = (rating) => {
    if (rating >= 0 && rating <= 3) return '#E90000';
    if (rating > 3 && rating <= 5) return '#E97E00';
    if (rating > 5 && rating <= 7) return '#E9D100';
    if (rating > 7) return '#66E900';
    return '#E0E0E0';
  };
  return (
    <li className="card">
      <img
        className="imgBlock"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPic}
        alt="poster"
      />
      <div className="content">
        <div className="content__title-rate">
          <h5 className="content__title">{resizeTitle(movie.title)}</h5>{' '}
          <div className="content__rate" style={{ borderColor: getRatingColor(movie.vote_average) }}>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        <p className="content__date">{movie.release_date} </p>
        <div className="content__genre">
          <button className="button__genre" type="button">
            Drama
          </button>
          <button className="button__genre" type="button">
            Action
          </button>
        </div>
        <p className="content_description">{resizeDescription(movie.overview)}</p>
        <Rate
          className="content__star"
          allowHalf
          count={10}
          defaultValue={movie.rating ? movie.rating : rating}
          onChange={onChange}
        />
      </div>
    </li>
  );
};

export default CardList;
