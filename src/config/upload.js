import multer from "multer";
import path from 'path'

export default {
  storage: multer.diskStorage(
    {
      destination: path.resolve(__dirname, '..', '..', 'uploads'),//caminho que quero que fique armazenado
      filename: (req, file, cb) =>{//req e file nome arquivo ext tamanho, e cb chamado aposmanip img
        const ext = path.extname(file.originalname); //evitar arquivos iguais
        const name = path.basename(file.originalname, ext);

        cb(null, `${name}-${Date.now()}${ext}`)
      },
    }
  )//to falando que vou armazenar a foto requisição aqui no projeto
  
}