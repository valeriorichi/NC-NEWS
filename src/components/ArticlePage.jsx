import { getArticle } from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const { article_id } = useParams();
  const query = `/${article_id}`;
  const [article, setArticle] = useState([{}]);
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
        <span>💙{article.votes}</span>
        <span>💬{article.comment_count}</span>
      </div>
    </>
  );
};

export default ArticlePage;
