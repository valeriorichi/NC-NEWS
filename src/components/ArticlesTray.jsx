import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopicDescription } from "../api";
import { Link } from "react-router-dom";

const ArticlesTray = () => {
  const { topic } = useParams();
  const topicToCapital = topic
    ? topic.charAt(0).toUpperCase() + topic.slice(1)
    : null;
  const query = topic ? `?topic=${topic}` : "";
  const [articles, setArticles] = useState([]);
  const [topicDescription, setTopicDescription] = useState([]);

  useEffect(() => {
    getArticles(query).then((response) => {
      setArticles(response);
    });
    getTopicDescription(topic).then((response) => {
      setTopicDescription(response.description);
    });
  }, [query]);

  return (
    <>
      <h1>Welcome to the NC-News</h1>
      {topic ? (
        <>
          <h2>{topicToCapital} related articles:</h2>
          <h4>{`"${topicDescription}"`}</h4>
        </>
      ) : (
        <h2>All articles:</h2>
      )}
      <Link>
        <button>Sorting</button>
      </Link>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </>
  );
};

export default ArticlesTray;
