import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController{

  async index (req, res){
    const {status} = req.query;//Pegando o estado mandado no query

    const houses = await House.find({status}) //Achando o status:status, logo 
    //podemos apenas usar status apenas - Ele vai procurar casas que tiverem
    //com o que passamos

    return res.json(houses)
  }

  async store(req, res){

    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required()
    })

    //pegando valores das variaveis
    const {filename} = req.file;
    const {description, price, location, status} = req.body;
    const {user_id} = req.headers;

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: "Falha na validação"})
    }

    const house = await House.create({
      //Criando campo que irá a casa
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    });

    return res.json(house);
  }

  async update(req, res){

    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required()
    })

    const { filename } = req.file;
    const { house_id } = req.params;
    const {description, price, location, status} = req.body;
    const {user_id} = req.headers;

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: "Falha na validação"})
    }

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json({error: 'Acesso negado'});
      //verifica se o id do usuario fazendo a requisição é o mesmo 
      //o id do usuario que cadastrou a casa, se não for, ele bloqueia
    }

      await House.updateOne({ _id: house_id},{
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    })
    return res.send()
  }

  async destroy(req, res){
    const { house_id } = req.body;
    

    await House.findByIdAndDelete({_id: house_id});

    return res.json({message: 'Deletado com sucesso'})
    
  }
}

export default new HouseController();