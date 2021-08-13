import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateUser(email: string, user: User): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { email: email },
        user,
        {
          new: true,
        },
      );
      return updatedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
