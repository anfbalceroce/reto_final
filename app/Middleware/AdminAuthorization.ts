import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationController from 'App/Controllers/Http/AuthenticationController';

export default class AdminAuthorization {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = request.header('authorization')!;
    try {
      const {role} = await AuthenticationController.getPayload(authorizationHeader);
      if (role !== 1) {
        return response.status(403).json({ "state": false, "message": 'Forbidden' });
      }
      await next();
    } catch (error) {
      console.log(error);
      return response.status(500).json({ "state": false, "message": '"message": "Error interno del servidor"' });      
    }
  }
}
