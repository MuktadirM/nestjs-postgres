import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { User } from "../model/user.entity";
import * as bcrypt from 'bcrypt';
import { randomUUID } from "crypto";


export class UserDTO {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({required:false})
    createdAt: Date;

    @ApiProperty({required:false})
    updatedAt: Date;

    @ApiProperty({required:false})
    createdBy: string;

    @ApiProperty({required:false})
    deletedAt: Date;

    public static from(dto: Partial<UserDTO>) {
        const it = new UserDTO();
        it.id = dto.id;
        it.email = dto.email;
        it.name = dto.name;
        it.password = dto.password;
        it.createdAt = dto.createdAt;
        it.updatedAt = dto.updatedAt;
        it.createdBy = dto.createdBy;
        it.deletedAt = dto.deletedAt;
        return it;
    }

    public static fromEntity(entity: User) {
        return this.from({
            id: entity.id,
            email: entity.email,
            name: entity.name,
            password: entity.password,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            createdBy: entity.createdBy,
            deletedAt: entity.deletedAt
        });
    }

    public static async  toEntity(dto: Partial<UserDTO>, user: User = null) {
        const hased =  await bcrypt.hash(dto.password, 10)
        const it = new User();
        it.id = dto.id;
        it.email = dto.email;
        it.name = dto.name;
        it.password = hased;
        it.createdAt = new Date();
        it.updatedAt = new Date();
        it.createdBy = user ? user.id : null;
        return it;
    }
}

// const passwordInPlaintext = '12345678';
// const hash = await bcrypt.hash(passwordInPlaintext, 10);
 
// const isPasswordMatching = await bcrypt.compare(passwordInPlaintext, hashedPassword);
// console.log(isPasswordMatching); // true