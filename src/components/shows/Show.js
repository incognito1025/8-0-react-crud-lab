import { Link, useNavigate, useParams } from "react-router-dom";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";
// src/components/shows/Show.js
import { destroyShow, getOneShow } from "../../api/fetch";

import { useEffect, useState } from "react";



function Show() {
  let navigate = useNavigate();
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();  // The useParam hook called useParams with id. Type in the url. after the `/`, wild card.  The id (wildcard) is the property in the object and will access the value of the id.

  function handleDelete() {
    destroyShow(id)
      .then(() => navigate("/shows"))
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }

  useEffect(() => {
    getOneShow(id)
      .then((response) => {
        setShow(response);
        if (Object.keys(response).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id]);  //dependency array



  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(show.id)}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;

// CRUD - create read update delete
