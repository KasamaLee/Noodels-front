import Joi from 'joi';

const registerSchema = Joi.object({
    userName: Joi.string().trim().required(),
    email: Joi.string().trim().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password'))
        .trim()
        .required()
        .strip(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    address: Joi.string().trim().allow('')
})

export const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}

const ProfileSchema = Joi.object(
    {
        userName: Joi.string().trim().required(),
        email: Joi.string()
            .trim()
            .email({
                tlds: { allow: ['com', 'net'] }
            }),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).allow(''),
        address: Joi.string().trim().allow('')
    }
)

export const validateProfile = (input) => {
    const { error } = ProfileSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}

const PasswordSchema = Joi.object(
    {
        oldPassword: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword'))
            .trim()
            .required()
            .strip()
    }
)

export const validatePassword = (input) => {
    const { error } = PasswordSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}



