import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get all questions with options', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/form/getquestions').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBodyContains({
        "state": true,
        "questions": []
    });
})