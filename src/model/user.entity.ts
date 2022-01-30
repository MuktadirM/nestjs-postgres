import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users')
export class User extends BaseEntity{
    @Column({ type: 'varchar', length: 300 })
    name: string;
    @Column({ type: 'varchar', length: 300 })
    email: string;
    @Column({ type: 'varchar', length: 300 })
    password: string;
}