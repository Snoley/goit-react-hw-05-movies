import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import style from './Cast.module.css';

const Cast = memo(({ movieId }) => {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '1a27ac166727ac0de96a34161208f474';
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w138_and_h175_face';
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    setError(null);

    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch data');
      })
      .then(({ cast: castData }) => {
        setActors(castData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [movieId]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {actors.length > 0 && (
        <ul className={style.list}>
          {actors.map(({ id, profile_path: profilePath, original_name: originalName, character }) => (
            profilePath && (
              <li key={id} className={style.item}>
                <img className={style.img} src={`${IMAGE_URL}${profilePath}`} alt={originalName} />
                <div>
                  <h3>Actor name: {originalName}</h3>
                  <p>Role: {character}</p>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </>
  );
});

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
