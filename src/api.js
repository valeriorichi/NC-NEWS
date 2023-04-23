import axios from "axios";
import { formatDate } from "./utils/formatDate";

const ncNewsApi = axios.create({
    baseURL: 'https://val-northcoders.onrender.com/api',
});

export const getArticles = (query = '') => {
    return ncNewsApi.get(`/articles${query}`)
        .then((response) => {
            return response.data.articles;
        });
};

export const getArticle = (query = '') => {
    return ncNewsApi.get(`/articles${query}`)
        .then((response) => {
            response.data.article.created_at = formatDate(response.data.article.created_at);
            return response.data.article;
        });
};

export const getUsers = () => {
    return ncNewsApi.get(`/users`)
        .then((response) => {
            console.log(response);
            return response.data.users;
        });
};

export const getTopics = () => {
    return ncNewsApi.get(`/topics`)
        .then((response) => {
            return response.data.topics;
        });
};

export const getTopicDescription = (topicName) => {
    return ncNewsApi.get(`/topics`)
        .then((response) => {
            return response.data.topics.find((topic) => topic.slug === topicName);
        });
};

export const getComments = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`)
        .then((response) => {
            response.data.comments.map((comment) => {
                return comment.created_at = formatDate(comment.created_at);
            });
            return response.data.comments;
        });
};

export const deleteComment = (comment_id) => {
    return ncNewsApi.delete(`/comments/${comment_id}`);
};

export const getCommentsWithAvatars = (article_id) => {
    return Promise.all([getComments(article_id), getUsers()])
        .then(([comments, users]) => {
            const commentsWithAvatars = comments.map(comment => {
                const authorDetails = users.find(user => user.username === comment.author);
                comment.author_avatar_url = authorDetails.avatar_url;
                return comment;
            });
            return commentsWithAvatars;
        });
};

export const postComments = (article_id, { body: commentBody, username: loggedInUser }) => {
    return ncNewsApi.post(`/articles/${article_id}/comments`, { body: commentBody, username: loggedInUser })
        .then((response) => {
            if (!response) throw new Error("Failed to post comment");
            return response.data.postedComment;
        });
};

export const patchLikes = (article_id, value) => {
    return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: value })
        .then((response) => {
            response.data.updatedArticle.created_at = formatDate(response.data.updatedArticle.created_at);
            return response.data.updatedArticle;
        });
};
