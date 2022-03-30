const Joi = require("joi");
const userId_pattern = /^[a-z|A-Z|0-9]+$/;

module.exports = async (req, res, next) => {
  const PostUserSchema = Joi.object({
    email: Joi.string().min(3).pattern(new RegExp(userId_pattern)).required().error(new Error("3 or more letters in English and numbers only.")),
    nickname: Joi.string().required().error(new Error("Please enter It!")),
    password: Joi.string().min(4).required().error(new Error("Please enter at least 4 characters!!")),
    confirmPassword: Joi.valid(Joi.ref("password")).required().error(new Error("The passwords do not match!!")),
  });
  try {
    await PostUserSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).send({
      Message: e.message,
    });
    return;
  }
};
