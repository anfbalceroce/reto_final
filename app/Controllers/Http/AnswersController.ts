import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';

export default class AnswersController {
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const answer = await Answer.findOrFail(params.id);
      const { opcion, iscorrect } = request.all();
      answer.answer = opcion;
      answer.isCorrect = iscorrect;
      await answer.save();
      response.status(200).json({"state": true, "message": "opcion Editada con exito"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al editar la opcion"});      
    }
  }
}
