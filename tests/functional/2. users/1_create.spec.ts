import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('create user', async ({ client }) => {
  const token = await login();
  const response = await client.post('api/v1/user/create').header('Authorization', `Bearer ${token}`).json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co",
    "password": "32jdkdi",
    "rol":2,
    "phone": "32123122314"
  })
  response.assertStatus(201);
  response.assertBody({"state": true, "message": "Estudiante creado correctamente"});
})

test('fail create user email exists', async ({ client }) => {
  const token = await login();
  const response = await client.post('api/v1/user/create').header('Authorization', `Bearer ${token}`).json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co",
    "password": "32jdkdi",
    "rol":2,
    "phone": "32123122314"
  })
  response.assertStatus(400);
  response.assertBody({"state": false, "message": "Fallo en la creación del estudiante"});
})

test('fail create user no body', async ({ client }) => {
  const token = await login();
  const response = await client.post('api/v1/user/create').header('Authorization', `Bearer ${token}`);
  response.assertStatus(400);
  response.assertBody({"state": false, "message": "Fallo en la creación del estudiante"});
})

test('forbidden access with student role', async ({ client }) => {
  const token = await login('danielc88@gmail.co', '32jdkdi');
  const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`);
  response.assertStatus(403);
  response.assertBody({"state": false, "message": "Forbidden"});
})

