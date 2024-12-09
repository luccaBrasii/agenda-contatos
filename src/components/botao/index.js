import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

export default function Botao(props){

   

    function reconhecerID(){
        let {id} = props
        let abrirForm = props.abrirForm
        let contatoAtual = props.contatoAtual

        if(id === '1'){
            abrirForm(true)
            contatoAtual(null)
        }else if(id === '2'){
            abrirForm(false)
        }else{
            console.log('ERRO! É necessário atribuir um ID ao botão')
        }
        
         
    }
    return(
        <View>
            <TouchableOpacity 
                style={styles.botao}
                onPress={reconhecerID}
            >
            <Text style={styles.textoBotao}>{props.texto}</Text>
            </TouchableOpacity>
        </View>
    )
}