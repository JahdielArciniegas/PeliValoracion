import { describe, test, afterAll, expect, beforeAll } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app.js'

const api = supertest(app)

const userTest = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'password',
}

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://mongodb-test:27017/pelivalo')
  }
})

describe('Auth tests', () => {
  test('Creación de usuario', async () => {
    const response = await api
      .post('/api/auth/register')
      .send(userTest)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toBe(201)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
