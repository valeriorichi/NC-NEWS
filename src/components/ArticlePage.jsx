import { getArticle } from "../api";
import CommentsExtension from "./CommentsExtension";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const { article_id } = useParams();
  const query = `/${article_id}`;
  const [article, setArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [addVotes, setAddVotes] = useState(false);

  useEffect(() => {
    getArticle(query).then((response) => {
      setArticle(response);
    });
  }, [query]);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleHideComments = () => {
    setShowComments(false);
  };
  const handleAddVotes = () => {
    setAddVotes(true);
  };

  return (
    <>
      <div>
        <h1>{article.title}</h1>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created at: {article.created_at}</h4>
        <img src={article.article_img_url} alt={`${article.title}`} />
        <p>{article.body}</p>
        <button onClick={handleAddVotes}>👍{article.votes}</button>
        <button onClick={handleShowComments}>💬{article.comment_count}</button>
      </div>
      <div>
        {showComments ? (
          <>
            <CommentForm />
            <CommentsExtension article_id={article.article_id} />
            <button onClick={handleHideComments}>Hide comments</button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ArticlePage;
