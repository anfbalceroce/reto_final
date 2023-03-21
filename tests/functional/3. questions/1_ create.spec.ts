import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('create question', async ({ client }) => {
  const token = await login();
  const response = await client.post('api/v1/questions/create').header('Authorization', `Bearer ${token}`).json({
    "question": "¿que dia es hoy?",
    "options": [
        {
            "opcion": "esta es correcta",
            "iscorrect": true
        },
        {
            "opcion": "incorrecta",
            "iscorrect": false
        },
        {
            "opcion": "incorrecta",
            "iscorrect": false
        },
        {
            "opcion": "incorrecta",
            "iscorrect": false
        }
    ]
})
  response.assertStatus(201);
  response.assertBody({"state": true, "message": "Pregunta creada exitosamente"});
})

test('fail create question no body', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/questions/create').header('Authorization', `Bearer ${token}`);
    response.assertStatus(400);
    response.assertBody({"state": false, "message": "Error al crear la pregunta"});
})