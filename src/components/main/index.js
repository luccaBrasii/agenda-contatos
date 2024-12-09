import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./style.js";
import Form from "../form/index.js";
import Botao from "../botao";
import Contact from "../contact/index.js";

export default function Main() {
    const [abrirForm, setAbrirForm] = useState(false);
    const [contatos, setContatos] = useState([]); // Estado para armazenar os contatos
    const [loading, setLoading] = useState(true); // Estado para gerenciar carregamento
    const [contatoAtual, setContatoAtual] = useState(null);
    const removerContato = (id) => {
        setContatos((prevContatos) => prevContatos.filter((contato) => contato._id !== id));
    };
    


    // Função para buscar os dados do backend
    const fetchContatos = async () => {
        try {
            const response = await fetch("http://192.168.1.100:3000/contato"); // Substitua pelo IP correto
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            const data = await response.json();
            setContatos(data.contatos); // Acessar a chave "contatos"
        } catch (error) {
            console.error("Erro ao buscar contatos:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Função para adicionar um novo contato
    const adicionarContato = async (novoContato) => {
        try {
            const response = await fetch("http://192.168.1.100:3000/contato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoContato),
            });

            if (!response.ok) {
                throw new Error(`Erro ao salvar contato: ${response.status}`);
            }

            const json = await response.json();
            setContatos((prevContatos) => [...prevContatos, json.contato]); // Atualiza a lista localmente
        } catch (error) {
            console.error("Erro ao salvar o contato:", error.message);
        }
    };

    const atualizarContato = (contatoAtualizado) => {
        setContatos((prevContatos) =>
            prevContatos.map((contato) =>
                contato._id === contatoAtualizado._id ? contatoAtualizado : contato
            )
        );
    };
    
    

    // UseEffect para buscar os dados na montagem do componente
    useEffect(() => {
        fetchContatos();
    }, []);

    return (
        <View style={styles.form}>
            {abrirForm ? (
                <View>
                    <Form
                        abrirForm={setAbrirForm}
                        adicionarContato={adicionarContato}
                        contatoAtual={contatoAtual}
                        atualizarContato={atualizarContato} // Passa a função de atualização
                    />

                    <Botao 
                        texto="Voltar" 
                        id="2" 
                        abrirForm={setAbrirForm} 
                    />
                </View>
            ) : (
                <View>
                    <Botao texto="Adicionar contato" 
                        id="1" 
                        abrirForm={setAbrirForm} 
                        contatoAtual = {setContatoAtual}
                    />
                    {loading ? (
                        <Text>Carregando contatos...</Text>
                    ) : (
                        <FlatList
                            data={contatos}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Contact
                                    abrirForm={setAbrirForm}
                                    editarContato={setContatoAtual}
                                    removerContato={removerContato}
                                    id={item._id}
                                    nome={item.nome}
                                    telefone={item.telefone}
                                    email={item.email}
                                />
                            )}
                        />
                    )}
                </View>
            )}

        </View>
    );
}
