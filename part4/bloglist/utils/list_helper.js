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

function mostBlogs(blogs) {

  const authorAndBlogs = blogs.reduce((counter, blog) => {
    const authorIndex = counter.findIndex(author => author.author === blog.author);
    if (authorIndex > -1) {
      counter[authorIndex].blogs++;
      return counter;
    } else {
      return [...counter, { author: blog.author, blogs: 1 }];
    }
  }, []);

  return authorAndBlogs.reduce((max, current) => {
    if (current.blogs >= max.blogs) {
      return current;
    } else {
      return max;
    }
  });
}

function mostLikes(blogs) {
  const authorAndLikes = blogs.reduce((counter, blog) => {
    const authorIndex = counter.findIndex(author => author.author === blog.author);
    if (authorIndex > -1) {
      counter[authorIndex].likes += blog.likes;
      return counter;
    } else {
      return [...counter, { author: blog.author, likes: blog.likes }];
    }
  }, []);

  return authorAndLikes.reduce((max, current) => {
    if (current.likes >= max.likes) {
      return current;
    } else {
      return max;
    }
  });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};