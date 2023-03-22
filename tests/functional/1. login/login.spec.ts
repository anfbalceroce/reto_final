import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('login', async ({ client }) => {
  const response = await client.post('api/v1/login').json({
    "email": "admin",
    "password": "pass"
  })
  response.assertStatus(200);
  response.assertBodyContains({
    "state": true,
    "message": "Ingreso exitoso"});
})

test('fail login wrong password', async ({ client }) => {
  const response = await client.post('api/v1/login').json({
    "email": "admin",
    "password": "passs"
  })
  response.assertStatus(400);
  response.assertBody({
    "state": false,
    "message": "contraseña o email invalido"});
})

test('fail login wrong email', async ({ client }) => {
  const response = await client.post('api/v1/login').json({
    "email": "adminn",
    "password": "pass"
  })
  response.assertStatus(400);
  response.assertBody({
    "state": false,
    "message": "contraseña o email invalido"});
})

test('fail authorization wrong token', async ({ client }) => {
  const token = 'wrong token';
  const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`);
  response.assertStatus(401);
  response.assertBody({"state": false, "message": "Unauthorized"});
})

test('fail authorization no token', async ({ client }) => {
  const response = await client.get('api/v1/user/getUsers');
  response.assertStatus(401);
  response.assertBody({"state": false, "message": "Unauthorized"});
})

test('forbidden access with student role', async ({ client }) => {
  const token = await login('student', 'pass');
  const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`);
  response.assertStatus(403);
  response.assertBody({"state": false, "message": "Forbidden"});
})
