const { User } = require("../models/user");

const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Ese usuario ya existe");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();
  const jwtToken = user.generateJWT();
  res.status(200).send({ jwtToken });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("Usuario o contraseña son incorrectos");

  if (user.password !== req.body.password)
    return res.status(400).send("Usuario o contraseña son incorrectos");

  const jwtToken = user.generateJWT();
  res.status(200).send({ jwtToken });
};

module.exports = { register, login };
