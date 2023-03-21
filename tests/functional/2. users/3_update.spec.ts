import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('update user', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/user/update/2').header('Authorization', `Bearer ${token}`).json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co",
    "phone": "32123122314"
  });
  response.assertStatus(200);
    response.assertBody({"state": true, "message": "Se actualizo correctamente"});
})

test('fail update user does not exist', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/user/update/100').header('Authorization', `Bearer ${token}`).json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co",
    "phone": "32123122314"
    });
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al actualizar"});
})