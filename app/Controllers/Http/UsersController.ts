import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Env from '@ioc:Adonis/Core/Env';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json({"state": true, "message": "Listado de estudiantes", "users": await User.all()});
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

  public async login({ request, response }: HttpContextContract){
    try {
      const email = request.input('email');
      const password = request.input('password');
      const user = await User.findBy('email', email);
      if(user === null){
        return response.status(400).json({"state": false, "message": "contraseña o email invalido"});
      }
      const validPassword = bcryptjs.compareSync( password, user.password );
      if ( !validPassword ) {
        return response.status(400).json({"state": false, "message": "contraseña o email invalido"});
      }

      const payload = {
        'id': user.id,
        'role': user.roleId
      }
      const token: string = this.generateToken(payload);
      await user?.load('role');
      response.append('Authorization', token).status(200).json({
        "state": true,
        "id": user.id,
        "name": user.firstName+" "+user.secondName+" "+user.surname+" "+user.secondSurname, "role": user.role.name,
        "message": "Ingreso exitoso"});
    } catch (error) {
      console.log(error);      
      response.status(400).json({"state": false, "message": "contraseña o email invalido"});
    }
  }

  public generateToken(payload: object):string{
    const options = {
      expiresIn: "10 mins"
    }
    return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), options);
  }

  public verifyToken(authorizationHeader: string){
    let token = authorizationHeader.split(' ')[1];
    jwt.verify(token, Env.get('JWT_SECRET_KEY'), ( error )=>{
        if(error){
            throw new Error("Token verify error");            
        }
    })
    return true;
  }
  
  public getPayload(authorizationHeader: string) {
    let token = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload;
    console.log(payload);
    return payload;
  }

  public async delete({ params, response}: HttpContextContract) {
    try {
      const user = await User.find(params.id);
      if (user === null) {
        response.status(404).json({"state": true, "message": "Estudiante creado correctamente"});
      } else {
        await user.delete();
        response.status(204);
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": true, "message": "Estudiante creado correctamente"});
    }
  }
}
