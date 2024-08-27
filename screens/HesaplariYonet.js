import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Giris from "./Giris";

const {width,height}=Dimensions.get('window');

const HesaplariYonet=()=>{
    const [activePage,setActivePage]=useState('');

    const renderPage=()=>{
        switch(activePage){
            case 'Başka bir hesap ekle':
                return <Giris />;
            default:
                return renderYonet();
        }
    }

    const renderYonet=()=>{
        return(
            <View style={styles.container}>
            <Text style={styles.nameText}>Rabia Begen</Text>
            <Text style={[styles.nameText,{fontSize:17}]}>rabis@gmail.com</Text>
            <Pressable style={styles.button}>
                <Text style={[styles.nameText,{fontSize:17}]}>Bu cihazdan kaldır</Text>
            </Pressable>
            <View style={styles.line}></View>
            <Pressable style={[styles.button,{backgroundColor:'#026CA8', width:220}]} onPress={()=>setActivePage('Başka bir hesap ekle')}>
                <Text style={[styles.nameText,{fontSize:17,color:'white'}]}>Başka bir hesap ekle</Text>
            </Pressable>
           
        </View>
        )
    }
    return(
        <View style={styles.appContainer}>
            {renderPage()}
        </View>
    )
  
    
}

const styles=StyleSheet.create({
    appContainer:{
        flex:1,
        backgroundColor:'white',
    },
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white',
        padding:20
    },
    button:{
        alignItems:'center',
        justifyContent:'center',
        height:40,
        width:200,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#BCBEBD',
        marginBottom:20,
        marginTop:20
    },
    line:{
        height:1,
        width:'100%',
        backgroundColor:'#BCBEBD',
        marginVertical:20
    },
    nameText:{
        fontSize:25,
        color:'black'
    }
})

export default HesaplariYonet;