export const findMostCommentedArticle = (articles) => {
    let mostCommentedArticle = null;
    let highestCommentCount = 0;

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].comment_count > highestCommentCount) {
            mostCommentedArticle = articles[i];
            highestCommentCount = articles[i].comment_count;
        }
    }
    return mostCommentedArticle;
}



