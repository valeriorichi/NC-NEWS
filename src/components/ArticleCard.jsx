import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt={`${article.title}`} />
      </Link>
      <Link to={`/articles/${article.topic}`}>
        <h5>{article.topic}</h5>
      </Link>
      <Link to={`/article/${article.article_id}`}>
        <span>💙{article.votes}</span>
        <span>💬{article.comment_count}</span>
      </Link>
    </section>
  );
};

export default ArticleCard;
