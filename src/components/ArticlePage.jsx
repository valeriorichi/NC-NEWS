import { getArticle, patchLikes } from "../api";
import CommentsExtension from "./CommentsExtension";
import CommentForm from "./CommentForm";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticlePage = ({ loggedInUser }) => {
  const { article_id } = useParams();
  const query = `/${article_id}`;
  const [article, setArticle] = useState([{}]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [newCommentIsSubmitting, setNewCommentIsSubmitting] = useState(false);
  const [updateCommentCount, setUpdateCommentCount] = useState(null);
  const [likeState, setLikeState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticle(query)
      .then((response) => {
        setArticle(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setIsLoading(false);
      });
  }, [query]);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleLike = (value) => {
    patchLikes(article_id, value)
      .then((response) => {
        setArticle(response);
      })
      .catch((err) => {
        setError(err.response.data);
        setIsLoading(false);
      });
    if (likeState === 0) {
      setLikeState(value);
    } else if (value !== 0) {
      setLikeState(0);
    } else {
      setLikeState(value);
    }
  };

  if (isLoading) return <h3>Article is loading...</h3>;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="article-page">
      <div>
        <h1>{article.title}</h1>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created at: {article.created_at}</h4>
        <img src={article.article_img_url} alt={`${article.title}`} />
        <p>{article.body}</p>
      </div>
      <div>
        <button onClick={() => handleLike(1)} disabled={likeState === 1}>
          👍
        </button>
        <button onClick={() => handleLike(-1)} disabled={likeState === -1}>
          👎
        </button>
        <span>💙{article.votes}</span>
      </div>
      <div>
        <button onClick={handleShowComments}>
          💬{updateCommentCount ? updateCommentCount : article.comment_count}
        </button>
        {showComments ? (
          <>
            <CommentForm
              article_id={article.article_id}
              loggedInUser={loggedInUser}
              setNewComment={setNewComment}
              setNewCommentIsSubmitting={setNewCommentIsSubmitting}
              currentCommentCount={
                updateCommentCount ? updateCommentCount : article.comment_count
              }
              setUpdateCommentCount={setUpdateCommentCount}
            />
            <CommentsExtension
              article_id={article.article_id}
              newComment={newComment}
              newCommentIsSubmitting={newCommentIsSubmitting}
              loggedInUser={loggedInUser}
              currentCommentCount={
                updateCommentCount ? updateCommentCount : article.comment_count
              }
              setUpdateCommentCount={setUpdateCommentCount}
            />
            <button onClick={handleShowComments}>Hide comments</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ArticlePage;
