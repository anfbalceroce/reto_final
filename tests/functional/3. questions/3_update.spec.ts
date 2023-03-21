import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('update question', async ({ client }) => {
  const token = await login();
  const response = await client.put('api/v1/questions/updateQuestion/1').header('Authorization', `Bearer ${token}`).json({
    "question": "¿que dia es hoy?"
  })
  response.assertStatus(200);
  response.assertBody({"state": true, "message": "Pregunta Editada con exito"});
})

test('fail update question does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.put('api/v1/questions/updateQuestion/100').header('Authorization', `Bearer ${token}`).json({
      "question": "¿que dia es hoy?"
    })
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al editar la pregunta"});
})