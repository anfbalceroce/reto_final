import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('update answer', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/questions/updateAnswer/1').header('Authorization', `Bearer ${token}`).json({
    "opcion": "correcta",
    "iscorrect": true
  });
  response.assertStatus(200);
  response.assertBody({"state": true, "message": "opcion Editada con exito"});
})

test('fail update answer does not exist', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/questions/updateAnswer/100').header('Authorization', `Bearer ${token}`).json({
    "opcion": "correcta",
    "iscorrect": true
  });
  response.assertStatus(404);
  response.assertBody({"state": false, "message": "Error al editar la opcion"});
})