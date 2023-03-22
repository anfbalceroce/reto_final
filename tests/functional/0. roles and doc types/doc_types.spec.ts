import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get all doc types', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/document-types').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBodyContains({
        "state": true,
        "document types": []
    });
})

test('create doc type', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/document-types').header('Authorization', `Bearer ${token}`).json({
        "name": "test doc type"
    });
    response.assertStatus(201);
    response.assertBody({"state": true, "message": "Tipo de documento creado exitosamente"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})

test('fail create doc type no body', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/document-types').header('Authorization', `Bearer ${token}`);
    response.assertStatus(400);
    response.assertBody({"state": false, "message": "Error al crear el tipo de documento"});
})

test('delete doc type', async ({ client }) => {
    const token = await login();
    const response = await client.delete('api/v1/document-types/3').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBody({"state": true, "message": "Tipo de documento eliminado con exito"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})

test('fail delete doc type does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.delete('api/v1/document-types/100').header('Authorization', `Bearer ${token}`);
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al eliminar el tipo de documento"});
})