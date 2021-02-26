import { Server } from '@overnightjs/core';
import express from 'express';
import UserController from '../ controller/User';

class ServerConfig extends Server {

    constructor(public port = 3000) {
        super()
    }

    public init(): void {
        this.middlewares();
        this.setupController();
        this.app.listen(this.port, ()=> {
            console.log('running server on port: ' + this.port)
        })
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}))
    }

    private setupController(): void {
        this.addControllers([UserController]);
    }
}

export default ServerConfig