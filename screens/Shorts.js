import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Video from 'react-native-video';
import Navbar from "../components/Navbar";

const {width,height}=Dimensions.get('window'); // ekran boyutlarını almamı sağlıyor
const Shorts=({navbarItems,handleNavigate})=>{  
 // liste içindekilerini render etmeyi sağlıyor
  const renderVideoItem=({item})=>(
    <View style={styles.item}>
      <Video
        source={{ uri: item.video }}
        resizeMode="contain" // video alanının container içinin tamamını kaplar
        controls={true} // kullanıcı videoyu oynatabilir, ses ayarlayabilir, durdurabilir, ekranı büyütebilir
        style={styles.video}
      />
  
  </View>
  );
  // shorts videoları için
  const shortData = [
    { id: '1', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '2', video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
    { id: '3', video: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4' },
    { id: '4', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
    { id: '5', video: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4' },
  ];
  return(
    <View style={{flex:1}}>
        <View style={styles.video}>
        <FlatList
        data={shortData}
        renderItem={renderVideoItem}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={styles.videoList}
        ></FlatList>
        </View>
        <Navbar items={navbarItems} setActivePage={handleNavigate}  // navbarı kullanmak için
        />  
    </View>
  )


};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    
    video: {
        width: width,
        height: height,
    
      },
    item:{
        marginBottom:3,
        alignItems:'center'
    },
    videoList:{
        alignItems:'center',
    },
});

export default Shorts;