import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('delete question', async ({ client }) => {
  const token = await login();
  const response = await client.delete('api/v1/questions/deleteQuestion/1').header('Authorization', `Bearer ${token}`);
  response.assertStatus(200);
  response.assertBody({"state": true, "message": "Pregunta Eliminada con exito"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})

test('fail delete question does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.delete('api/v1/questions/deleteQuestion/100').header('Authorization', `Bearer ${token}`);
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al eliminar la pregunta"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})