const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

jest.setTimeout(100000)

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog posts is by default _id', async () => {
    const blog = await Blog.findOne({})
    expect(blog._id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('verifies that HTTP POST request to /api/blogs successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogs = await helper.blogsInDb()
    expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('verifies that if the likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'titlefortest',
      author: 'author',
      url: 'url.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogs = await helper.blogsInDb()
    const addedBlog = totalBlogs.find((blog) => blog.title === 'titlefortest')
    expect(addedBlog.likes).toBe(0)
  })

  test('verifies that if the url of title property are missing, the backend responds with 400 Bad Request.', async () => {
    const newBlogNoTitle = {
      author: 'author',
      url: 'url.com',
    }
    await api.post('/api/blogs').send(newBlogNoTitle).expect(400)

    const newBlogNoUrl = {
      title: 'title',
      author: 'author',
    }
    await api.post('/api/blogs').send(newBlogNoUrl).expect(400)
  })
})

describe('deleting blogs', () => {
  test('creates a blog and delete it, then verifies if the blog exist in db', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api.delete(`/api/blogs/${response.body._id}`).expect(204)
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs.map((b) => b._id)).not.toContain(response.body._id)
  })

  test('when deleting a non existing blog, api response is 404', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api.delete(`/api/blogs/${response.body._id}`).expect(204)
    await api.delete(`/api/blogs/${response.body._id}`).expect(404)
  })
})

describe('updating notes', () => {
  test('change every field on a blog succesfully', async () => {
    const blog = (await helper.blogsInDb())[0]

    const updatedProps = {
      title: 'blog test',
      author: 'author test',
      url: 'url.test',
      likes: 0,
    }

    const response = await api
      .put(`/api/blogs/${blog._id}`)
      .send(updatedProps)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    delete response.body._id
    delete response.body._v
    delete response.body.__v

    expect(response.body).toEqual(updatedProps)
  })

  test('when updating a non existing blog, returns status 404', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api.delete(`/api/blogs/${response.body._id}`).expect(204)
    await api
      .put(`/api/blogs/${response.body._id}`)
      .send({ title: 'new title' })
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
