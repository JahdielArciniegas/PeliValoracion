import { describe, test, afterAll, expect, beforeAll, afterEach } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app.js'
import User from '../src/modules/user/user.model.js'
import Couple from '../src/modules/couple/couple.model.js'
import { authService } from '../src/modules/auth/auth.service.js'

const api = supertest(app)

const userTest = {
  name: 'test',
  email: 'testcouple1@gmail.com',
  password: 'password',
}

const userTest2 = {
  name: 'test2',
  email: 'testcouple2@gmail.com',
  password: 'password',
}

const userTest3 = {
  name: 'test3',
  email: 'testcouple3@gmail.com',
  password: 'password',
}

const userTest4 = {
  name: 'test4',
  email: 'testcouple4@gmail.com',
  password: 'password',
}

let cookie: string

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://mongodb-test:27017/pelivalo')
  }

  await Promise.all([User.deleteMany({}), Couple.deleteMany({})])

  await authService.register(userTest.name, userTest.email, userTest.password)
  await authService.register(
    userTest2.name,
    userTest2.email,
    userTest2.password
  )
  await authService.register(
    userTest3.name,
    userTest3.email,
    userTest3.password
  )
  await authService.register(
    userTest4.name,
    userTest4.email,
    userTest4.password
  )
})

describe('get code couple', () => {
  test('Pedir el codigo con un usuario existente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const response = await api.post('/api/couple/code').set('Cookie', cookie)
    console.log('response', response)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  test('Pedir el codigo con un usuario que ya tiene un codigo', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const code = await api.post('/api/couple/code').set('Cookie', cookie)

    expect(code.status).toBe(201)
    expect(code.body).toHaveProperty('id')

    await api.post('/api/auth/logout')

    const loginResponse2 = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse2.headers['set-cookie']

    const validate = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: code.body.id })

    expect(validate.status).toBe(200)

    const response = await api.post('/api/couple/code').set('Cookie', cookie)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'User already has a couple')
  })
})

describe('validate couple', () => {
  test('validar una couple con un id invalido', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest3)
    cookie = loginResponse.headers['set-cookie']

    const response = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: '12345566' })
    expect(response.status).toBe(400)
  })

  test('validar couple con un codigo inexistente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest3)
    cookie = loginResponse.headers['set-cookie']

    const response = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: '692bc5d7f4eb5ed723b325ae' })
    expect(response.status).toBe(404)
  })

  test('validar couple que ya esta completa', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse.headers['set-cookie']

    const code = await api.post('/api/couple/code').set('Cookie', cookie)

    await api.post('/api/auth/logout')

    const loginResponse2 = await api.post('/api/auth/login').send(userTest3)

    cookie = loginResponse2.headers['set-cookie']

    const response = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: code.body.id })
    expect(response.status).toBe(400)
  })

  test('validar un codigo con un usuario que ya tiene pareja', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest3)

    cookie = loginResponse.headers['set-cookie']

    const code = await api.post('/api/couple/code').set('Cookie', cookie)

    await api.post('/api/auth/logout')

    const loginResponse2 = await api.post('/api/auth/login').send(userTest)

    cookie = loginResponse2.headers['set-cookie']

    const response = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: code.body.id })
    expect(response.status).toBe(200)
  })

  test('validar un codigo correctamente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest2)
    cookie = loginResponse.headers['set-cookie']

    const code = await api.post('/api/couple/code').set('Cookie', cookie)

    expect(code.status).toBe(201)
    expect(code.body.id).toBeDefined()

    await api.post('/api/auth/logout')

    const loginResponse2 = await api.post('/api/auth/login').send(userTest4)
    cookie = loginResponse2.headers['set-cookie']

    const response = await api
      .put('/api/couple/code/validate')
      .set('Cookie', cookie)
      .send({ id: code.body.id })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('users')
    expect(response.body.users).toHaveLength(2)
  })
})

describe('change name couple', () => {
  test('cambiar el nombre de una pareja por uno demasiado corto', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const user = await User.findOne({ email: userTest.email })

    const response = await api
      .put(`/api/couple/${user?.coupleId?.toString()}`)
      .set('Cookie', cookie)
      .send({ name: 'co' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })

  test('cambiar el nombre de una pareja correctamente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const user = await User.findOne({ email: userTest.email })
    const response = await api
      .put(`/api/couple/${user?.coupleId?.toString()}`)
      .set('Cookie', cookie)
      .send({ name: 'couple name' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('couple name')
  })
})

describe('get couple', () => {
  test('get a couple que no existe', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const response = await api
      .get('/api/couple/692bc5d7f4eb5ed723b326ae')
      .set('Cookie', cookie)
    expect(response.status).toBe(403)
  })

  test('get a couple correctamente', async () => {
    const loginResponse = await api.post('/api/auth/login').send(userTest)
    cookie = loginResponse.headers['set-cookie']

    const user = await User.findOne({ email: userTest.email })
    const response = await api
      .get(`/api/couple/${user?.coupleId?.toString()}`)
      .set('Cookie', cookie)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('users')
    expect(response.body.users).toHaveLength(2)
  })
})

afterEach(async () => {
  await api.post('/api/auth/logout')
})

afterAll(async () => {
  await mongoose.connection.close()
})
