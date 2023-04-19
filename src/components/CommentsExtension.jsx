import { useEffect, useState } from "react";
import { getComments } from "../api";

const CommentsExtension = ({ article_id }) => {
  const [comments, setComments] = useState([{}]);

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(response);
    });
  }, [article_id]);

  return (
    <>
      {comments.map((comment) => (
        <section key={comment.comment_id}>
          <p>Author: {comment.comment_author} </p>
          <p>Posted at: {comment.created_at} </p>
          <p>{comment.body} </p>
        </section>
      ))}
    </>
  );
};

export default CommentsExtension;
