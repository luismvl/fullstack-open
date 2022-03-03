function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  const reducer = (total, currentBlog) => total + currentBlog.likes;
  return blogs.reduce(reducer, 0);
}

function favoriteBlog(blogs) {
  return blogs.reduce((favBlog, currentBlog) => {
    if (currentBlog.likes >= favBlog.likes) {
      return {
        title: currentBlog.title,
        author: currentBlog.author,
        likes: currentBlog.likes
      };
    }
    return favBlog;
  });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};