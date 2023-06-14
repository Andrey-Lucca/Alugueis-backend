//Onde vamos configurar nosso express -> Vamos utilizar em formato de classes

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import path from 'path'
import routes from './routes';

class App{ //Qunado app for instanciada (chamada em algum lugar) o método constructor
  //chamado automaticamente

  constructor(){
    this.server = express();
    mongoose.connect('conexaoMongo',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.middlewares();//Quando construtor for chamado, carregará middlewares e routes
    this.routes();
  }

  middlewares(){
    this.server.use(cors());//Permitindo qualquer usuário usar a api
    this.server.use(
      '/files', //criando uma rota de files
      //Criando uma rota estática
      express.static(path.resolve(__dirname, '..', 'uploads')) 
    )
    
    this.server.use(express.json()); //utilizaremos json
  }

  routes(){
    this.server.use(routes);
  }

}

export default new App().server; //Exportaremos o server 
