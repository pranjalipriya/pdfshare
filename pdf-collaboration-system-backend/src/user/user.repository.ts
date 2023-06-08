import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.model';


@Injectable()
export class UserRepository {
constructor(@InjectModel(User.name) private userModel: Model<User>) {}
async createUser(data:any) {
const user = new this.userModel({ ...data });
await user.save();
return user;
}

async getAll() {
return this.userModel.find();
}

async getUserByEmail(email: string) {
 const user=this.userModel.findOne({ email });
 return user
}

async savePdfLink(id: string, link: string) {
return this.userModel.findOneAndUpdate(
{ userId: id },
{ $push: { links: link } },
{ new: true }
);
}
}
