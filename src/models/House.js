import {Schema, model} from 'mongoose';

const HouseSchema = new Schema({
  thumbnail: String, 
  price: Number,
  location: String,
  description: String,
  status: Boolean,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
    toJSON:{
      virtuals: true //deixando nosso virtual como true
    }
});

HouseSchema.virtual('thumbnail_url').get(function(){
  return `http://localhost:3333/files/${this.thumbnail}` 
  //Criando um virtual para mostrar a url na requisição
})

export default model('House', HouseSchema) //export arquivo user e nosso UserSchema