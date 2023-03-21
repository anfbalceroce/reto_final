import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default class FormsController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json({
        "state": true,
        "questions": await (await Question.query().where('state', true).preload('answers'))
        .map((question: Question) => {
          return {                                    
            question: question.question,
            id: question.id,
            options: question.answers.map((answer: Answer) => {
              return {
                id: answer.id,
                option: answer.answer
              }
            })
          }
        })
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al obtener el listado"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const { estudianteId, answers } = request.all();
      await User.findOrFail(estudianteId);
      for (const answer of answers) {
        await Answer.findOrFail(answer);
      }
      answers.forEach(async (answer: number) => {
        await Form.create({studentId: estudianteId, answerId: answer, state: true});
      });
      response.status(201).json({"state": true, "message": "Respuestas almacenadas con exito"});
    } catch (error) {
      console.log(error);
      response.status(404).json({"state": false, "message": "No se pudieron almacenar las respuestas"});
    }
  }
}
