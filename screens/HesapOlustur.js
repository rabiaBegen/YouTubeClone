import React, { useState,useEffect } from "react";
import { Dimensions, StyleSheet, Text, View ,ScrollView,TextInput,Pressable, TouchableOpacity, Modal, FlatList,TouchableWithoutFeedback,KeyboardAvoidingView,Platform} from "react-native";
import Giris from "./Giris";
import { registerUser } from "../components/Firebase";
import Icon from 'react-native-vector-icons/Ionicons';


const {height,width}=Dimensions.get('window');

// gün ay yıl seçeneklerini oluşturup kullanıcı seçimlerini kontrol ediyorum
const CustomDropdown=({options,selectedValue,onValueChange,placeholder})=>{
  const [modalVisible,setModalVisible]=useState(false);

  // modal içinde kullanıcının seçimlerini kontrol etme
  const handleOptionSelect=(item)=>{
    onValueChange(item);
    setModalVisible(false);
  };
  // modalın kapatılması için
  const closeModal=()=>{
    setModalVisible(false);
  }

  // doğum tarihleri için modal
  return(
    <View>
      <TouchableOpacity style={styles.dropdown} onPress={()=>setModalVisible(true)}>
        <Text>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide"
      // modal seçeneklerin gösterildiği ve ekrandaki tıklamaları yakalayan yapı
      >
        <TouchableOpacity  style={styles.modalContainer} onPress={closeModal}// ekranda boş bir yere tıklandığında kapanmasını sağlamak için 
        > 
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList 
            data={options}
            keyExtractor={(item)=>item.toString()}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.option} onPress={()=>handleOptionSelect(item)}>
                <Text style={{color:'black',fontSize:15}}>{item}</Text>
              </TouchableOpacity>
            )}
            />
          </View>
        </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const HesapOlustur=()=>{
  // gün ay yıl seçtirmek için gerekli yapıyı sağlar
    const [isFocused,setIsFocused]=useState(false);
    const [isFocused2,setIsFocused2]=useState(false);
    const [isFocused3,setIsFocused3]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [secureTextEntry,setSecureTextEntry]=useState(true); // ilk başta şifreyi gizleyecek
    const [phoneNumber,setPhoneNumber]=useState('');
    const [password,setPassword]=useState('');
    const [activePage,setActivePage]=useState('');
    const [selectedDay,setSelectedDay]=useState('1');
    const [selectedMonth,setSelectedMonth]=useState('Ocak'); // varsayılan olarak ayarlama
    const [selectedYear,setSelectedYear]=useState('2024');
    const [selectedGender,setSelectedGender]=useState('');

    const days=Array.from({length:31},(_,i)=>(i+1).toString());
    const months=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    const years=Array.from({length:101},(_,i)=>(2024-i).toString());
    const gender=['Kadın','Erkek'];

    // ay ve yıla göre geçerli gün sayısını hesaplama
    const getDaysInMonth=(month,year)=>{
      switch(month){
        case 'Şubat':
          return (year %4 ===0 && year % 100 !==0) || year % 400 ===0 ? 29 : 29;
        case 'Nisan':
        case 'Haziran':
        case 'Eylül':
        case 'Kasım':
          return 30;
        default:
          return 31;
      }
    };

    // kullanıcı kaydı sırasında bilgilerin alınmasını sağlayan fonk
    const handleRegister=async ()=>{
      try{
        const user=await registerUser(email,phoneNumber,password,{
          name,
          selectedDay,
          selectedMonth,
          selectedYear,
          selectedGender
        });
        console.log('kullanıcı başarıyla kaydedildi: ',user);
        setActivePage('Hesap Oluştur');
      }
      catch(error){
        console.log('kayıt hatası: ',error);
      }
    }

    // şifre ikonunun değişmesi için
    const toggSecureTextEntry=()=>{
      setSecureTextEntry(prevState=>!prevState); // tersine çevirip false yapıyoruz
    }

    // sayfa geçişleri
    const renderPage=()=>{
        switch(activePage){
            case 'İleri':
                return renderInfo2();
              case 'Devam':
                return renderLogIn();
              case 'Hesap Oluştur':
                return <Giris />;
            default:
                return renderHesapOlustur();
        }
    }

    // kullanıcın adının soyadının alınması
   const renderHesapOlustur=()=>(
     <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: 'white' }}
    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
  >
          <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:'white'}}> 
          
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Bir Google hesabı oluşturun</Text>
            <Text style={[styles.title,{fontSize:17}]}>Adınızı giriniz</Text>
            <View style={[styles.container,{paddingVertical:height/25}]}>
            <View style={[styles.container,{height:height/18}]}>
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
                  <Pressable style={styles.ileriButon} onPress={()=>setActivePage('İleri')}>
                  <Text style={[styles.xText,{color:'white'}]}>İleri</Text>
              </Pressable>
                ) : (
                  <Pressable style={[styles.ileriButon,{backgroundColor:'grey'}]} >
                    <Text style={[styles.xText,{color:'white'}]}>İleri</Text>
                </Pressable>
                )}
            </View>
           
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
)

