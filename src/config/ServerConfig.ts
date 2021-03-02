import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import UserController from '../ controller/User';
import SurveyController from '../ controller/Surveys';
import SurveyUserContrller from '../ controller/SurveyUser';

class ServerConfig extends Server {

    constructor(public port = 3000) {
        super()
    }

    public init(): void {
        this.middlewares();
        this.setupController();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        })
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}))
        this.app.use('/teste/', (req, res) => {
            let rating = req.query.titulo?.toString();
            if(rating) {
                res.send(rating.replace("[^0-9a-zA-Z]+", ""))
            }
        })
    }

    private setupController(): void {
        this.addControllers([
            UserController, 
            SurveyController,
            SurveyUserContrller
        ]);
    }

    public getApplication(): Application {
        return this.app
    }
}

export default  ServerConfig