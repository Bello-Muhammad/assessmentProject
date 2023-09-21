import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'please enter correct email'})
    email: string;

}
