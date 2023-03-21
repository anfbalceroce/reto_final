import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DocumentType from 'App/Models/DocumentType'

export default class DocumentTypeSeeder extends BaseSeeder {
  public async run () {
    await DocumentType.createMany([
      {
        name: "Cédula"
      },
      {
        name: "Tarjeta de identidad"
      },
      {
        name: "Pasaporte"
      }
    ]);
  }
}
