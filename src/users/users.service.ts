import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@Injectable()
export class UserService {
  // Through this InjectModel we make the Collection in mongodb database
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private UserSettingsModel: Model<UserSettings>,
  ) {}

  // take properties out of an object
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      // One to One releationship
      const newSettings = new this.UserSettingsModel(settings);
      const saveNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
