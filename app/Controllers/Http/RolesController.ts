import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json({"state": true, "roles": await Role.query().where('state', true)});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al listar los roles"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const {name} = request.all();
      const role = new Role();
      role.name = name;
      await role.save();
      response.status(201).json({"state": true, "message": "Rol creado exitosamente"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al crear el rol"});
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const role = await Role.findOrFail(params.id);
      role.state = false;
      await role.save();
      response.status(200).json({"state": true, "message": "Rol eliminado con exito"});      
    } catch (error) {
      console.log(error);
      response.status(404).json({"state": false, "message": "Error al eliminar el rol"});
    }
  }
}
