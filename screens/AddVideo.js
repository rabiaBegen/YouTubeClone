// screens/AddVideoScreen.js
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Alert, Pressable, Text } from 'react-native';
import Video from 'react-native-video';

const AddVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [isFocused,setIsFocused]=useState(false);

  // daha sonra kullanıcın eklediği videoları kendi videolar sayfasına göndereceğim 
  const handleAddVideo = () => {
    // Video URL doğrulaması ekleyin
    if (videoUrl.trim() === '') {
      Alert.alert('Hata', 'Geçerli bir video URL girin.');
      return;
    }

    setShowVideo(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input,{borderColor: isFocused ? '#026CA8' :'#7A7A7A'}]}
          placeholder="Video URL giriniz"
          onFocus={() => setIsFocused(true)}  // renk değişmesini sağlamak için
          onBlur={() => setIsFocused(false)}
          value={videoUrl}
          onChangeText={setVideoUrl}
        />
        <View style={{margin:30}}>
        <Pressable style={styles.button}  onPress={handleAddVideo}>
        <Text style={styles.text}>Video Ekle</Text>
        </Pressable>
        </View>
      </View>
      {showVideo && (
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          controls={true}
          resizeMode="contain"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
   
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  video: {
    width: '100%',
    height: 300,
  },
  button:{
    height:40,
    width:120,
    backgroundColor:'#026CA8',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:17,
    color:'white'
  }
});

export default AddVideo;
