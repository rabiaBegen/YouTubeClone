import React from "react";
import { Dimensions, FlatList, StyleSheet, View, Text, Image } from "react-native";
import Video from 'react-native-video';
import Navbar from "../components/Navbar";

const { width } = Dimensions.get('window');

const History = ({ navbarItems, handleNavigate }) => {
  const renderVideoItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: item.video }}
          resizeMode="contain" // Video boyutlarını container içinde uygun şekilde göstermek için
          controls={true} // Kullanıcı videoyu oynatabilir, ses ayarlayabilir, durdurabilir, ekranı büyütebilir
          style={styles.video}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  
  const data = [
    { id: '1', date: '12.08.2024', title: 'Video 1', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '2', date: '12.08.2024', title: 'Video 2', video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
    { id: '3', date: '12.08.2024', title: 'Video 3', video: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4' },
    { id: '4', date: '12.08.2024', title: 'Video 4', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
    { id: '5', date: '12.08.2024', title: 'Video 5', video: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.videoList}
      />
      <Navbar items={navbarItems} setActivePage={handleNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: width * 0.4, // Video genişliği 
    height: width * 0.35, // Video yüksekliği 
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Videoyu sağa hizala
    marginRight: 10,
    marginLeft:10,
    overflow:'hidden',
    borderRadius:15,
  },
  item: {
    flexDirection: 'row', // Video ve bilgileri yatayda sıralar
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  videoList: {
    padding: 10,
  },
});

export default History;
