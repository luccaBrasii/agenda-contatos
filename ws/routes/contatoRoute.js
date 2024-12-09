import express from "express";
import Contato from "../models/Contato.js";

const router = express.Router();

// Rota POST - Criar um contato
router.post('/', async (req, res) => {
    try {
        const contato = await new Contato(req.body).save();
        res.json({ contato });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

// Rota GET - Obter todos os contatos
router.get('/', async (req, res) => {
    try {
        const contatos = await Contato.find();
        console.log(contatos);
        res.json({ contatos });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

// Rota GET - Obter um contato pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const contato = await Contato.findById(id);

        if (!contato) {
            return res.status(404).json({ error: true, message: "Contato não encontrado" });
        }

        console.log('CONTATO:', contato);
        res.json({ contato });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

// Rota PUT - Atualizar um contato
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    try {
        const contatoAtualizado = await Contato.findByIdAndUpdate(
            id,
            { nome, email, telefone },
            { new: true }
        );

        if (!contatoAtualizado) {
            return res.status(404).json({ error: true, message: "Contato não encontrado" });
        }

        res.json({ error: false, contato: contatoAtualizado });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

// Rota DELETE - Deletar um contato
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const contatoDeletado = await Contato.findByIdAndDelete(id);

        if (!contatoDeletado) {
            return res.status(404).json({ error: true, message: "Contato não encontrado" });
        }

        res.json({ error: false, message: "Contato deletado com sucesso", contato: contatoDeletado });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

export default router;
