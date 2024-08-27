import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Category from "../components/Category";
import Profil from "./Profil";
import Icon from 'react-native-vector-icons/Ionicons';

const {height,width}=Dimensions.get('window');

const Videolariniz=()=>{
    const [activePage,setActivePage]=useState('');
    const categories=[
        {id:'1' , title:'Sıralama ölçütü'},
        {id:'2' , title:'Videolar'},
        {id:'3', title:'Shorts'},
        {id:'4' , title:'Canlı'},
    ];

    const renderPage=()=>{
        switch(activePage){
            case 'Geri':
                return <Profil></Profil>;
            default:
                return ( <View style={styles.appContainer}>
                    <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setActivePage('Geri')}>
                    <Icon name='arrow-back' size={24} color='black' /> 
                   </TouchableOpacity>
                        <Text style={styles.title}>Videolarınız</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                        <Category items={categories}></Category>
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize:17,color:'black'}}>Video bulunamadı</Text>
                    </View>
                </View>)
        }
    }
    return(
        <View style={{flex:1}}>
            {renderPage()}
        </View>
    );
 
}

const styles=StyleSheet.create({
    appContainer:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column'
    },
    container:{
        height:height/2,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    titleContainer:{
        alignItems:'center',
        flexDirection:'row',
        margin:10,
       padding:4
    },
    title:{marginLeft:10,
        fontSize:30,
        fontWeight:'600',
        color:'black'
    }
})
export default Videolariniz;