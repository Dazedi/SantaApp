import * as Joi from "@hapi/joi";
import WishService from "../services/WishService";

interface ICreateWish {
  username: string;
  message: string;
}

interface IValidateResult<T> {
  error?: Joi.ValidationError,
  value: T
}

export default class WishController {
  public static createWish = async (req, res) => {
    const data = req.body;

    const schema = Joi.object().keys({
      username: Joi.string().required(),
      message: Joi.string().required()
    });

    const { value, error }: IValidateResult<ICreateWish> = Joi.compile(schema)
      .prefs({ errors: { label: 'key' } })
      .validate(data);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return res.status(400).json({
        status: 'error',
        message: errorMessage,
        data
      });
    }

    try {
      const result = await WishService.createWish(value);
      res.status(201).json({
        status: 'success',
        message: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err,
        data
      });
    }
  }
}
