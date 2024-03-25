import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateProfileDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, { message: 'Only lowercase and uppercase characters are allowed' })
    first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, { message: 'Only lowercase and uppercase characters are allowed' })
    last_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\+?966)([1-9]\d{8})$/, { message: 'Enter valid Saudi Phone Number' })
    phone: string;

}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

    @ApiProperty()
    @IsString()
    @IsOptional()
    status: string;

}