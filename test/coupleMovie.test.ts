import supertest from 'supertest'
import app from '../src/app.js'
import mongoose from 'mongoose'
import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { authService } from '../src/modules/auth/auth.service.js'
import User from '../src/modules/user/user.model.js'
import Couple from '../src/modules/couple/couple.model.js'
import type { Couple as CoupleInterface } from '../src/modules/couple/couple.js'
import CoupleMovie from '../src/modules/coupleMovie/coupleMovie.model.js'
import { coupleRepositories } from '../src/modules/couple/couple.repositories.js'

const api = supertest(app)

const userTest = {
  name: 'test',
  email: 'testcouplemovie1@gmail.com',
  password: 'password',
}

const userTest2 = {
  name: 'test2',
  email: 'testcouplemovie2@gmail.com',
  password: 'password',
}

const movieTest = {
  movieId: '1234',
  movieName: 'test',
  moviePoster: 'test',
}

// const movieTest2 = {
//   movieId: '1235',
//   movieName: 'test',
//   moviePoster: 'test',
// }

const badMovieTest = {
  movieId: '1234',
  movieName: null,
  moviePoster: 'test',
}

let cookie: string
let coupleId: string
let id: string

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://mongodb-test:27017/pelivalo')
  }

  await Promise.all([
    User.deleteMany({}),
    Couple.deleteMany({}),
    CoupleMovie.deleteMany({}),
  ])

  const user1 = await authService.register(
    userTest.name,
    userTest.email,
    userTest.password
  )
  const user2 = await authService.register(
    userTest2.name,
    userTest2.email,
    userTest2.password
  )
  id = user2.id.toString()

  const coupleTest = {
    users: [user1.id, user2.id],
    name: 'test',
  }

  const code = await coupleRepositories.create(user1.id)
  if (!code) throw new Error('Code not created')
  coupleId = code.id.toString()

  await coupleRepositories.update(
    coupleId,
    coupleTest as unknown as CoupleInterface
  )

  const loginResponse = await api.post('/api/auth/login').send(userTest)
  cookie = loginResponse.headers['set-cookie']
})

describe('mark movie watched', () => {
  test('marca una pelicula vista con un id de pareja invalido', async () => {
    const response = await api
      .post(`/api/coupleMovie/12345566`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(400)
  })

  test('marca una pelicula vista con una pareja que no existe', async () => {
    const response = await api
      .post(`/api/coupleMovie/${id}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(404)
  })

  test('marca una pelicula vista con un dato faltante', async () => {
    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(badMovieTest)

    expect(response.status).toBe(400)
  })

  test('marca una pelicula vista con datos Validos', async () => {
    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(200)
  })

  test('marca una pelicula vista con una pelicula que ya esta vista', async () => {
    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
