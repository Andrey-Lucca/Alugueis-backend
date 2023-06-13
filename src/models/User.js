import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  email: String, //fazendo nossa aplicação ter um campo email

});

export default model('User', UserSchema) //export arquivo user e nosso UserSchema