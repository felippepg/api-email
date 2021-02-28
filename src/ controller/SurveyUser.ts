import { Controller, Post } from '@overnightjs/core';
import { Request, response, Response } from 'express';
import { getCustomRepository } from "typeorm";
import SurveyRepository from '../repository/SurveyRepository';
import SurveyUserRepository from "../repository/SurveyUserRepository";
import UserRepository from '../repository/UserRepository';
import SendMailService from '../services/SendMailService';

@Controller('send')
class SendMailController {
    @Post()
    public async sendMail(req: Request, res: Response) {
       const { email, survey_id } = req.body;

       const userRepository = getCustomRepository(UserRepository);
       const surveyRepository = getCustomRepository(SurveyRepository);
       const surveyUserRepository = getCustomRepository(SurveyUserRepository);

       const userIsValid =  await userRepository.findOne({email: email})

        if(!userIsValid) {
            return res.status(400).json({
               error: 'User not found'
            })
        };
        const surveyIsValid = await surveyRepository.findOne({id: survey_id});

        if(!surveyIsValid) {
            return res.status(400).json({
                error: 'Survey not found'
            });
        };
        const surveyUser = await surveyUserRepository.create({
            survey_id, 
            user_id: userIsValid.id
        });
        surveyUserRepository.save(surveyUser);
        
        SendMailService.execute(email, surveyIsValid.title, surveyIsValid.description);
        res.status(201).json({
            success: true
        });
    }
}

export default new  SendMailController
