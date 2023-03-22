import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';
import User from 'App/Models/User'
import bcryptjs from 'bcryptjs';

export default class TestsSeeder extends BaseSeeder {
  public static environment = ['test', 'testing'];
  public async run () {
    const salt = bcryptjs.genSaltSync();
    await User.create({
      firstName: "student",
      secondName: "student",
      surname: "student",
      secondSurname: "student",
      documentTypeId: 2,
      documentNumber: 2,
      email: "student",
      password: bcryptjs.hashSync("pass", salt),
      roleId: 2,
      phone: "2"
    });
    const question = new Question();
    question.question = "test question";
    await question.save();
    const options = [
      {
        "opcion": "correct answer",
        "iscorrect": true
      },
      {
        "opcion": "wrong answer 1",
        "iscorrect": false
      },
      {
        "opcion": "wrong answer 2",
        "iscorrect": false
      },
      {
        "opcion": "wrong answer 3",
        "iscorrect": false
      }
    ]
    options.forEach(async (option: any) => {
      await Answer.create({answer: option.opcion, isCorrect: option.iscorrect, questionId: question.id})
    });
  }
}
