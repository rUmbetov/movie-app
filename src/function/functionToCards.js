import { format } from 'date-fns/format';

export const getg = (key, genre) => {
  return genre.genre[key];
};
export const resizeDescription = (desc) => {
  if (desc.length > 20) {
    return desc.split(' ').slice(0, 20).join(' ') + '...';
  }
  return desc;
};
export const resizeTitle = (title) => {
  if (title.length > 10) {
    return title.split('').slice(0, 9).join('') + ' ...';
  }
  return title;
};
export const getRatingColor = (rating) => {
  if (rating >= 0 && rating <= 3) return '#E90000';
  if (rating > 3 && rating <= 5) return '#E97E00';
  if (rating > 5 && rating <= 7) return '#E9D100';
  if (rating > 7) return '#66E900';
  return '#E0E0E0';
};
export const parseDate = (releaseDate) => {
  const date = new Date(releaseDate);
  return isNaN(date.getTime()) ? 'Unknown date' : format(date, 'MMMM d, yyyy');
};
