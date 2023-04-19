import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <section>
      <Link to={`/article/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>
      <Link to={`/article/${article.article_id}`}>
        <img src={article.article_img_url} alt={`${article.title}`} />
      </Link>
      <Link to={`/articles/${article.topic}`}>
        <p>{article.topic}</p>
      </Link>
      <Link to={`/article/${article.article_id}`}>
        <p>👍{article.votes}</p>
      </Link>
      <Link to={`/article/${article.article_id}`}>
        <p>💬{article.comment_count}</p>
      </Link>
    </section>
  );
};

export default ArticleCard;
