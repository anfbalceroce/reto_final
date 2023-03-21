import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import bcryptjs from 'bcryptjs';

export default class UserSeeder extends BaseSeeder {
  public async run () {
    const salt = bcryptjs.genSaltSync();
    await User.create({
      firstName: "admin",
      secondName: "admin",
      surname: "admin",
      secondSurname: "admin",
      documentTypeId: 1,
      documentNumber: 1,
      email: "admin",
      password: bcryptjs.hashSync("pass", salt),
      roleId:1,
      phone: "1"
    });
  }
}
