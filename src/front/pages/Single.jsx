import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
const onePieceImageUrl = "https://static.wikia.nocookie.net/onepiece/images/7/75/One_Piece_Logo.png/revision/latest?cb=20120706185846&path-prefix=es";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = props => {
  const { store } = useGlobalReducer()
  const { theId } = useParams()
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container text-center">
      <img src={onePieceImageUrl} className="img-fluid my-4" alt="One Piece" style={{ maxHeight: 120 }} />
      <h1 className="display-4">Todo: {singleTodo?.title}</h1>
      <hr className="my-4" />
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};
