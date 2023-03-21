import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import bcryptjs from 'bcryptjs';

export default class UsersController {
  public async index({ request, response,  }: HttpContextContract) {
    try {      
      const perPage = request.input('perPage', 1);
      const page = request.input('page', 10);
      const filter = request.input('filter');
      console.log(filter);      
      // WIP: query only students and use filter
      const results = await User.query().paginate(page, perPage);

      response.status(200).json({"state": true,
                                "message": "Listado de estudiantes",
                                "users": results.all()});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Fallo en el listado de estudiantes"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const {firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, password, rol, phone} = request.all();
      const emailExists = await User.findBy('email', email);
      if (emailExists) {
        return response.status(500).json({"state": false, "message": "Fallo en la creación del estudiante"});
      }
      const salt = bcryptjs.genSaltSync();
      const user = new User();
      user.firstName = firstName;
      user.secondName = secondName;
      user.surname = surname;
      user.secondSurname = secondSurName;
      user.documentTypeId = typeDocument;
      user.documentNumber = documentNumber;
      user.email = email;
      user.password = bcryptjs.hashSync(password, salt);
      user.roleId = rol;
      user.phone = phone;
      user.state = true;
      await user.save();
      response.status(201).json({"state": true, "message": "Estudiante creado correctamente"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Fallo en la creación del estudiante"});
    }
  }

  public async update({ params, request, response}: HttpContextContract) {
    try {
      const user = await User.find(params.id);      
      if (user === null) {
        return response.status(404).json({"state": false, "message": "Error al actualizar"});
      }
      const {firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, phone} = request.all();
      user.firstName = firstName;
      user.secondName = secondName;
      user.surname = surname;
      user.secondSurname = secondSurName;
      user.documentTypeId = typeDocument;
      user.documentNumber = documentNumber;
      user.email = email;
      user.phone = phone;
      await user.save();
      response.status(200).json({"state": true, "message": "Se actualizo correctamente"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al actualizar"});
    }
  }

  public async get({ params, response }: HttpContextContract) {
    try {
      response.status(200).json(await User.find(params.id));
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al consultar el detalle del usuario"});
    }
  }
}
