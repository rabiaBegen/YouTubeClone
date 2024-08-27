import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView ,ActivityIndicator} from "react-native";
import Giris from "./Giris";
import Video from 'react-native-video';
import HesaplariYonet from "./HesaplariYonet";
import Videolariniz from "./Videolariniz";
import IzlemeSuresi from "./IzlemeSuresi";
import Filmler from "./Filmler";
import Yardim from "./Yardim";
import { getUserInfo} from '../components/Firebase'; 
import { getAuth } from 'firebase/auth'; // Firebase auth importu
import YouTubePremium from "./YouTubePremium";
import History from "./History";
import PlayList from "./PlayList";




const { width, height } = Dimensions.get('window'); // ekran boyutu alma

const Profil = () => {
    const [modalVisible, setModalVisible] = useState(false); // görünürlüğü kontrol ediyor
    const [activePage, setActivePage] = useState(''); // aktif sayfa kontrolü için
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();


    const data = [
        { id: '1', title: 'Video 1', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '2', title: 'Video 2', video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
        { id: '3', title: 'Video 3', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '4', title: 'Video 4', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
        { id: '5', title: 'Video 5', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ];
      const oynatmaListeleri = [
        { id: '1', title: 'Video 1', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '2', title: 'Video 2', video: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
        { id: '3', title: 'Video 3', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: '4', title: 'Video 4', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
        { id: '5', title: 'Video 5', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ];
   
    const kategori = [
        { id: 1, text: 'Hesap değiştir' },
        { id: 2, text: 'Google Hesabı' },
    ];
    const hesapSecenekleri = [
        { id: 1, text: 'Hesap Ekle' },
        { id: 2, text: "YouTube'u oturum kapalı olarak kullan" },
        {id:3,text:'Bu cihazdaki hesapları yönet'}
    ];
    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              const userData = await getUserInfo(user.uid);
              setUserInfo(userData);
            } else {
              setUserInfo(null);
            }
          } catch (error) {
            console.error('Kullanıcı bilgileri alınamadı:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserInfo();
    }, [auth]);


  if (loading) {  // girişi veya veri yüklemeyi temsil eder
    return <ActivityIndicator  // loading true olduğunda işlemin devam ettiğini gösteren yükleme göstergesi
    size='small' color="black" />;
  }
    const renderVideoItem=({item})=>{
        return(
        <View style={styles.item}>
            <View style={styles.videoContainer}>
            <Video
             source={{ uri: item.video }}
             resizeMode="stretch" // video alanının container içinin tamamını kaplar
             controls={true} // kullanıcı videoyu oynatabilir, ses ayarlayabilir, durdurabilir, ekranı büyütebilir
             style={styles.video}
      />
       <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
        )
    };
    const handlePress = () => {
        setModalVisible(true);  // görünür hale geldi
    };
      
    const renderModalItem = ({ item }) => (
        <Pressable style={styles.modalButton} onPress={() => {setActivePage(item.text);
            setModalVisible(false);}}    // aktif sayfayı ayarla ve modalı kapat
        > 
            <Text style={styles.modalButtonText}>{item.text}</Text>
           
        </Pressable>
    );

   

    const renderPage=()=>{
        switch(activePage){
            case 'Hesap Ekle':
                return <Giris />;
            case "YouTube'u oturum kapalı olarak kullan":
                return <Text>Sayfa bulunamadı</Text>;
            case'Bu cihazdaki hesapları yönet':
            return <HesaplariYonet />;
            case 'Videolarınız':
                return <Videolariniz/>;
            case 'İzleme süresi':
                return <IzlemeSuresi/>;
            case 'Filmleriniz':
                return <Filmler/>;
            case 'Yardım ve geri bildirim':
                return <Yardim/>;
            case 'YouTube Premium üyesi olun':
                return <YouTubePremium/>;
            case 'Geçmiş':
                return <History></History>;
            case 'Oynatma Listeleri':
                return <PlayList></PlayList>;
            default:
                 return (
                      <ScrollView contentContainerStyle={{ flexGrow: 1 ,paddingBottom:100,backgroundColor:'white'}}>
        <View style={{ flex: 1 ,flexDirection:'column'}}>
        <View style={styles.container}>
                <Icon name={'person-circle'} size={100} />
                {userInfo ? 
                (<Text style={{color:'black',fontSize:25,fontWeight:'600'}}>{userInfo.name}</Text>) :
                (<Text></Text>)}
                
        </View>

            <View style={styles.categoryContainer}>
                <FlatList
                    data={kategori}
                    renderItem={({ item }) => ( //butona basılma durumu
                        <Pressable style={styles.button} onPress={handlePress}> 
                            <Text style={styles.buttonText}>{item.text}
                            </Text>
                       </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                />
            </View>
            <View style={{margin:25,flexDirection:'row'}}>
                <Text style={[styles.buttonText, {width:220,fontWeight:'500',fontSize:25}]}>Geçmiş</Text>
                <Pressable style={styles.buton} onPress={()=>setActivePage('Geçmiş')}>
                <Text style={{color:'black',fontSize:15}}>Tümünü gör</Text>
                </Pressable>
            </View>
            <View >
                <FlatList 
                    data={data}
                    renderItem={renderVideoItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.videoList}
                />
            </View> 
            <View style={{margin:25,flexDirection:'row'}}>
                <Text style={[styles.buttonText, {width:220,fontWeight:'500',fontSize:23}]}>Oynatma Listeleri</Text>
                <Pressable style={styles.buton} onPress={()=>setActivePage('Oynatma Listeleri')}>  
                <Text style={{color:'black',fontSize:15}}>Tümünü gör</Text>
                </Pressable>
            </View>
            <View >
                <FlatList 
                    data={oynatmaListeleri}
                    renderItem={renderVideoItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.videoList}
                />
            </View> 
            <View style={{marginLeft:15,margin:5}}>
            <Pressable style={styles.secenek} onPress={()=>setActivePage('Videolarınız')}>
                <Icon style={styles.icon} name={'play'} size={20} />
                <Text style={{fontSize:20,color:'black'}}>Videolarınız</Text>
            </Pressable>
            </View>
            <View style={styles.line}></View>
            <View style={{marginLeft:15,margin:5}}>
            <Pressable style={styles.secenek} onPress={()=>setActivePage('Filmleriniz')}>
                <Icon style={styles.icon} name={'film'} size={20} />
                <Text style={{fontSize:20,color:'black'}}>Filmleriniz</Text>
            </Pressable>
            </View>
            <View style={{marginLeft:15}}>
            <Pressable style={styles.secenek} onPress={()=>setActivePage('YouTube Premium üyesi olun')}>
                <Icon style={styles.icon} name={'logo-youtube'} size={20} />
                <Text style={{fontSize:20,color:'black'}}>YouTube Premium üyesi olun</Text>
            </Pressable>
            </View>
            <View style={styles.line}></View>
            <View style={{marginLeft:15,margin:5}}>
            <Pressable style={styles.secenek} onPress={()=>setActivePage('İzleme süresi')}>
                <Icon style={styles.icon} name={'timer'} size={20} />
                <Text style={{fontSize:20,color:'black'}}>İzleme süresi</Text>
            </Pressable>
            </View>
            <View style={{marginLeft:15}}>
            <Pressable style={styles.secenek} onPress={()=>setActivePage('Yardım ve geri bildirim')}>
                <Icon style={styles.icon} name={'help-circle'} size={20} />
                <Text style={{fontSize:20,color:'black'}}>Yardım ve geri bildirim</Text>
            </Pressable>
            </View>
        </View>
        </ScrollView>
    );
        }
    };


return (
    <View style={{flex:1}}>
        {renderPage()}
        <Modal // modalVisibe durumuna göre gösteriliyor ya da gösterilmiyor
                animationType="slide" //modal ekrana kayarak açılıyor
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // gösterilmediği durum
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Hesaplar</Text>
                        <FlatList 
                            data={hesapSecenekleri} 
                            renderItem={renderModalItem}
                            keyExtractor={item => item.id.toString()}
                         
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginLeft: 60,
    },
    categoryContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 10,
    },
    button: {
        marginHorizontal: 6,
        paddingHorizontal: 20,
        height: 40,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#D6D6D6',
    },
    buton:{
        height:40,
        width:140,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:20,
        borderColor:'#BCBEBD',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left', // Metinlerin soldan hizalanması
        width: '100%', // Text genişliği butonun tamamını kaplamalı
    },
    secenek:{
        flexDirection:'row',
        height:40,
        backgroundColor:'white',
        width:width,
        marginLeft:10,
        alignItems:'center',
    },
    line:{
        width:'100%',
        height:1,
        backgroundColor:'#BCBEBD',
        margin:5,
    },
    text: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    categoryList: {
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    modalButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        width: '100%',
        alignItems: 'flex-start', // Buton içeriğini soldan hizala
    },
    modalButtonText: {
        fontSize: 18,
        color: 'black',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
        width: width/3,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    item:{
        marginRight:5, // videolar arasında boşluk bırak
    },
    videoContainer:{
        margin:10,
        marginTop:0,
        height:150,
        width:250,
        borderRadius:10,
        overflow:'hidden' // borderRadius çalışmasını sağla
    },
    video:{
        height:'100%',
        width:'100%'
    },
    videoList:{
        alignItems:'center',
    },
    title:{
        fontSize:17,
        color:'black'
    },
    icon:{
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        color:'black'
    },
  
});

export default Profil;
