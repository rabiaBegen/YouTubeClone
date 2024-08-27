import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // MaterialCommunityIcons ikon setini kullanma
import Icon from 'react-native-vector-icons/Ionicons';
import App from './App';


const Header = ({ title ,searching, setSearching, navigate }) => {

  // touchableopacity tıklandığı zaman opak bir görünüm almasını sağlıyor
  return (
    <View style={styles.header}>
    {!searching ? ( // arama modunda değilsek
      <>
        <MaterialCommunityIcons name="youtube" size={24} color="red" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
        </View>
       
        <TouchableOpacity onPress={() => setSearching(true)} style={styles.searchIcon}>
          <MaterialCommunityIcons name="magnify" size={24} color="black"  />
        </TouchableOpacity>
        
      </>
    ) : ( // arama modunda
      <>
      <TouchableOpacity onPress={() => {
            setSearching(false); // arama modundan çıkıyoruz
            navigate('Anasayfa');  // App sayfasına geçmeyi sağlıyor
          }}>
            <MaterialCommunityIcons name='arrow-left' size={24} color='black' />    
          </TouchableOpacity>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            autoFocus={true}
          />
        </>
      )}

  </View>
);
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row', // Yatayda sıralamak için
    alignItems: 'center', // Dikeyde ortalamak için
    paddingLeft: 15,
  },
  icon: {
    marginRight: 6, // Başlık ile ikon arasına boşluk bırakmak için
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon:{
    position:'absolute',
    right:15,
  },
  iconContainer:{
    position:'absolute',
    flexDirection:'row',
    right:30,
    margin:20,
    marginRight:10,
    alignItems:'center',
    justifyContent:'flex-end'
  },

  searchInput:{
    flex:1,
    height:40,
    backgroundColor:'#f1f1f1',
    borderRadius:10,
    paddingHorizontal:10,
    marginLeft:10,
  },
});

export default Header;
