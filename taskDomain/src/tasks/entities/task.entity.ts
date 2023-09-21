import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project: string;

    @Column()
    task: string;

    @Column({ type: 'date' })
    deadline: string;

    @Column()
    notification: string;
}

