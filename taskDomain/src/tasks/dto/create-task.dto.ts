import { IsNotEmpty, IsString, IsDate } from "class-validator"

export class CreateTaskDto {

    @IsNotEmpty({ message: 'please provide project title'})
    @IsString()
    project: string;

    @IsNotEmpty()
    @IsString()
    task: string;

    @IsNotEmpty({ message: 'please provide deadline date in this format yyyy-mm-dd'})
    deadline: string; //show be recieved in this format yyyy-mm-dd

    @IsNotEmpty()
    @IsString()
    notification: string;
}
