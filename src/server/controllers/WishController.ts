import { User, UserProfile, Wish } from "../models";
import * as Joi from "@hapi/joi";
import { DateTime } from "luxon";

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

        const user = await User.getByUsername(value.username);
        if (!user) {
            return res.status(500).json({
                status: 'error',
                message: 'User not found',
                data
            });
        }

        const userProfile = await UserProfile.getByUid(user.uid);
        if (!userProfile) {
            return res.status(500).json({
                status: 'error',
                message: 'UserProfile not found',
                data
            });
        }

        // Birthdate is in YYYY/DD/MM format
        const birthdate = DateTime.fromFormat(userProfile.birthdate, 'yyyy/dd/MM');
        const now = DateTime.local();

        // Should be fine until just before they turn 11
        if (now >= birthdate.plus({ years: 11 })) {
            return res.status(500).json({
                status: 'error',
                message: 'User is more than 10 years old',
                data
            });
        }

        await Wish.createWish({
            username: user.username,
            address: userProfile.address,
            message: value.message
        });

        res.status(201).json({
            status: 'success',
            message: 'Wish was created successfully',

        })
    }
}