import { getArticle } from "../api";
import CommentsExtension from "./CommentsExtension";
import CommentForm from "./CommentForm";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticle(query)
      .then((response) => {
        setArticle(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  if (isLoading) return <h3>Article is loading...</h3>;

  return (
    <>
      <div>
        <h1>{article.title}</h1>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created at: {article.created_at}</h4>
        <img src={article.article_img_url} alt={`${article.title}`} />
        <p>{article.body}</p>
      </div>
      <div>
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
    </>
  );
};

export default ArticlePage;
