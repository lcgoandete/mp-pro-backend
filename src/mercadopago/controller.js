const model = require('./model');

const payment = async (req, res) => {
  const { payer, product } = req.body;
  const result = await model.payment(payer, product);
  return res.status(200).json(result);
};

const notification = async (req, res) => {
  console.log(req.body);
  return res.status(200);
};

module.exports = {
  payment,
  notification,
};