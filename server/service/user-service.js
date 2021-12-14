const User = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const config = require('config');
const ApiError = require('../exeptions/api-error');
const fs = require('fs');

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest('An account with this email address already exists.');
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const activationLink = uuid.v4();

        const user = await User.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${config.get('clientUrl')}/auth/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate(activationLink) {

        const user = await User.findOne({activationLink:activationLink});
        if (!user) {
            throw ApiError.BadRequest('Error activation link');
        }

        user.isActivatedMail = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`We couldn't find an account with that email address.`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid email or password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async updatePassword(password, token) {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExp: {$gt: Date.now()}
        });

        if (!user)  throw ApiError.BadRequest('User not found');
        user.password = await bcrypt.hash(password, 12);
        user.resetToken = undefined;
        user.expireToken = undefined;
        await user.save();
    }
}

module.exports = new UserService();
