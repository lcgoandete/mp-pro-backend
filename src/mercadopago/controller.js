const model = require('./model');

const payment = async (req, res) => {
  const { payer, product } = req.body;
  const result = await model.payment(payer, product);
  return res.status(200).json(result);
};

module.exports = { payment };