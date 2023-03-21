import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentType from 'App/Models/DocumentType';

export default class DocumentTypesController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json(await DocumentType.all());
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const {name} = request.all();
      const docType = new DocumentType();
      docType.name = name;
      await docType.save();
      response.status(201).json(docType);
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }

  public async delete({ params, response}: HttpContextContract) {
    try {
      const docType = await DocumentType.find(params.id);
      if (docType === null) {
        response.status(404).json({"message": "Tipo de documento no encontrado"});
      } else {
        await docType.delete();
        response.status(204);
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({"message": "Error interno del servidor"});
    }
  }
}
