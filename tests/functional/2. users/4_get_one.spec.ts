import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get one user', async ({ client }) => {
  const token = await login();
  const response = await client.get('api/v1/user/getUser/2').header('Authorization', `Bearer ${token}`);
  response.assertStatus(200)
  response.hasBody()
})

test('fail get one user does not exist', async ({ client }) => {
  const token = await login();
  const response = await client.get('api/v1/user/getUser/100').header('Authorization', `Bearer ${token}`);
  response.assertStatus(404);
  response.assertBody({"state": false, "message": "Error al consultar el detalle del usuario"});
})