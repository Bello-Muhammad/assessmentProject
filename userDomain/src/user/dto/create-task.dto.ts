import { IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {

    @IsNotEmpty({ message: 'please provide project title'})
    @IsString()
    project: string;

    @IsNotEmpty()
    @IsString()
    task: string;

    @IsNotEmpty({ message: 'please provide deadline date in this format yyyy-mm-dd'})
    deadline: string; //show be recieved in this format yyyy-mm-dd

    @IsNotEmpty({ message: 'please provide notification message'})
    @IsString()
    notification: string;
}
