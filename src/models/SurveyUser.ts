import { Column, Entity, EntityRepository, PrimaryGeneratedColumn } from "typeorm";

@Entity('survey_users')
export class SurveyUser {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public user_id: number;

    @Column()
    public survey_id: number;

    @Column()
    public value: number;
}
