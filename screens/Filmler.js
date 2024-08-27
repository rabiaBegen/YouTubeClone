import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Profil from "./Profil";


const {height,width}=Dimensions.get('window');

const Filmler=()=>{
    const [activePage,setActivePage]=useState('');

    const renderPage=()=>{
        switch(activePage){
            case 'Geri':
                return <Profil></Profil>;
            default:
                return(
                    <View>
                        <View style={styles.titleContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => setActivePage('Geri')}>
                    <Icon name='arrow-back' size={24} color='black' /> 
                   </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <Icon style={styles.icon} name={'film-sharp'} size={20}/>
                            </View>
                            <Text style={styles.title}>Filmler</Text>
                        </View>
                        <View style={styles.container}>
                        <Icon name={'pricetag'} size={100} color={'#D6D6D6'} margin={20}/>
                        <Text style={styles.text}>Satın alınmış bir şey yok</Text>
                        <Text style={{fontSize:17}}>Kiraladığınız ya da satın aldığınız filmler ve programlar burada görünür</Text>
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
    container:{
        height:height/2,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    titleContainer:{
        flexDirection:'row',
        margin:10,
        alignItems:'center',
        marginLeft:10
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
    icon:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        padding:10
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20, // Yarıçapı genişliğin yarısı kadar yaparak daire şekli elde edersiniz
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple', // Container arka plan rengi
        marginRight: 10,
    },

});

export default Filmler;