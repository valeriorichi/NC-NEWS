import { useEffect, useState } from "react";
import { getCommentsWithAvatars, deleteComment } from "../api";
import ErrorPage from "./ErrorPage";

const CommentsExtension = ({
  article_id,
  newComment,
  newCommentIsSubmitting,
  loggedInUser,
  currentCommentCount,
  setUpdateCommentCount,
}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getCommentsWithAvatars(article_id)
      .then((response) => {
        setComments(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [article_id, newComment, newCommentIsSubmitting]);

  const handleDeleteComment = (comment_id) => {
    setIsLoading(true);
    setUpdateCommentCount(currentCommentCount - 1);
    deleteComment(comment_id)
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== comment_id)
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setUpdateCommentCount(currentCommentCount + 1);
      });
  };

  if (isLoading) return <h4>Comments are loading....</h4>;
  if (error) return <ErrorPage message={error} />;

  return (
    <>
      {" "}
      {newCommentIsSubmitting && newComment ? (
        <h4>Your comment is submitting now ...</h4>
      ) : (
        newComment && (
          <section>
            <p>Author: {newComment.author} </p>
            <img
              src={newComment.author_avatar_url}
              alt="Avatar"
              width="50"
              height="50"
            />
            <p>Posted at: {newComment.created_at} </p>
            <p>{newComment.body} </p>
          </section>
        )
      )}
      {comments?.map((comment) => (
        <section key={comment.comment_id}>
          <p>Author: {comment.author} </p>
          <img
            src={comment.author_avatar_url}
            alt="Avatar"
            width="50"
            height="50"
          />
          <p>Posted at: {comment.created_at} </p>
          <p>{comment.body} </p>
          {!loggedInUser ? (
            <button onClick={() => window.scrollTo(0, 0)}>
              Log-in to delete this comment!
            </button>
          ) : (
            <button onClick={() => handleDeleteComment(comment.comment_id)}>
              delete comment
            </button>
          )}
        </section>
      ))}
    </>
  );
};

export default CommentsExtension;
