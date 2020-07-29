const User = require('../models/User');

class AuthController {
  async create(req, res, next) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos!' });

      if (!(await user.checkPassword(password)))
        return res.status(401).json({ message: 'Usuário ou senha inválidos!' });

      const token = user.generateToken();

      user = user.toJSON();

      delete user.password_hash;

      return res.status(200).json({
        user,
        token
      });
    } catch (err) {
      return res.status(400).json({ message: 'Ocorreu um erro!', err });
    }
  }
}

module.exports = new AuthController();
