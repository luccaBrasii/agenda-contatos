import mongoose from "mongoose";

const URI = 'mongodb+srv://luccabrasies:KksK8dIxngpVsjKs@agendamentos.zw0tk.mongodb.net/agendamentos';

const connectDatabase = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB is Up!");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    process.exit(1); // Finaliza o processo se a conexão falhar
  }
};


export default connectDatabase
