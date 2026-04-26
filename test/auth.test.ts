import { describe, test, afterAll, expect, beforeAll } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app.js'
import User from '../src/modules/user/user.model.js'

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

const initialUserDatabase = [
  {
    name: 'test',
    email: 'test@gmail.com',
    password: 'password',
  },
]

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

  await User.insertMany(initialUserDatabase)
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

afterAll(async () => {
  await mongoose.connection.close()
})
