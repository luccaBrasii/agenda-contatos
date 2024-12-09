import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    form:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    contacts:{
        backgroundColor: '#ffff',
       width: '70%',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        margin: 6
    },
    imageContainer:{
        flexDirection: 'row'
    },
    img:{
        width: 50, 
        height: 50,
        margin: 4
    }
    
})

export default styles