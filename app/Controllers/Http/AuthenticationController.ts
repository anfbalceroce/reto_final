import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from 'App/Models/User';

export default class AuthenticationController {
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
        expiresIn: "120 mins"
      }
      return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), options);
    }
  
  public static verifyToken(authorizationHeader: string){
    let token = authorizationHeader.split(' ')[1];
    jwt.verify(token, Env.get('JWT_SECRET_KEY'), ( error )=>{
      if(error){
        throw error;
      }
    })
    return true;
  }
      
  public static getPayload(authorizationHeader:  string) {
    let token = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload;
    return payload;
  }
}
