import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopicDescription } from "../api";
import { orderByCommentCount } from "../utils/orderByCommentCount";

const ArticlesTray = () => {
  const { topic } = useParams();
  const topicToCapital = topic
    ? topic.charAt(0).toUpperCase() + topic.slice(1)
    : null;
  const [articles, setArticles] = useState([]);
  const [topicDescription, setTopicDescription] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);

  let queryToUse = ``;
  if (topic) {
    queryToUse = `?topic=${topic}`;
  } else {
    queryToUse = ``;
  }

  useEffect(() => {
    setIsLoading(true);
    getArticles(queryToUse)
      .then((response) => {
        setIsLoading(false);
        if (sortBy === "comment_count") {
          const sortedArticles = orderByCommentCount(response, sortOrder);
          setArticles(sortedArticles);
        } else {
          setArticles(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (topic) {
      getTopicDescription(topic).then((response) => {
        setTopicDescription(response.description);
      });
    }
  }, [queryToUse, sortBy, sortOrder, topic]);

  const handleSortBy = (sortBy) => {
    if (sortBy === "comment_count") {
      setSortBy("comment_count");
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(sortBy);
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    }
  };

  if (isLoading) return <h3>Articles are loading...</h3>;

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

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </>
  );
};

export default ArticlesTray;
