import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('register answers', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/form/postquestions').header('Authorization', `Bearer ${token}`).json({
        "estudianteId": 2,
        "answers": [4, 1, 3]
    });
    response.assertStatus(201);
    response.assertBody({"state": true, "message": "Respuestas almacenadas con exito"});
})

test('fail register answers does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/form/postquestions').header('Authorization', `Bearer ${token}`).json({
        "estudianteId": 2,
        "answers": [100, 1, 3]
    });
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "No se pudieron almacenar las respuestas"});
})

test('fail register answers student does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/form/postquestions').header('Authorization', `Bearer ${token}`).json({
        "estudianteId": 100,
        "answers": [4, 1, 3]
    });
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "No se pudieron almacenar las respuestas"});
})