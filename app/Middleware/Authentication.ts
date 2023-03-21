import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationController from 'App/Controllers/Http/AuthenticationController';

export default class Authentication {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = request.header('authorization');
    if (authorizationHeader === undefined) {
      return response.status(401).json({ "state": false, "message": 'Unauthorized' });
    }
    try {
      AuthenticationController.verifyToken(authorizationHeader);
      await next();
    } catch (error) {
      console.log(error);
      return response.status(401).json({ "state": false, "message": 'Unauthorized' });      
    }
  }
}
