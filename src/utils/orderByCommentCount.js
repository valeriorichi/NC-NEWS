export const orderByCommentCount = (articles, order) => {
    return articles.sort((a, b) => {
        if (order === "desc") {
            return b.comment_count - a.comment_count;
        } else {
            return a.comment_count - b.comment_count;
        }
    });
};