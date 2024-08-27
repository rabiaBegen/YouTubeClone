import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';
import Category from '../components/Category';
import ShortVideos from '../components/ShortVideos';

const YOUTUBE_API_KEY = 'AIzaSyBdeKTSRsOOddET2-Rq-hIAQV-kD1-JmCo'; // Buraya API anahtarınızı ekleyin

const Home = ({ searching }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect yan etkileri yönetmek için burada API'dan veri çekmemi sağlıyor
  useEffect(() => {
    const fetchVideos = async () => { // async olduğu için uzun süreli işlemlerde uygulama donmaz işlem yapılmaya devam ediyor
      try {
        // fetch fonk veri almayı sağlıyor API'ye HTTP GET isteği gönderiliyor
        // await fonk tamamlanmasını bekleyip sonucu response değişkenine atıyor
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${YOUTUBE_API_KEY}&maxResults=10`);
        // json formatına döndürülüyor
        const data = await response.json();
        console.log('Fetched data:', data); // Veriyi konsola yazdırıyorum
        // map fonk ile her id title ve video bileşini içeren video nesneleri oluşturuluyor
        setVideos(data.items ? data.items.map(item => ({
          id: item.id,
          title: item.snippet.title,
          video: `https://www.youtube.com/watch?v=${item.id}`, // YouTube video URL'si
        })) : []);
      } catch (error) {
        console.log('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // kategoriler için dizi
  const categories = [
    { id: '1', title: 'Tümü' },
    { id: '2', title: 'Müzikler' },
    { id: '3', title: 'Mixler' },
    { id: '4', title: 'Çok İzlenenler' }
  ];

  // shorts videoları için
  const shortVideos = [
    { id: '1', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '2', video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
    { id: '3', video: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4' },
    { id: '4', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
    { id: '5', video: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4' },
  ];

  // videoların ekranda gözükmesini sağlıyor
  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.id}>
      <Video
        source={{ uri: item.video }}
        style={styles.video}
        resizeMode="stretch"
        controls={true}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {!searching && <Category items={categories} />}  
        {!searching && <ShortVideos data_={shortVideos} />}
        {!searching ? (
          videos.length > 0 ? (
            videos.map(video => renderItem({ item: video }))
          ) : (
            <Text>No videos available</Text>
          )
        ) : (
          <View style={styles.container}>
            <Text>Search...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  list: {
    padding: 0,
  },
  item: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
