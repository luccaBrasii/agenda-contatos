function reconhecerID(boleano){
    let {id} = props
    let abrirForm = props.add
    
    if(boleano === '1'){
        return true
    }else if(id === '2'){
        return false
    }else{
        console.log('ERRO! É necessário atribuir um ID')
    }
    
     
}