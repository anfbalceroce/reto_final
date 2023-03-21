import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get all questions', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/questions/getQuestions').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBodyContains({"state": true, "questions": []});
})