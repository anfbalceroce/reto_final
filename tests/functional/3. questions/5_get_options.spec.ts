import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get question options', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/questions/getOptions/1').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBodyContains({
        "state": true,
        "message": "Listado de opciones",
        "options": []
    });
})

test('fail get question options does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/questions/getOptions/100').header('Authorization', `Bearer ${token}`);
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al obtener el listado de opciones"});
})