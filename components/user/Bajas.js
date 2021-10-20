import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

export const Bajas = () => {

    const [codigo, setCodigo] = useState('');
    const [user, setUser] = useState({});

    const buscarUsuario = async() =>{
        try{
            const busqueda = await fetch(`https://reactnativebranco.000webhostapp.com/buscar.php?codigo=${codigo}`);
            const resp = await busqueda.json();
            console.log(resp[0]);
            return resp[0];
        }
        catch(error){
            throw error
        }
    }

    const handleSearch = () =>{
        buscarUsuario().then(resp => {
            Alert.alert(
                'Eliminando alumno',
                `¿Desea eliminar a ${resp.Nombre}?`,
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "Si", onPress: () => handleDelete() }
                ]
            )
        }).catch(err => {
            console.log(err);
            Alert.alert('Alumno no encontrado');
            resetForm();
        });
    }

    const resetForm = () =>{
        setCodigo('');
    }

    const handleDelete = async() =>{
        const data = new FormData();
        data.append('code', codigo);
        const response = await fetch('https://reactnativebranco.000webhostapp.com/eliminar.php', {
            method: 'POST',
            body: data
        });
        const body = await response.text();
        console.log(body);
        if(body){
            Alert.alert('Success', body,[{text:'Ok',onPress: ()=> resetForm()}]);
        }
    }

    return (
        <View>

            <ScrollView>
                <Input
                        style={styles.alta}
                        placeholder='Código'
                        leftIcon={
                            <Icon
                            name='search'
                            size={24}
                            color='black'
                            />
                        }
                        value={codigo}
                        placeholder='Ingrese código a buscar' 
                        onChangeText={codigo => setCodigo(codigo)}
                    />
                <View style={{marginTop: 20, width:100, marginLeft:150}}>
                        <Button
                            onPress={handleSearch}
                            icon={
                                <Icon
                                
                                name="user-plus"
                                size={15}
                                color="white"
                                />
                            }
                            title="Eliminar"/>
                    </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:30,
        textAlign: 'center'
    },
    alta:{
        width:250,
        marginTop:30,
        marginLeft:20
    }
});