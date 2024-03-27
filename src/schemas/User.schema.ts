import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings } from './UserSettings.schema';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  // provide ref of UserSettings schema
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
