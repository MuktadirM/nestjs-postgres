import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./users.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){};
  
  getAll(): Promise<UserDTO[]> {
    return this.userRepo.find().then(items => items.map(e => UserDTO.fromEntity(e)));;
  }

  async update(id: string, user: UserDTO): Promise<UserDTO> {
    await this.userRepo.update(id, user);
    return await this.userRepo.findOne(id);
  }

  findOne(id: string): Promise<UserDTO> {
    return this.userRepo.findOne(id).then(e => UserDTO.fromEntity(e));
  }

  async create(user: UserDTO): Promise<UserDTO> {
    const e = await this.userRepo.save(await UserDTO.toEntity(user));
    return UserDTO.fromEntity(e);
  }

  delete(id: string): void {
    this.userRepo.delete(id);
  }

}