function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  const reducer = (total, currentBlog) => total + currentBlog.likes;
  return blogs.reduce(reducer, 0);
}

module.exports = {
  dummy,
  totalLikes
};