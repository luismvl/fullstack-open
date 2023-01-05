const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  if (!newBlog.likes) newBlog.likes = 0
  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
