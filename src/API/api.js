const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQ2YzAyMzk5NDU2MzU3NmEzN2YxNmI1MGQxZDc0OSIsIm5iZiI6MTcyMjgwODcwMi40NzcxODgsInN1YiI6IjY2YWY5Y2Y2N2JhMmY5YjFhZmMyMmQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnFNokIGgKFZGqNNyIfPg3yBZzUmYCY8aQySSt46zis';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = async (querySearch = 'return', page = 1) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const url = `${BASE_URL}?query=${querySearch}&include_adult=false&language=en-En&page=${page}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
export const authUser = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const authUrl = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const response = await fetch(authUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addRateMovie = async (movieId, rate, guestSesId) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ value: rate }),
    };
    const rateUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSesId}`;
    const response = await fetch(rateUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getRateMovie = async (guestSesId, page) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const rateMovieUrl = `https://api.themoviedb.org/3/guest_session/${guestSesId}/rated/movies?&page=${page}`;
    const response = await fetch(rateMovieUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getGenreMovie = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const genre = 'https://api.themoviedb.org/3/genre/movie/list';
    const response = await fetch(genre, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
