import supertest from 'supertest'
import app from '../src/app.js'
import mongoose from 'mongoose'
import { describe, test, beforeAll, afterAll, expect, afterEach } from 'vitest'
import { authService } from '../src/modules/auth/auth.service.js'
import User from '../src/modules/user/user.model.js'
import Couple from '../src/modules/couple/couple.model.js'
import type { Couple as CoupleInterface } from '../src/modules/couple/couple.js'
import CoupleMovie from '../src/modules/coupleMovie/coupleMovie.model.js'
import { coupleRepositories } from '../src/modules/couple/couple.repositories.js'
import { userRepositories } from '../src/modules/user/user.repositories.js'

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

const userTest3 = {
  name: 'test3',
  email: 'testcouplemovie3@gmail.com',
  password: 'password',
}

const movieTest = {
  movieId: '1234',
  movieName: 'test',
  moviePoster: 'test',
}

const movieTest2 = {
  movieId: '1235',
  movieName: 'test',
  moviePoster: 'test',
}

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

  await authService.register(
    userTest3.name,
    userTest3.email,
    userTest3.password
  )

  id = user1.id.toString()

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

  const userCouple1 = {
    id: user1.id.toString(),
    name: user1.name,
    email: user1.email,
    password: user1.password,
    coupleId: coupleId,
  }

  const userCouple2 = {
    id: user2.id.toString(),
    name: user2.name,
    email: user2.email,
    password: user2.password,
    coupleId: coupleId,
  }

  await userRepositories.update(userCouple1)
  await userRepositories.update(userCouple2)
})

describe('mark movie watched', () => {
  test('marca una pelicula vista con un id de pareja invalido', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const response = await api
      .post(`/api/coupleMovie/12345566`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(400)
  })

  test('marca una pelicula vista con una pareja que no es la del usuario', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${id}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(403)
  })

  test('marca una pelicula vista con un dato faltante', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(badMovieTest)

    expect(response.status).toBe(400)
  })

  test('marca una pelicula vista con datos Validos', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(201)
  })

  test('marca una pelicula vista con una pelicula que ya esta vista', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(movieTest)

    expect(response.status).toBe(400)
  })
})

describe('Rating Couple Movie', () => {
  test('Rankear una pelicula sin estar marcada como vista', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest2.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response.status).toBe(404)
  })

  test('Rankear una pelicula ya rankeada por el usuario', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response.status).toBe(200)

    const response2 = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response2.status).toBe(400)
  })

  test('Rankear una pelicula con un string invalido', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest.movieId}/rating`)
      .set('Cookie', cookie)
      .send({ rating: 10 })

    expect(response.status).toBe(400)
  })

  test('Rankear una pelicula con un rating fuera de 1-10', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 11,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response.status).toBe(400)
  })

  test('Rankear una pelicula con mas de 2 personas', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    await api
      .post(`/api/coupleMovie/${coupleId}`)
      .set('Cookie', cookie)
      .send(movieTest2)

    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest2.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response.status).toBe(200)

    await api.post('/api/auth/logout')

    const loginResponse2 = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse2.headers['set-cookie']
    const response2 = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest2.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response2.status).toBe(200)

    await api.post('/api/auth/logout')

    const loginResponse3 = await api.post('/api/auth/login').send(userTest3)
    cookie = loginResponse3.headers['set-cookie']
    const response3 = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest2.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response3.status).toBe(403)
  })

  test('Rankear una pelicula correctamente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']
    const response = await api
      .post(`/api/coupleMovie/${coupleId}/movies/${movieTest.movieId}/rating`)
      .set('Cookie', cookie)
      .send({
        rating: 10,
        opinion:
          'muy buena la verdad esta increible, me gusto mucho es muy buena',
      })

    expect(response.status).toBe(200)
  })
})

afterEach(async () => {
  await api.post('/api/auth/logout')
})

afterAll(async () => {
  await mongoose.connection.close()
})
