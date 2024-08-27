import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CountryCode from '../components/CountryCode';
import { emailPasswordLogin, getUserInfo } from "../components/Firebase";
import Profil from "../screens/Profil";

const{width,height}=Dimensions.get('window');


const Password=({email})=>{
    const [isFocused,setIsFocused]=useState(false);
    const [activePage,setActivePage]=useState('');
    const[secureTextEntry,setSecureTextEntry]=useState(true); // ilk başta şifreyi gizlemek için true
    const [password, setPassword] = useState('');
    const [searching] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggSecureTextEntry=()=>{
        setSecureTextEntry(prevState=>!prevState); // tersine çevirip false yapıyoruz , icon kullanmak için
    }

    const handleLogin = async () => {
        try {
            const userCredential = await emailPasswordLogin(email, password);
            console.log('E-mail ile giriş başarılı');
            setActivePage('Giriş yap');

            // Kullanıcı bilgilerini almak
            const user = userCredential.user;
            const userData = await getUserInfo(user.uid);
            setUserInfo(userData);
        } catch (error) {
            console.error('Giriş hatası: ', error);
        }
    }

    const renderPage=()=>{
        switch(activePage){
            case 'Şifrenizi mi unuttunuz ?':
                return renderInfo();
            case 'Giriş yap':
                return <Profil />;
            default :
            return renderGiris();
           
        }
    }
    const renderGiris=()=>(  

<View style={styles.titleContainer}>
              
                 <Text style={styles.title}>Şifrenizi giriniz</Text>
                 <View style={styles.mailContainer}>
                 <Text style={[styles.title,{fontSize:15}]}>rabis@gmail.com</Text>
                 </View>
           <View style
           ={styles.container}> 
           <View style={styles.inputContainer}>
           <TouchableWithoutFeedback onPress={()=> setIsFocused(true)}>
           <View style={[styles.passwordContainer,{borderColor: isFocused ? '#026CA8' : '#7A7A7A'}]}>
                <TextInput
                    placeholder="Şifrenizi giriniz"
                    secureTextEntry ={secureTextEntry} // şifreyi gizlemek için *** şeklinde yazar
                    onFocus={() => setIsFocused(true)}  // renk değişmesini sağlamak için
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text)=>setPassword(text)}
                    value={password}
                />
                <Pressable onPress={toggSecureTextEntry} style={styles.icon}>
                <Icon name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} size={24}
        />
                </Pressable>
                </View>
                </TouchableWithoutFeedback>
               <View >    
            <Pressable  style={styles.bottomButton} onPress={()=>setActivePage('Şifrenizi mi unuttunuz ?')} // sayfa durum güncellemeleri
                >
                 <Text style={styles.xText}>Şifrenizi mi unuttunuz ?</Text>
                 <Pressable style={styles.devamButon} onPress={handleLogin }>
                 <Text style={[styles.xText,{color:'white'}]}> Giriş yap</Text>
                 </Pressable>
             </Pressable>
             </View>     
            </View>
            </View>
            </View>
            
            
    );
    
    // ileri butonuna basıldıktan sonra şifre unutma sayfası 
    const renderInfo=()=>(
        <ScrollView>
          
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Hesap kurtarma</Text>
                <Text style={[styles.title,{fontSize:17}]}>Google, hesabınızın güvenliğini korumak için oturum açmaya çalışan kişinin gerçekten siz olduğunuzdan emin olmak istiyor</Text>
                <View style={styles.mailContainer}>
                    <Text style={[styles.title,{fontSize:15}]}>rabis@gmail.com</Text>
                </View>
                <Text style={[styles.title,{fontSize:17}]}>Güvenlik ayarlarınızda belirttiğiniz telefon numarasını onaylayın : **** *** ** 11</Text>
                <View style={styles.container}>
                    <View style={[styles.inputContainer,{margin:10}]}>
                        <View style={styles.phoneInputContainer}>
                        
                         <CountryCode // telefon numarası ve kodları bu kısımda
                         />
                        </View>
                    </View>
                </View>
                <View style={{position:"absolute",bottom:20,right:20}}>
                    <Pressable style={styles.devamButon} onPress={()=>setActivePage('emaile dön')}>
                        <Text style={[styles.xText,{color:'white'}]}>İleri</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
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
        paddingVertical:height/8,
        flex:1,
        backgroundColor:'white',
        
    },
    passwordContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#7A7A7A',
        width:width/1.30,
        height:height/12,
        borderWidth: 1,
        borderRadius: 10,
        padding:8,
        margin:10,
    },
    phoneInputContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor: 'white',
         borderRadius: 5,
    },
    x:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    inputContainer:{
        alignItems:'center',
        justifyContent:'center', 
    },
     mailContainer: {
            borderColor: '#D6D6D6',
            width: 200,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            borderWidth: 1,
            marginTop: 20,
            marginBottom:20
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
    
    },
    devamButon:{
        backgroundColor:'#026CA8',
        height:height/19,
        width:width/3.5,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
      
    },
    text:{
        fontSize:18,
        color:'#026CA8',
    },
    xText:{
        position:'relative',
        fontSize:18,
        color:'#026CA8',
        margin:6,
    },
    titleContainer: {flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        top:15
      
    },
    title:{
        fontSize:25,
        color:'black'
    },
    bottomButton:{
        alignItems:'center',
        marginTop:180,
        flexDirection:'row',
        padding:5,
        marginLeft:40
    },
    icon:{
        position: 'absolute',
  right: 10,
    }
})

export default Password;