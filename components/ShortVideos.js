import React from "react";
import { Image, Text } from "react-native";
import Video from 'react-native-video';
import { View,StyleSheet,FlatList } from "react-native";
const ShortVideos=({data_})=>{
      // liste içindekilerini render etmeyi sağlıyor
  const renderVideoItem=({item})=>(
    <View style={styles.item}>
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.video }}
        resizeMode="stretch" // video alanının container içinin tamamını kaplar
        controls={true} // kullanıcı videoyu oynatabilir, ses ayarlayabilir, durdurabilir, ekranı büyütebilir
        style={styles.video}
      />
    </View>
  </View>
  );
  return(
    <View style={styles.container}>
        <View style={styles.header}>
       <Image style={styles.icon}
        source={require('../assets/icons/shortsIcon.png')}
       ></Image>
       <Text style={styles.text}>Shorts</Text>
       </View>
       <FlatList    // data_ dizisini alarak her bir öğenin rendervideoitem fonk ile render ediyor
       data={data_}
       renderItem={renderVideoItem}
       keyExtractor={(item)=>item.id}
       horizontal
       showsHorizontalScrollIndicator={false}  // videoların yan yana kaydırılabilir şekilde gözükmesini sağlar
       contentContainerStyle={styles.videoList}></FlatList>
      
    </View>
    )

};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
      },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
    videoContainer: {
        width: 180,
        height: 280,
        borderRadius: 20,
        overflow: 'hidden', // borderRadius'un çalışmasını sağlar
    },
    text:{
        fontSize:20,
        color:'black',
        fontWeight:'bold',

    },

    icon:{
        width:30,
        height:30,
    },
    videoList:{
        alignItems:'center',
    },
    item: {
        marginRight: 10, // Videolar arasındaki boşluk
      },
      video: {
        width: '100%',
        height: '100%',
    
      },
});

export default ShortVideos;