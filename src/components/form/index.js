import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from './style.js';

export default function Form(props) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    // Atualiza os estados com os dados do contato atual ao abrir o formulário
    useEffect(() => {
        if (props.contatoAtual) {
            setNome(props.contatoAtual.nome);
            setTelefone(props.contatoAtual.telefone);
            setEmail(props.contatoAtual.email);
        } else {
            // Limpa os campos caso não seja edição
            setNome('');
            setTelefone('');
            setEmail('');
        }
    }, [props.contatoAtual]);

    const handleSubmit = async () => {
        try {
            const contato = { nome, telefone, email };

            if (props.contatoAtual) {
                // Edita contato existente no backend
                const response = await fetch(`http://192.168.1.100:3000/contato/${props.contatoAtual.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contato),
                });

                if (!response.ok) {
                    throw new Error(`Erro ao editar contato: ${response.status}`);
                }

                const json = await response.json();
                props.atualizarContato(json.contato); // Atualiza o estado no Main
            } else {
                // Cria novo contato no backend
                await props.adicionarContato(contato);
            }

            // Limpa o formulário e fecha
            setNome('');
            setTelefone('');
            setEmail('');
            props.abrirForm(false);
        } catch (error) {
            console.error('Erro ao salvar o contato:', error.message);
        }
    };

    return (
        <View>
            <Text>Nome</Text>
            <TextInput
                style={styles.form}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <Text>Telefone</Text>
            <TextInput
                style={styles.form}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.form}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                <Text style={styles.textoBotao}>
                    {props.contatoAtual ? "Atualizar contato" : "Salvar contato"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
