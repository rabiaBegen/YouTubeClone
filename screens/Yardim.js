import React from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const {height,width}=Dimensions.get('window');

const Yardim=()=>{
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1 ,paddingBottom:100,backgroundColor:'white'}}>
        <View style={styles.container}>
            <Text style={styles.text}>Popüler yardım kaynakları</Text>
            <View style={{flexDirection:'column'}}>
                <Pressable style={styles.buttonContainer}>
                    <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={'document-text-outline'} size={20}/>
                    </View>
                    <Text style={styles.buttonText}>YouTube arama geçmişinizi görüntüleme veya silme</Text>
                </Pressable>
                <Pressable style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={'document-text-outline'} size={20}/>
                    </View>
                    <Text style={styles.buttonText}>Kanal ayarlarını yönetme</Text>
                </Pressable>
                <Pressable style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={'document-text-outline'} size={20}/>
                    </View>
                    <Text style={styles.buttonText}>İzleme geçmişini görüntüleme, silme, etkinleştirme ya da devre dışı bırakma</Text>
                </Pressable>
                <Pressable style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={'document-text-outline'} size={20}/>
                    </View>
                    <Text style={styles.buttonText}>YouTube'da oturum açma ve oturumu kapatma</Text>
                </Pressable>
                <Pressable style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={'document-text-outline'} size={20}/>
                    </View>
                    <Text style={styles.buttonText}>YouTube kanallarına abone olma</Text>
                </Pressable>
                <Pressable style={[styles.buttonContainer,{justifyContent:'center'}]}>
                <Text style={[styles.buttonText,{color:'#407CE2'}]}>Yardım Forumu'na gidin</Text>
                    <Icon style={styles.icon} name={'arrow-forward-circle'} size={20}/>
                </Pressable>
            </View>
            <View style={{alignItems:'center'}}>
                <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput}
                placeholder="Yardım Sayfalarında Ara">
                </TextInput>
                <Icon name={'search'} size={20} color={'grey'}/>
                </View>
                <View style={styles.xContainer}></View>
            </View>
            <View style={{marginTop:10}}>
                <Text style={styles.text}>Daha fazla yardıma mı ihtiyacınız var?</Text>
            </View>
            <View >
                <Pressable style={styles.buttonContainer}>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon} name={'chatbubble'} size={20} />
                    </View>
                    <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Yardım Topluluğuna sorun</Text>
            <Text style={styles.subText}>Topluluk uzmanlarından yanıt alın</Text> 
             </View>
                    <Icon style={styles.icon} name={'arrow-forward-circle'} size={20}/>
                    
                </Pressable>   
            </View>
            <View style={styles.xContainer}></View>
            <View style={{flexDirection:'column'}}>
                <Pressable style={styles.buttonContainer}>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon} name={'alert-circle'} size={20}/>
                    </View>
                    <Text style={[styles.buttonText,{color:'#407CE2'}]}>Geri bildirim gönder</Text>
                </Pressable>
            </View>
        </View>
        </ScrollView>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        margin:10,
    },
    xContainer:{
        backgroundColor:'#D6D6D6',
        height:8,
        width:width,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text:{
        fontSize:17,
        color:'black',
        fontWeight:'500'
    },
    buttonContainer:{
        flexDirection:'row',
        margin:20,
        alignItems:'center',
     },
     buttonText:{
        fontSize:17,
        color:'black',
     },
     icon:{
        alignItems:'center',
        justifyContent:'center',
        color:'#407CE2',
        padding:10
     },
     iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20, // Yarıçapı genişliğin yarısı kadar yaparak daire şekli elde edersiniz
        backgroundColor: '#DCE7FA', // Container arka plan rengi
        marginRight: 10,
    },
    searchInput: {
        flex: 1, // TextInput genişliğini esnetir
        padding: 8,
        fontSize: 16,
      },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 20,
        paddingHorizontal: 10,
        width: '80%', // Genişlik ayarı
        marginBottom:20
      },
      subText: {
        fontSize: 14,
        color: 'gray', // Alt metin rengi
    },
})

export default Yardim;