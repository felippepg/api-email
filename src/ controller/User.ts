import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repository/UserRepository';

@Controller('users')
class UserController {

    @Post()
    public async create(req: Request, res: Response) {
        const { name, email } = req.body;
        const userRepository = getCustomRepository(UserRepository)
        
        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user);
        res.send(user);
    }

}

export default new UserController 