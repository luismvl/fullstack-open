const Blog = require('../models/blog.js')

const initialBlogs = [
  {
    title: 'Blog title 1',
    author: 'Luis Vela',
    url: 'url1',
    likes: 3,
  },
  {
    content: 'Blog title 2',
    author: 'Luis Vela',
    url: 'url2',
    likes: 7,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
