const userService = require('../service/user-service');
const config = require('config');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error');
const crypto = require('crypto');

const mailService = require('../service/mail-service');
const User = require('../models/User');

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);

        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken)
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(config.get('clientUrl'));

        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json(userData);

        } catch (err) {
            next(err);
        }
    }

    reset(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }

            crypto.randomBytes(32, async (err, buffer) => {
                if (err) {
                    return next(ApiError.BadRequest('Somthing went wrong. Try again later.', errors.array()));
                }
                const {email} = req.body;
                const token = buffer.toString('hex');
                const candidate = await User.findOne({email});

                if (!candidate) {
                    return next(ApiError.BadRequest("We couldn't find an account with that email address.", errors.array()));
                }
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60*60*1000;
                await candidate.save();
                await mailService.resetPasswordMail(email, `${config.get('clientUrl')}/recover/${token}`);
                return res.json(candidate);
            });
        } catch (err) {
            next(err);
        }
    }

    async updatePassword(req, res, next) {
        try {
            const {token} = req.params;
            const {password} = req.body;

            if (!token) throw ApiError.BadRequest('User identification error');

            const userData = await userService.updatePassword(password, token);
            return res.json(userData);

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();

