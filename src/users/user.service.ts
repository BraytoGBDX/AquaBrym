// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  createUser(
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole = UserRole.USER,
  ): Promise<User> {
    const u = this.userRepo.create({
      email,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName,
      role,
    });
    return this.userRepo.save(u);
  }
async findByEmail(email: string): Promise<User> {
  const user = await this.userRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error('Usuario no encontrado');
    // o podrías lanzar un HttpException(404) en un controller, etc.
  }
  return user;
}


  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
