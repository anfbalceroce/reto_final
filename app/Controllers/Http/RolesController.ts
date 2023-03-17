import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json(await Role.all());
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const {name} = request.all();
      const role = new Role();
      role.name = name;
      role.state = true;
      await role.save();
      response.status(201).json(role);
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }

  public async delete({ params, response}: HttpContextContract) {
    try {
      const role = await Role.find(params.id);
      if (role === null) {
        response.status(404).json({"message": "Perfil no encontrado"});
      } else {
        await role.delete();
        response.status(204);
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }
}
