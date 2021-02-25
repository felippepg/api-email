import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    public async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getRepository(User);

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user);
        res.send(user);
    }
}

export default new UserController 