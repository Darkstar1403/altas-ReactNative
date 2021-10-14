import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import { useFetch } from '../../hooks/useFetch';



export const Listas = () => {

    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {data:result} = useFetch('https://reactnativebranco.000webhostapp.com/mostrar.php');

    const loadList = () =>{
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState == 4 && this.status == 200){
                const temp = JSON.parse(xhttp.responseText);
                setList(temp);
                console.log(list);
            }
            else{
                setList([]);
            }
        };
        xhttp.open('GET', 'https://reactnativebranco.000webhostapp.com/mostrar.php');
        xhttp.send();
    }

    useEffect(() => {
        setIsLoading(true);
        setList(result);
        setIsLoading(false);
        
    }, []);

    const isCharging = () =>{
        setIsLoading(true);
        loadList();
        setIsLoading(false);
    }

    return (
        <View style={{display: 'flex', flex: 1}}>
            <FlatList
            style = {{marginTop:10, marginRight:10, marginLeft:10}}
            data = {list}
            refreshing={isLoading}
            onRefresh={isCharging}
            renderItem = {({item}) =>(
                <View style = {{justifyContent: 'center', marginBottom: 10, display:'flex', flexDirection:'row'}}>
                    <View style={{flex:5}}>
                        <Text style={{backgroundColor:'blue', color:'white', padding:10, width: Dimensions.get('window').width}}>
                            {item.Nombre}
                        </Text>
                        <Text style={{backgroundColor:'blue', color:'white', padding:10, width: Dimensions.get('window').width}}>
                            {item.Codigo}
                        </Text>
                        <Text style={{backgroundColor:'blue', color:'white', padding:10, width: Dimensions.get('window').width}}>
                            {item.Centro}
                        </Text>
                    </View>
                    <View style={{flex:2, marginTop:20}}>
                        <Image source={{uri: item.Imagen.toString()}} style={{ width: 75, height: 75 }}/>
                    </View>
                </View>
            )}
            keyExtractor = {item => item.Codigo}
            />
        </View>
    )
}
