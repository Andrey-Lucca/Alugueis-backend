import {Schema, model} from 'mongoose';

const ReserveSchema = new Schema({
  date: String, 
  user: {
    type: Schema.Types.ObjectId, //Pegando o usuário de referencia, mais especifi
    //camente seu id
    ref: 'User'
  },
  house:{
    type: Schema.Types.ObjectId, //Pegando id casa de referencia
    ref: 'House'
  }

});

export default model('Reserve', ReserveSchema) 