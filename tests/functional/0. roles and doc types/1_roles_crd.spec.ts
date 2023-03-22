import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { login } from '../TestLogin';

test('get all roles', async ({ client }) => {
    const token = await login();
    const response = await client.get('api/v1/roles').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBodyContains({
        "state": true,
        "roles": []
    });
})

test('create role', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/roles').header('Authorization', `Bearer ${token}`).json({
        "name": "test role"
    });
    response.assertStatus(201);
    response.assertBody({"state": true, "message": "Rol creado exitosamente"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})

test('fail create role no body', async ({ client }) => {
    const token = await login();
    const response = await client.post('api/v1/roles').header('Authorization', `Bearer ${token}`);
    response.assertStatus(400);
    response.assertBody({"state": false, "message": "Error al crear el rol"});
})

test('delete role', async ({ client }) => {
    const token = await login();
    const response = await client.delete('api/v1/roles/2').header('Authorization', `Bearer ${token}`);
    response.assertStatus(200);
    response.assertBody({"state": true, "message": "Rol eliminado con exito"});
}).setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
})

test('fail delete role does not exist', async ({ client }) => {
    const token = await login();
    const response = await client.delete('api/v1/roles/100').header('Authorization', `Bearer ${token}`);
    response.assertStatus(404);
    response.assertBody({"state": false, "message": "Error al eliminar el rol"});
})