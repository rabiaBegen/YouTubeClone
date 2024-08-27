import React, { useState } from "react"; 
import { View,Text,StyleSheet,Pressable, FlatList } from "react-native";

const Category = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handlePress = (index) => {
    setSelectedIndex(index);  // Tıklanan kategorinin indeksini saklıyor
  };


  // her bir kategori render ediliyor ve Pressable ile tıklanma özelliği oluyor
  const renderCategoryItem =({item,index})=>(
    <Pressable style={({pressed})=>[
      styles.button,
      {backgroundColor: selectedIndex=== index ? 'black' : '#E5E7E8'},  // tıklanma durumuna göre butonda renk değişimi, indexi kontrol ederek yazının rengini ayarladım
    ]}
    onPress={() => handlePress(index)}
    >
      <Text
        style={[
          styles.buttonText,
          { color: selectedIndex === index ? 'white' : 'black' }  // Rengi seçilen kategoriye göre ayarla
        ]}
      >
        {item.title}
      </Text>
    </Pressable>
  )
    return (
      <View style={styles.categoryContainer}>
        <FlatList    // items dizisini alarak her bir öğenin rendercategoryıtem fonk ile render ediyor
        data={items}
        renderItem={renderCategoryItem}
        keyExtractor={item=>item.id}
        horizontal
        showsHorizontalScrollIndicator={false}  // kategorilerin yan yana kaydırılabilir şekilde gözükmesini sağlar
        contentContainerStyle={styles.categoryList}></FlatList>
      </View>
    );
  };

const styles=StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
    button:{
      marginHorizontal: 6,
      paddingHorizontal: 20,
        height: 40,
        justifyContent: 'center', // Yatayda ortalar
        alignItems: 'center', // Dikeyde ortalar
        borderRadius: 10,
    },
    buttonText:{
       
        fontSize:14,
       
    },
    categoryList: {
      alignItems: 'center',
    },
});

export default Category;