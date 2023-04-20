import { useEffect, useState } from "react";
import { getCommentsWithAvatars } from "../api";

const CommentsExtension = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getCommentsWithAvatars(article_id)
      .then((response) => {
        setComments(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  if (isLoading) return <h4>Comments are loading....</h4>;
  return (
    <>
      {comments.map((comment) => (
        <section key={comment.comment_id}>
          <p>Author: {comment.author} </p>
          <img
            src={comment.author_avatar_url}
            alt="Avatar"
            width="50"
            height="50"
          />
          <p>Posted at: {comment.created_at} </p>
          <p>{comment.body} </p>
        </section>
      ))}
    </>
  );
};

export default CommentsExtension;
