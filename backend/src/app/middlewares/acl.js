// const { User } = require('../models');

// module.exports = async (req, res, next) => {
//   const user = await User.findOne({ where: { id: req.userId } });

//   const { role } = user.dataValues;

//   if (role === 'admin') return next();

//   return res.status(401).send({ message: 'Usuário não authorizado para essa rota!' });
// };
