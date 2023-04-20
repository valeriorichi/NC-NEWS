import { useState } from "react";
import { postComments } from "../api";

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
        console.log(err);
        setUpdateCommentCount(currentCommentCount - 1);
        setError(true);
      });
  };

  if (!loggedInUser)
    return (
      <button onClick={() => window.scrollTo(0, 0)}>
        Log-in to write new comment!
      </button>
    );
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
          {error ? (
            <p>Your comment did not go through! Please try again later</p>
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
