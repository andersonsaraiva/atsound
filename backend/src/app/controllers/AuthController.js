const { User } = require('../models');

class AuthController {
  async create(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos' });

      if (!(await user.checkPassword(password))) return res.status(401).json({ message: 'Senha incorreta!' });

      return res.status(200).json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json({ message: 'Ocorreu um erro!' });
    }
  }
}

module.exports = new AuthController();
