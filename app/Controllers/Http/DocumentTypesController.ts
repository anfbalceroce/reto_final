import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentType from 'App/Models/DocumentType';

export default class DocumentTypesController {
  public async index({ response }: HttpContextContract) {
    try {
      response.status(200).json({"state": true, "document types": await DocumentType.query().where('state', true)});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al listar los tipos de documento"});
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const {name} = request.all();
      const docType = new DocumentType();
      docType.name = name;
      await docType.save();
      response.status(201).json({"state": true, "message": "Tipo de documento creado exitosamente"});
    } catch (error) {
      console.log(error);
      response.status(500).json({"state": false, "message": "Error al crear el tipo de documento"});
    }
  }

  public async delete({ params, response}: HttpContextContract) {
    try {
      const docType = await DocumentType.findOrFail(params.id);
      docType.state = false;
      await docType.save();
      response.status(200).json({"state": true, "message": "Tipo de documento eliminado con exito"});;      
    } catch (error) {
      console.log(error);
      response.status(404).json({"state": false, "message": "Error al eliminar el tipo de documento"});
    }
  }
}
