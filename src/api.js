import axios from "axios";
import { formatDate } from "./utils/formatDate";

const ncNewsApi = axios.create({
    baseURL: 'https://val-northcoders.onrender.com/api',
});

export const getArticles = (query = '') => {
    return ncNewsApi.get(`/articles${query}`)
        .then((response) => {
            return response.data.articles;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getArticle = (query = '') => {
    return ncNewsApi.get(`/articles${query}`)
        .then((response) => {
            response.data.article.created_at = formatDate(response.data.article.created_at);
            return response.data.article;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getUsers = () => {
    return ncNewsApi.get(`/users`)
        .then((response) => {
            return response.data.users;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getTopics = () => {
    return ncNewsApi.get(`/topics`)
        .then((response) => {
            return response.data.topics;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getTopicDescription = (topicName) => {
    return ncNewsApi.get(`/topics`)
        .then((response) => {
            return response.data.topics.find((topic) => topic.slug === topicName);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getComments = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`)
        .then((response) => {
            response.data.comments.map((comment) => {
                return comment.created_at = formatDate(comment.created_at);
            });
            return response.data.comments;
        })
        .catch((err) => {
            console.log(err);
        });
};
