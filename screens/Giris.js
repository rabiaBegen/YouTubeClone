import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Password from "./Password";
import EMail from "./EMail";
import HesapOlustur from "./HesapOlustur";


const{width,height}=Dimensions.get('window');

const Giris=()=>{
    const [isFocused,setIsFocused]=useState(false);
    const [activePage,setActivePage]=useState('');
    const [email, setEmail] = useState('');

    const renderPage=()=>{
        switch(activePage){
            case 'Hesap Oluşturun':
                return <HesapOlustur/>;
            case 'Devam':
                return <Password email={email}/>;
            case 'E-posta adresinizi mi unuttunuz ?':
                return <EMail/>;
            default :
            return renderGiris();
           
        }
    }

    //sayfayı burada tasarladım
    const renderGiris=()=>(  
        
            <View style={styles.titleContainer}>
              
                 <Text style={styles.title}>Oturum Aç</Text>
                 <Text style={[styles.title,{fontSize:17}]}>YouTube'a devam et</Text>
            <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:'white'}}>
           <View style
           ={styles.container}> 
           <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { borderColor
                        : isFocused ? '#026CA8' : '#7A7A7A' }]}
                    placeholder="E-posta veya telefon"
                    onFocus={() => setIsFocused(true)}  // renk değişmesini sağlamak için
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text)=>setEmail(text)}
                    value={email}
                />
                <Pressable onPress={()=>setActivePage('E-posta adresinizi mi unuttunuz ?')}>
                    <Text style={styles.text}>E-posta adresinizi mi unuttunuz ?</Text>
                </Pressable>
               <View>
            <Pressable  style={styles.bottomButton} onPress={()=>setActivePage('Hesap Oluşturun')} // sayfa durum güncellemeleri
                >
                 <Text style={styles.xText}>Hesap Oluşturun</Text>

                 {email !== '' ? (
                     <Pressable style={styles.devamButon} onPress={()=>setActivePage('Devam')}>
                     <Text style={[styles.xText,{color:'white'}]}> Devam</Text>
                     </Pressable>
                 ) :
                 (<Pressable style={[styles.devamButon,{backgroundColor:'grey'}]} onPress={()=>setActivePage('Devam')} >
                 <Text style={[styles.xText,{color:'white'}]}> Devam</Text>
                 </Pressable>)}
                
             </Pressable>
             </View>
            
            </View>
            </View>
            </ScrollView>
            </View>
    );
      return (  // geçilecek sayfa için
        <View style={styles.appContainer}>
            {renderPage()}
        </View>
      );
    }
  


const styles=StyleSheet.create({
    appContainer:{
        flex:1,
        backgroundColor:'white'
    },
    container:{
        paddingVertical:height/12,
        flex:1,
        backgroundColor:'white',
        
    },
    inputContainer:{
        alignItems:'center',
        justifyContent:'center', 
    },
    input:{
        alignItems:'center',
        justifyContent:'center',
        width:width/1.30,
        height:height/12,
        borderWidth:1,
        borderColor:"#7A7A7A",
        borderRadius:10,
        padding:8,
        margin:10,
    },
    devamButon:{
        backgroundColor:'#026CA8',
        height:height/19,
        width:width/3.5,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    text:{
        fontSize:18,
        color:'#026CA8',
        margin:10,
    },
    xText:{
        position:'relative',
        fontSize:18,
        color:'#026CA8',
        margin:6,
    },
    titleContainer: {
       
        backgroundColor: 'white',
        alignItems: 'center',
       
    },
    title:{
        fontSize:30,
        color:'black'
    },
    bottomButton:{
        alignItems:'center',
        marginTop:200,
        flexDirection:'row',
        padding:5,
        marginLeft:70
    }
})

export default Giris;