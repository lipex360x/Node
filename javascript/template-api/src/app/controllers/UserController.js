import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    return res.json({ index: true });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }

    const { name, email, password } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      return res.status(401).json({ error: 'user already exists' });
    }

    const { id } = await User.create({
      name,
      email,
      password,
    });

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),

      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPass(oldPassword))) {
      return res.status(400).json({ error: 'Password does not Match' });
    }

    await user.update(req.body);

    const { id, name } = user;

    return res.json({ id, name, email });
  }
}

export default new UserController();