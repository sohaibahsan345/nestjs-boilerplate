import { IsString, IsNotEmpty, IsEmail, IsLowercase, Matches, IsOptional, IsBoolean, ValidateIf } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password: string;

}

export class UpdateUserPasswordDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    is_verified_email?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    is_verified_phone?: boolean;

}

export class SignInDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}