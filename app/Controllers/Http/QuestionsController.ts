import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';

export default class QuestionsController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json({"state": true,
                                "questions": await (await Question.query().where('state', true))
                                .map((question: Question) => {
                                  return {                                    
                                    question: question.question,
                                    id: question.id
                                  }
                                })
                                });
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al listar las preguntas"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const { question, options } = request.all();
      const newQuesiton = new Question();
      newQuesiton.question = question;
      newQuesiton.state = true;
      await newQuesiton.save();
      options.forEach(async (option: any) => {
        await Answer.create({answer: option.opcion, isCorrect: option.iscorrect, questionId: newQuesiton.id})
      });
      response.status(201).json({"state": true, "message": "Pregunta creada exitosamente"});    
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al crear la pregunta"});
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const questionModel = await Question.find(params.id);
      if (questionModel === null) {
        return response.status(404).json({"state": false, "message": "Error al editar la pregunta"});
      }
      const { question } = request.all();
      questionModel.question = question;
      await questionModel.save();
      response.status(200).json({"state": true, "message": "Pregunta Editada con exito"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al editar la pregunta"});      
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const question = await Question.find(params.id);
      if (question === null) {
        return response.status(404).json({"state": false, "message": "Error al eliminar la pregunta"});
      }
      question.state = false;
      await question.save();
      response.status(200).json({"state": true, "message": "Pregunta Eliminada con exito"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al eliminar la pregunta"});      
    }
  }

  public async getOptions({}: HttpContextContract) {}
}
