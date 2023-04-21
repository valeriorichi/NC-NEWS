import { useState } from "react";
import { postComments } from "../api";
import ErrorPage from "./ErrorPage";

const CommentForm = ({
  article_id,
  loggedInUser,
  setNewComment,
  setNewCommentIsSubmitting,
  currentCommentCount,
  setUpdateCommentCount,
}) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState("");
  const [noEmptyCommentBody, setNoEmptyCommentBody] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentBody) setNoEmptyCommentBody(true);
    const newComment = {
      body: commentBody,
      username: loggedInUser,
    };
    setNewCommentIsSubmitting(true);
    setDisableButton(true);
    setUpdateCommentCount(currentCommentCount + 1);
    postComments(article_id, newComment)
      .then((response) => {
        setNewComment(response.data);
        setCommentBody("");
        setNewCommentIsSubmitting(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrors(err.response.data);
        setUpdateCommentCount(currentCommentCount - 1);
      });
  };

  if (!loggedInUser)
    return (
      <button onClick={() => window.scrollTo(0, 0)}>
        Log-in to write new comment!
      </button>
    );

  if (errors) return <ErrorPage message={errors} />;

  return (
    <form>
      <div className="comment-form">
        <div className="comment-body">
          <label htmlFor="comment_body">
            CommentBody:
            <input
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
              id="comment_body"
            ></input>
          </label>
          {noEmptyCommentBody ? (
            <div>
              <h3>
                You cannot post an empty comment. Please write some nice
                comment!!!
              </h3>
              <button onClick={() => setNoEmptyCommentBody(true)}>ok!</button>
            </div>
          ) : null}
          {error ? (
            <h3>Your comment did not go through! Please try again later</h3>
          ) : null}
          <input
            type="submit"
            value="Submit comment"
            onClick={handleSubmit}
            disabled={disableButton}
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