// doğum tarihinin alınması
const renderInfo2=()=>{

  return( 
 <View style={styles.titleContainer}>
            <Text style={styles.title}>Temel Bilgiler</Text>
            <Text style={[styles.title,{fontSize:17}]}>Doğum tarihinizi ve cinsiyetinizi giriniz</Text>
    <View style={{flex:1,flexDirection:'column'}}>
    <View style={styles.dateContainer}>
      <View style={{paddingHorizontal:10}}>
    <Text>Gün:</Text>
    <CustomDropdown
    options={Array.from({length:getDaysInMonth(selectedMonth,parseInt(selectedYear))}, (_,i)=>(i+1).toString())}
    selectedValue={selectedDay}
    onValueChange={setSelectedDay}
    placeholder="Gün">
    </CustomDropdown>
    </View>

    <View style={{paddingHorizontal:10}}>
    <Text>Ay:</Text>
    <CustomDropdown
   options={months}
    selectedValue={selectedMonth}
    onValueChange={setSelectedMonth}
    placeholder="Ay"
    />
    </View>

    <View style={{paddingHorizontal:10}}>
  <Text>Yıl:</Text>
  <CustomDropdown
  options={Array.from({ length: 101 }, (_, i) => (2024 - i).toString())}
  selectedValue={selectedYear}
  onValueChange={setSelectedYear}
  placeholder="Yıl"
  />
  </View>
  </View>
  <View style={styles.genderContainer}> 
  <Text>Cinsiyet:</Text>
  <CustomDropdown
  options={gender}
  selectedValue={selectedGender}
  onValueChange={setSelectedGender}
  placeholder="Cinsiyet"
  />
  </View>
  <View style={styles.bottomContainer}>
  {selectedGender !== '' ? (
    <Pressable style={styles.devamButon} onPress={()=>setActivePage('Devam') }>
    <Text style={[styles.xText,{color:'white'}]}> Devam</Text>
  </Pressable>
  ) : (
    <Pressable style={[styles.devamButon, {backgroundColor:'grey'}]} >
     <Text style={[styles.xText,{color:'white'}]}> Devam</Text>
   </Pressable>
  )}
  </View>
  </View>
  </View>
)
}

// kullanıcı kaydı için email,telefon,şifre alınması
const renderLogIn=()=>{
  return(
    <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:'white'}}>
  <View style={[styles.container,{paddingVertical:height/18}]}>
      <View style={[styles.inputContainer,{margin:10}]}>
      <TextInput style={[styles.input,{borderColor: isFocused ? '#026CA8' : '#7A7A7A'}]}
      placeholder="E-mail"
      onFocus={()=>setIsFocused(true)}
      onBlur={()=>setIsFocused(false)}
      onChangeText={(text)=>setEmail(text)}
      value={email}
      >
      </TextInput>
      <TextInput style={[styles.input,{borderColor: isFocused2 ? '#026CA8' : '#7A7A7A'}]}
      placeholder="Telefon"
      keyboardType="phone-pad" // Sayısal klavye türü
      onFocus={()=>setIsFocused2(true)}
      onBlur={()=>setIsFocused2(false)}
      onChangeText={(text)=>setPhoneNumber(text)}
      value={phoneNumber}
      >
      </TextInput>
      <TouchableWithoutFeedback onPress={()=> setIsFocused3(true)}>
      <View style={[styles.passwordContainer,{borderColor: isFocused3 ? '#026CA8' : '#7A7A7A'}]}>
    <TextInput 
      placeholder="Şifre"
      onFocus={() => setIsFocused3(true)}
      onBlur={() => setIsFocused3(false)}
      onChangeText={(text) => setPassword(text)}
      value={password}
      secureTextEntry={secureTextEntry} // şifreyi gizlemek için
    />
    <Pressable onPress={toggSecureTextEntry} style={styles.icon}>
      <Icon name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} size={20} />
    </Pressable>
  </View>
  </TouchableWithoutFeedback>
  </View>
  </View>
  <View style={styles.bottomButton}>
      {email !== '' && phoneNumber !=='' && password!=='' ? (
        <Pressable style={[styles.ileriButon,{width:width/2.5}]} onPress={handleRegister}>
        <Text style={[styles.xText,{color:'white'}]}>Hesap Oluştur</Text>
    </Pressable>
      ) : (
        <Pressable style={[styles.ileriButon,{width:width/2.5,backgroundColor:'grey'}]} >
          <Text style={[styles.xText,{color:'white'}]}>Hesap Oluştur</Text>
      </Pressable>
      )}
  </View>
  </ScrollView>
  )
}

// hangi sayfanın render edileceği gösteriliyor
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
        paddingVertical:70,
    },
    container:{
        flex:1,
        paddingVertical:height/12,
        backgroundColor:'white'
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
        margin:20,
    },
    dateContainer:{
      flex:1,
      flexDirection:'row',
      margin:30,
    },
    titleContainer:{
       flex:1,
       backgroundColor:'white',
       flexDirection:'column',
       alignItems:'center',
       paddingVertical:5,
       
    },
    title:{
        fontSize:25,
        color:'black',
    },
    xText:{
        position:'relative',
        fontSize:18,
        color:'white',
        margin:6,
    },
    dropdown:{
      borderWidth:1,
      borderColor:'grey',
      padding:10,
      borderRadius:5,
      width:100,
      marginVertical:10,
      alignItems:'center'
    },
    modalContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
     
    },
    modalContent:{
      backgroundColor:'white',
      width:200,
      maxHeight:300,
      borderRadius:5,
      padding:10,
    },
    option:{
      padding:10,
      borderBottomWidth:1,
        borderBottomColor:'#e0e0e0', // Ayrım çizgisi rengi
        color:'black'
      
    },
    devamButon:{
      backgroundColor:'#026CA8',
      height:height/19,
      width:width/3.5,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10
      
  },
  bottomButton:{
    marginTop:80,
    padding:5,
    marginLeft:190
},
  xText:{
    position:'relative',
    fontSize:18,
    color:'#026CA8',
    margin:6,
},
genderContainer:{
  alignItems:'center',
  justifyContent:'center',
  marginBottom:200,
},
bottomContainer:{
  alignItems:'flex-end',
  marginRight:70,
},
icon: {
  position: 'absolute',
  right: 10,
},
})

export default HesapOlustur;