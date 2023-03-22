import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('update user', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/user/update/2').header('Authorization', `Bearer ${token}`).json({
    "firstName": "update",
    "secondName": "update",
    "surname": "update",
    "secondSurName": "update",
    "typeDocument": 1,
    "documentNumber": "3",
    "email": "update",
    "phone": "3"
  });
  response.assertStatus(200);
  response.assertBody({"state": true, "message": "Se actualizo correctamente"});
}).setup(async () => {
  await Database.beginGlobalTransaction();
  return () => Database.rollbackGlobalTransaction();
})

test('fail update user does not exist', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/user/update/100').header('Authorization', `Bearer ${token}`).json({
    "firstName": "update",
    "secondName": "update",
    "surname": "update",
    "secondSurName": "update",
    "typeDocument": 1,
    "documentNumber": "3",
    "email": "update",
    "phone": "3"
  });
  response.assertStatus(404);
  response.assertBody({"state": false, "message": "Error al actualizar"});
})