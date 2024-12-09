import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contatoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Contato = mongoose.model('Contato', contatoSchema);

export default Contato
