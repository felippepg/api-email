import { Controller, Get, Post } from '@overnightjs/core';
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

        // Envio de Email
        SendMailService.execute(email, surveyIsValid.title, surveyIsValid.description);


    }

    @Get('rating')
    public async saveReview(req: Request, res: Response) {

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);
        const queryRating = req.query.nota;
        const queryUser = req.query.nome;
        const queryTitle = req.query.titulo;

        if(queryTitle === undefined || queryRating === undefined) { 
            return res.send('Falhou');
        } else {
            const title = queryTitle.toString().replace("[^0-9a-zA-Z]+", "");
            const value = parseInt(queryRating.toString());

            const titleIsValid = await surveyRepository.findOne({title});
            if(titleIsValid) {
                const validSurvey =  await surveyUserRepository.findOne({survey_id:  titleIsValid?.id});
                if(validSurvey) {
                    validSurvey.value = value
                    surveyUserRepository.save(validSurvey);
                    res.send('Atualização efetuada com sucesso')
                }
            }
        }
    }



        // if(reqTitle || reqRating || reqUser) {

        //     const title = reqTitle.replace("[^0-9a-zA-Z]+", "");
        //     const name = reqUser.toString();
        //     const value = parseInt(reqRating); 

        //     const titleIsValid = await surveyRepository.findOne({title})
        //     const nameIsValid = await userRepository.findOne({name});

        //     if(titleIsValid || nameIsValid) {
        //        const validSurvey =  await surveyUserRepository.findOne({survey_id:  titleIsValid?.id});
        //        if(validSurvey) {
        //         validSurvey.value = value;
        //         res.send('Atualização efetuada com sucesso')

        //        }
        //     }

        // }


}

export default new  SendMailController
