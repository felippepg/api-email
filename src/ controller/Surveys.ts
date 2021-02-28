import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repository/SurveyRepository";

@Controller('survey')
class SurveyController  {

    @Post()
    public async create(req: Request, res: Response) {

        const { title, description } = req.body;
        const surveyRepository = getCustomRepository(SurveyRepository)

        const survey = surveyRepository.create({
            title, description
        })

        await surveyRepository.save(survey)

        res.send(survey.title)
    }

    @Get()
    public async test(req: Request, res: Response) {
        res.sendStatus(201)
    }
}

export default new SurveyController