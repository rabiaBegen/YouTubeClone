import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";


const {height,width}=Dimensions.get('window');

const Abonelikler=()=>{
    return(
    <View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Abonelikler</Text>
        </View>
        <View style={styles.container}>
        <Text style={{fontSize:17}}>Aboneliğiniz bulunmamaktadır</Text>
        </View>
    </View>)
}

const styles=StyleSheet.create({
    container:{
        height:height/2,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    titleContainer:{
        flexDirection:'row',
        margin:10,
        alignItems:'center'
    },
    title:{
        fontSize:25,
        color:'black',
        fontWeight:'600'
    },
    text:{
        fontSize:23,
        color:'black'
    },
   
});

export default Abonelikler;