import { describe, test, afterAll, expect, beforeAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app.js'
import User from '../src/modules/user/user.model.js'
import { authService } from '../src/modules/auth/auth.service.js'

const api = supertest(app)

const userTest = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'password',
}

const userTest2 = {
  name: 'test2',
  email: 'test2@gmail.com',
  password: 'password2',
}

const invalidUser = {
  name: 'test',
  email: 'manuelito',
  password: '122324234',
}

const badUser = {
  name: 'test',
  password: 'password',
}

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://mongodb-test:27017/pelivalo')
  }

  await User.deleteMany({})

  await authService.register(
    userTest.name,
    userTest.email,
    userTest.password,
    ''
  )
})

describe('register tests', () => {
  test('Creación de usuario con datos invalidos', async () => {
    const response = await api
      .post('/api/auth/register')
      .send(invalidUser)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(400)
  })

  test('Creación de usuario con un dato faltante', async () => {
    const response = await api
      .post('/api/auth/register')
      .send(badUser)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(400)
  })

  test('Creación de usuario exitosa', async () => {
    const response = await api
      .post('/api/auth/register')
      .send(userTest2)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(201)
  })

  test('Creación de usuario ya existente', async () => {
    const response = await api
      .post('/api/auth/register')
      .send(userTest)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(400)
  })
})

describe('login tests', () => {
  test('Login con email en uppercase', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'TEST@gmail.com', password: 'password' })
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('coupleId')
  })

  test('Login con un usuario no registrado', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'test3@gmail.com', password: '123345' })
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(404)
  })

  test('Login con una contraseña invalida', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: '123' })
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(401)
  })

  test('Credenciales invalidas', async () => {
    const response = await api
      .post('/api/auth/login')
      .send(invalidUser)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(400)
  })

  test('Login con credenciales validas', async () => {
    const response = await api
      .post('/api/auth/login')
      .send(userTest)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('coupleId')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(async () => {
  await api.post('/api/auth/logout')
})
