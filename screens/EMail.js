import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Giris from "./Giris";

const {height,width}=Dimensions.get('window');

const EMail=()=>{
    const [isFocused,setIsFocused]=useState(false);
    const [isFocused2,setIsFocused2]=useState(false);
    const [activePage,setActivePage]=useState('');
    const [emailOrPhone,setEmailOrPhone]=useState(''); // email phone bilgilerini almayı sağlar
    const [name,setName]=useState(''); // isim alanını doldurmak için

    const renderPage=()=>{
        switch(activePage){
            case 'İleri':
                return renderInfo();
            case 'emaile dön':
                return <Giris />;
            default:
                return renderEMail();
        }
    }

    const renderEMail=()=>(  // sayfayı burada tasarladım
        <ScrollView>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>E-postanızı bulun</Text>
            <Text style={[styles.title, {fontSize:17}]}>Telefon numaranızı veya kurtarma e-postanızı giriniz</Text>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={[styles.input,{borderColor: isFocused ? '#026CA8' : '#7A7A7A'}]}
                    placeholder="Telefon numarası veya e-posta adresi"
                    onFocus={()=>setIsFocused(true)}  // borderın renginin değişmesi için
                    onBlur={()=>setIsFocused(false)}
                    onChangeText={(text)=>setEmailOrPhone(text)}
                    value={emailOrPhone}
                    />
                </View>
            </View>
            <View style={[styles.bottomButton,{marginTop:200}]}>
              {emailOrPhone !== '' ? (
                  <Pressable style={styles.ileriButon} onPress={()=>setActivePage('İleri')}>
                  <Text style={styles.xText}>İleri</Text>
              </Pressable>
              ) :
              (  <Pressable style={[styles.ileriButon,{backgroundColor:'grey'}]} onPress={()=>setActivePage('')}>
              <Text style={styles.xText}>İleri</Text>
          </Pressable>)}
                </View>
        </View>
        </ScrollView>
    );

    // ileri butonuna basıldıktan sonra
    const renderInfo=()=>(
        <ScrollView>
          
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Adınız nedir ?</Text>
                <Text style={[styles.title,{fontSize:17}]}>Google hesabınızdaki adınızı giriniz</Text>
                <View style={styles.container}>
                    <View style={[styles.inputContainer,{margin:10}]}>
                    <TextInput style={[styles.input,{borderColor: isFocused ? '#026CA8' : '#7A7A7A'}]}
                    placeholder="Ad"
                    onFocus={()=>setIsFocused(true)}
                    onBlur={()=>setIsFocused(false)}
                    onChangeText={(text)=>setName(text)}
                    value={name}
                    >
                    </TextInput>
                    <TextInput style={[styles.input,{borderColor: isFocused2 ? '#026CA8' : '#7A7A7A'}]}
                    placeholder="Soyad (isteğe bağlı)"
                    onFocus={()=>setIsFocused2(true)}
                    onBlur={()=>setIsFocused2(false)}
                    >
                    </TextInput>
                    </View>
                </View>
                <View style={styles.bottomButton}>
                   {name !== '' ? (
                     <Pressable style={styles.ileriButon} onPress={()=>setActivePage('emaile dön')}>
                     <Text style={styles.xText}>İleri</Text>
                 </Pressable>
                   ) : (
                    <Pressable style={[styles.ileriButon,{backgroundColor:'grey'}]}  >
                    <Text style={styles.xText}>İleri</Text>
                </Pressable>
                   )}
                </View>
            </View>
        </ScrollView>
    )

    return(
        <View style={styles.appContainer}>
            {renderPage()}
        </View>
    );

}

const styles=StyleSheet.create({
    appContainer:{
        flex:1,
        backgroundColor:'white',
    },
    container:{
        flex:1,
        paddingVertical:height/12,
        backgroundColor:'white'
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
    ileriButon:{
        backgroundColor:'#026CA8',
        height:height/19,
        width:width/4,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        margin:15,
    },
    bottomButton:{
        marginTop:110,
        padding:5,
        marginLeft:190
    },
    titleContainer:{
       flex:1,
       backgroundColor:'white',
       alignItems:'center',
       marginTop:40,
    },
    title:{
        fontSize:30,
        color:'black',
    },
    xText:{
        position:'relative',
        fontSize:18,
        color:'white',
        margin:6,
    },
})

export default EMail;