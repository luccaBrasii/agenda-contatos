import React from "react";
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles.js'
import imgEdit from '../../../assets/lapis-de-cor.png'
import imgDelete from '../../../assets/cesto-de-lixo.png'

export default function Contact(props){

    const deleteContact = async () => {
        try {
            const response = await fetch(`http://192.168.1.100:3000/contato/${props.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar contato: ${response.status}`);
            }

            const json = await response.json();
            console.log("Contato deletado:", json.contato);

            // Remove o contato do estado no componente pai
            props.removerContato(props.id);
        } catch (error) {
            console.error("Erro ao deletar o contato:", error.message);
        }
    };

    const confirmarDelete = () => {
        Alert.alert(
            "Confirmação",
            `Tem certeza que deseja deletar o contato "${props.nome}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sim", onPress: deleteContact },
            ]
        );
    };

    return(
        <View style={styles.form}>
            <View style={styles.contacts}>
                <View >
                    <Text>Nome: {props.nome}</Text>
                    <Text>Email: {props.email}</Text>
                    <Text>Telefone: {props.telefone}</Text>
                </View>
            </View>

            <View style={styles.imageContainer}>
            <TouchableOpacity
                onPress={() => {
                    props.editarContato({ 
                        id: props.id, 
                        nome: props.nome, 
                        email: props.email, 
                        telefone: props.telefone });
                    props.abrirForm(true);
                }}
            >
                <Image 
                    source={imgEdit}
                    style={styles.img}
                />
            </TouchableOpacity>


                <TouchableOpacity onPress={confirmarDelete}>
                    <Image source={imgDelete} style={styles.img} />
                </TouchableOpacity>
            </View>
        </View>
    )
}