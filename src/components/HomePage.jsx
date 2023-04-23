import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import { getArticles } from "../api";
import { findMostCommentedArticle } from "../utils/findMostCommentedArticle";

const HomePage = () => {
  const [mostVotedArticle, setMostVotedArticle] = useState([{}]);
  const [mostCommentedArticle, setMostCommentedArticle] = useState([{}]);
  const [articles, setArticles] = useState([]);
  const [isLoadingMostVoted, setIsLoadingMostVoted] = useState(false);
  const [isLoadingMostCommented, setIsLoadingMostCommented] = useState(false);
  const [isLoadingMostRecent, setIsLoadingMostRecent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoadingMostVoted(true);
    setIsLoadingMostCommented(true);
    setIsLoadingMostRecent(true);
    getArticles("?sort_by=votes&order=asc")
      .then((response) => {
        setMostVotedArticle(response);
        setIsLoadingMostVoted(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading most voted article");
        setIsLoadingMostVoted(false);
      });
    getArticles()
      .then((response) => {
        const theMostCommentedArticle = findMostCommentedArticle(response);
        setMostCommentedArticle(theMostCommentedArticle);
        setIsLoadingMostCommented(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading most commented article");
        setIsLoadingMostCommented(false);
      });
    getArticles()
      .then((response) => {
        setArticles(response);
        setIsLoadingMostRecent(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading most recent articles");
        setIsLoadingMostRecent(false);
      });
  }, []);

  if (error) return <ErrorPage message={error} />;

  return (
    <>
      <h1 className="main-header">Welcome to the NC-News</h1>
      {error && <h3>{error}</h3>}
      {isLoadingMostCommented ? (
        <h3 className="loading">The most commented article is loading....</h3>
      ) : (
        <div>
          <h2>The most commented article:</h2>
          <ArticleCard article={mostCommentedArticle} />
        </div>
      )}
      {isLoadingMostVoted ? (
        <h3 className="loading">The most voted article is loading....</h3>
      ) : (
        <div>
          <h2>The most voted article:</h2>
          <ArticleCard article={mostVotedArticle[0]} />
        </div>
      )}
      {isLoadingMostRecent ? (
        <h3 className="loading">The most recent articles are loading....</h3>
      ) : (
        <div>
          <h2>The most recent articles:</h2>
          <table className="articles-table">
            {articles.slice(0, 10).map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default HomePage;
