import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import { findMostCommentedArticle } from "../utils/findMostCommentedArticle";

const HomePage = () => {
  const [mostVotedArticle, setMostVotedArticle] = useState([{}]);
  const [mostCommentedArticle, setMostCommentedArticle] = useState([{}]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles("?sort_by=votes&order=asc").then((response) => {
      setMostVotedArticle(response);
    });
    getArticles().then((response) => {
      const theMostCommentedArticle = findMostCommentedArticle(response);
      setMostCommentedArticle(theMostCommentedArticle);
    });
    getArticles().then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <>
      <h1>Welcome to the NC-News</h1>
      <h2>The most commented article:</h2>
      <ArticleCard article={mostCommentedArticle} />
      <h2>The most voted article:</h2>
      <ArticleCard article={mostVotedArticle[0]} />
      <h2>The most recent articles:</h2>
      {articles.slice(0, 10).map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </>
  );
};

export default HomePage;
