import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get all students no filter', async ({ client }) => {
  const token = await login();
  const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`);
  response.assertStatus(200)
  response.assertBodyContains({
    "state": true,
    "message": "Listado de estudiantes"
  })
})

test('get all students with filter', async ({ client }) => {
  const token = await login();
  const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`).json({
    "perPage": 10,
    "page": 1,
    "filter": {
        "name": ""
    }
  });
  response.assertStatus(200)
  response.assertBodyContains({
    "state": true,
    "message": "Listado de estudiantes"
  })
})