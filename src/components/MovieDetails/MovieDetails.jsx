import { lazy, Suspense, useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate, Routes, Route } from "react-router-dom";
import style from "./MovieDetails.module.css";

const Cast = lazy(() => import("../Cast/Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

const MovieDetailsPage = () => {
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4d020c7fa5f16b2a9d252ee73a7b91e1";
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from ?? { pathname: "/" };

  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          setFilm(data);
        } else {
          throw new Error("Film not found");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchFilm();
  }, [movieId]);

  const onGoBack = () => {
    navigate(fromLocation.pathname);
  };

  return (
    <>
      {film && (
        <div>
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <div className={style.wrapper}>
            <img
              src={`${IMAGE_URL}${film.poster_path}`}
              alt={film.title}
              className={style.img}
            ></img>
            <div className={style.description}>
              <h2>{film.title}</h2>
              <p>User score: {Math.round(film.popularity)}</p>
              <h3>Overview</h3>
              <p>{film.overview}</p>
              <div>
                <h3>Genres:</h3>
                <ul>
                  {film.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul className={style.list}>
            <li>
              <Link to={`cast`} state={{ from: location }} className={style.link}>
                Cast
              </Link>
            </li>
            <li>
              <Link to={`reviews`} state={{ from: location }} className={style.link}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={<Cast movieId={movieId} />} />
          <Route path="reviews" element={<Reviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
