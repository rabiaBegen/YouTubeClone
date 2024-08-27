import React, { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CountryCode=()=>{
    const [selectedCountryCode,setSelectedCountryCode]=useState('+90'); // varsayılan Türkiye
    const [modalVisibe,setModalVisible]=useState(false);
    const [searchQuery,setSearchQuery]=useState(''); // arama sorgusu durumu
    const [filteredCountryCode,setFilteredCountryCode]=useState([]); // filtrelenmiş ülke kodları

    //telefon kodları
    const countryCodes = [
        { code: '+1', country: 'ABD Virjin Adaları' },
        { code: '+93', country: 'Afganistan' },
        { code: '+49', country: 'Almanya' },
        { code: '+1', country: 'Amerika Birleşik Devletleri' },
        { code: '+1', country: 'Amerikan Samoası' },
        { code: '+376', country: 'Andorra' },
        { code: '+244', country: 'Angola' },
        { code: '+1', country: 'Anguilla' },
        { code: '+1', country: 'Antigua ve Barbuda' },
        { code: '+54', country: 'Arjantin' },
        { code: '+355', country: 'Arnavutluk' },
        { code: '+297', country: 'Aruba' },
        { code: '+247', country: 'Ascension Adası' },
        { code: '+61', country: 'Avustralya' },
        { code: '+43', country: 'Avusturya' },
        { code: '+994', country: 'Azerbaycan' },
        { code: '+1', country: 'Bahamalar' },
        { code: '+973', country: 'Bahreyn' },
        { code: '+880', country: 'Bangladeş' },
        { code: '+1', country: 'Barbados' },
        { code: '+375', country: 'Belarus' },
        { code: '+32', country: 'Belçika' },
        { code: '+501', country: 'Belize' },
        { code: '+229', country: 'Benin' },
        { code: '+1', country: 'Bermuda' },
        { code: '+971', country: 'Birleşik Arap Emirlikleri' },
        { code: '+44', country: 'Birleşik Krallık' },
        { code: '+591', country: 'Bolivya' },
        { code: '+387', country: 'Bosna-Hersek' },
        { code: '+267', country: 'Botsvana' },
        { code: '+55', country: 'Brezilya' },
        { code: '+246', country: 'Britanya Hint Okyanusu Toprakları' },
        { code: '+1', country: 'Britanya Virjin Adaları' },
        { code: '+673', country: 'Brunei' },
        { code: '+359', country: 'Bulgaristan' },
        { code: '+226', country: 'Burkina Faso' },
        { code: '+257', country: 'Burundi' },
        { code: '+975', country: 'Butan' },
        { code: '+238', country: 'Cabo Verde' },
        { code: '+1', country: 'Cayman Adaları' },
        { code: '+350', country: 'Cebelitarık' },
        { code: '+213', country: 'Cezayir' },
        { code: '+253', country: 'Cibuti' },
        { code: '+682', country: 'Cook Adaları' },
        { code: '+225', country: 'Côte d’Ivoire' },
        { code: '+599', country: 'Curaçao' },
        { code: '+235', country: 'Çad' },
        { code: '+420', country: 'Çekya' },
        { code: '+86', country: 'Çin' },
        { code: '+45', country: 'Danimarka' },
        { code: '+1', country: 'Dominik Cumhuriyeti' },
        { code: '+1', country: 'Dominika' },
        { code: '+593', country: 'Ekvador' },
        { code: '+240', country: 'Ekvator Ginesi' },
        { code: '+503', country: 'El Salvador' },
        { code: '+62', country: 'Endonezya' },
        { code: '+291', country: 'Eritre' },
        { code: '+374', country: 'Ermenistan' },
        { code: '+372', country: 'Estonya' },
        { code: '+268', country: 'Esvatini' },
        { code: '+251', country: 'Etiyopya' },
        { code: '+500', country: 'Falkland Adaları (Malvinas Adaları)' },
        { code: '+298', country: 'Faroe Adaları' },
        { code: '+212', country: 'Fas' },
        { code: '+679', country: 'Fiji' },
        { code: '+63', country: 'Filipinler' },
        { code: '+970', country: 'Filistin' },
        { code: '+358', country: 'Finlandiya' },
        { code: '+33', country: 'Fransa' },
        { code: '+594', country: 'Fransız Guyanası' },
        { code: '+689', country: 'Fransız Polinezyası' },
        { code: '+241', country: 'Gabon' },
        { code: '+220', country: 'Gambiya' },
        { code: '+233', country: 'Gana' },
        { code: '+224', country: 'Gine' },
        { code: '+245', country: 'Gine-Bissau' },
        { code: '+1', country: 'Grenada' },
        { code: '+299', country: 'Grönland' },
        { code: '+590', country: 'Guadeloupe' },
        { code: '+1', country: 'Guam' },
        { code: '+502', country: 'Guatemala' },
        { code: '+592', country: 'Guyana' },
        { code: '+27', country: 'Güney Afrika' },
        { code: '+82', country: 'Güney Kore' },
        { code: '+211', country: 'Güney Sudan' },
        { code: '+995', country: 'Gürcistan' },
        { code: '+509', country: 'Haiti' },
        { code: '+385', country: 'Hırvatistan' },
        { code: '+91', country: 'Hindistan' },
        { code: '+31', country: 'Hollanda' },
        { code: '+504', country: 'Honduras' },
        { code: '+852', country: 'Hong Kong' },
        { code: '+964', country: 'Irak' },
        { code: '+98', country: 'İran' },
        { code: '+353', country: 'İrlanda' },
        { code: '+34', country: 'İspanya' },
        { code: '+972', country: 'İsrail' },
        { code: '+46', country: 'İsveç' },
        { code: '+41', country: 'İsviçre' },
        { code: '+39', country: 'İtalya' },
        { code: '+354', country: 'İzlanda' },
        { code: '+1', country: 'Jamaika' },
        { code: '+81', country: 'Japonya' },
        { code: '+855', country: 'Kamboçya' },
        { code: '+237', country: 'Kamerun' },
        { code: '+1', country: 'Kanada' },
        { code: '+382', country: 'Karadağ' },
        { code: '+599', country: 'Karayip Hollandası' },
        { code: '+974', country: 'Katar' },
        { code: '+7', country: 'Kazakistan' },
        { code: '+254', country: 'Kenya' },
        { code: '+357', country: 'Kıbrıs' },
        { code: '+996', country: 'Kırgızistan' },
        { code: '+686', country: 'Kiribati' },
        { code: '+57', country: 'Kolombiya' },
        { code: '+269', country: 'Komorlar' },
        { code: '+242', country: 'Kongo - Brazavil' },
        { code: '+243', country: 'Kongo - Kinşasa' },
        { code: '+383', country: 'Kosova' },
        { code: '+506', country: 'Kosta Rika' },
        { code: '+965', country: 'Kuveyt' },
        { code: '+850', country: 'Kuzey Kore' },
        { code: '+389', country: 'Kuzey Makedonya' },
        { code: '+1', country: 'Kuzey Mariana Adaları' },
        { code: '+53', country: 'Küba' },
        { code: '+856', country: 'Laos' },
        { code: '+266', country: 'Lesotho' },
        { code: '+371', country: 'Letonya' },
        { code: '+231', country: 'Liberya' },
        { code: '+218', country: 'Libya' },
        { code: '+423', country: 'Liechtenstein' },
        { code: '+370', country: 'Litvanya' },
        { code: '+961', country: 'Lübnan' },
        { code: '+352', country: 'Lüksemburg' },
        { code: '+36', country: 'Macaristan' },
        { code: '+261', country: 'Madagaskar' },
        { code: '+853', country: 'Makao' },
        { code: '+265', country: 'Malavi' },
        { code: '+960', country: 'Maldivler' },
        { code: '+60', country: 'Malezya' },
        { code: '+223', country: 'Mali' },
        { code: '+356', country: 'Malta' },
        { code: '+692', country: 'Marshall Adaları' },
        { code: '+596', country: 'Martinik' },
        { code: '+230', country: 'Mauritius' },
        { code: '+52', country: 'Meksika' },
        { code: '+20', country: 'Mısır' },
        { code: '+691', country: 'Mikronezya' },
        { code: '+976', country: 'Moğolistan' },
        { code: '+373', country: 'Moldova' },
        { code: '+377', country: 'Monako' },
        { code: '+1', country: 'Montserrat' },
        { code: '+222', country: 'Moritanya' },
        { code: '+258', country: 'Mozambik' },
        { code: '+95', country: 'Myanmar (Burma)' },
        { code: '+264', country: 'Namibya' },
        { code: '+674', country: 'Nauru' },
        { code: '+977', country: 'Nepal' },
        { code: '+227', country: 'Nijer' },
        { code: '+234', country: 'Nijerya' },
        { code: '+505', country: 'Nikaragua' },
        { code: '+683', country: 'Niue' },
        { code: '+672', country: 'Norfolk Adası' },
        { code: '+47', country: 'Norveç' },
        { code: '+236', country: 'Orta Afrika Cumhuriyeti' },
        { code: '+998', country: 'Özbekistan' },
        { code: '+92', country: 'Pakistan' },
        { code: '+680', country: 'Palau' },
        { code: '+507', country: 'Panama' },
        { code: '+675', country: 'Papua Yeni Gine' },
        { code: '+595', country: 'Paraguay' },
        { code: '+51', country: 'Peru' },
        { code: '+48', country: 'Polonya' },
        { code: '+351', country: 'Portekiz' },
        { code: '+1', country: 'Porto Riko' },
        { code: '+262', country: 'Reunion' },
        { code: '+40', country: 'Romanya' },
        { code: '+250', country: 'Ruanda' },
        { code: '+7', country: 'Rusya' },
        { code: '+590', country: 'Saint Barthelemy' },
        { code: '+290', country: 'Saint Helena' },
        { code: '+1', country: 'Saint Kitts ve Nevis' },
        { code: '+1', country: 'Saint Lucia' },
        { code: '+590', country: 'Saint Martin' },
        { code: '+508', country: 'Saint Pierre ve Miquelon' },
        { code: '+1', country: 'Saint Vincent ve Grenadinler' },
        { code: '+685', country: 'Samoa' },
        { code: '+378', country: 'San Marino' },
        { code: '+239', country: 'Sao Tome ve Principe' },
        { code: '+221', country: 'Senegal' },
        { code: '+248', country: 'Seyşeller' },
        { code: '+381', country: 'Sırbistan' },
        { code: '+232', country: 'Sierra Leone' },
        { code: '+65', country: 'Singapur' },
        { code: '+1', country: 'Sint Maarten' },
        { code: '+421', country: 'Slovakya' },
        { code: '+386', country: 'Slovenya' },
        { code: '+677', country: 'Solomon Adaları' },
        { code: '+252', country: 'Somali' },
        { code: '+94', country: 'Sri Lanka' },
        { code: '+249', country: 'Sudan' },
        { code: '+597', country: 'Surinam' },
        { code: '+963', country: 'Suriye' },
        { code: '+966', country: 'Suudi Arabistan' },
        { code: '+56', country: 'Şili' },
        { code: '+992', country: 'Tacikistan' },
        { code: '+255', country: 'Tanzanya' },
        { code: '+66', country: 'Tayland' },
        { code: '+886', country: 'Tayvan' },
        { code: '+670', country: 'Timor-Leste' },
        { code: '+228', country: 'Togo' },
        { code: '+690', country: 'Tokelau' },
        { code: '+676', country: 'Tonga' },
        { code: '+1', country: 'Trinidad ve Tobago' },
        { code: '+216', country: 'Tunus' },
        { code: '+1', country: 'Turks ve Caicos Adaları' },
        { code: '+688', country: 'Tuvalu' },
        { code: '+90', country: 'Türkiye' },
        { code: '+993', country: 'Türkmenistan' },
        { code: '+256', country: 'Uganda' },
        { code: '+380', country: 'Ukrayna' },
        { code: '+968', country: 'Umman' },
        { code: '+598', country: 'Uruguay' },
        { code: '+962', country: 'Ürdün' },
        { code: '+678', country: 'Vanuatu' },
        { code: '+39', country: 'Vatikan' },
        { code: '+58', country: 'Venezuela' },
        { code: '+84', country: 'Vietnam' },
        { code: '+681', country: 'Wallis ve Futuna' },
        { code: '+967', country: 'Yemen' },
        { code: '+687', country: 'Yeni Kaledonya' },
        { code: '+64', country: 'Yeni Zelanda' },
        { code: '+30', country: 'Yunanistan' },
        { code: '+260', country: 'Zambiya' },
        { code: '+263', country: 'Zimbabve' },
      ];
      
      const selectCountryCode=(code)=>{
        setSelectedCountryCode(code);
        setModalVisible(false);
        setSearchQuery(''); // arama sorgusunu sıfırlama
        setFilteredCountryCode(countryCodes); // filtrelenmiş listeyi sıfırlıyor
      }

      const filterCountryCodes=(query)=>{
        setSearchQuery(query);
        if(query===''){
            setFilteredCountryCode(countryCodes);
        }
        else{
            setFilteredCountryCode(countryCodes.filter((item)=>
            item.country.toLowerCase().includes(query.toLowerCase())))
        }
      }

      // dropdown select list 

      return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown}
             onPress={()=>{setModalVisible(true)
                setFilteredCountryCode(countryCodes); // modal açıldığında tüm ülke kodlarını göster
             }}
 >
    <Text>{selectedCountryCode}</Text>
    </TouchableOpacity>   
    <TextInput
    style={styles.input}
    placeholder="Telefon numarası"
    keyboardType="phone-pad"
    />
    <Modal 
    visible={modalVisibe} 
    transparent={true} 
    animationType="slide">
        <TouchableOpacity style={styles.modalContainer} onPress={()=>setModalVisible(false)}>
            <View style={styles.modalContent}>
                <TextInput 
                style={styles.searchInput}
                placeholder="Ülke ara"
                value={searchQuery}
                onChangeText={filterCountryCodes}
                />
                <FlatList
                data={countryCodes}
                keyExtractor={(item)=>item.code}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.option} onPress={()=>selectCountryCode(item.code)}>
                        <Text style={{color:'black', fontSize:15}} >{item.country} {item.code}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
        </TouchableOpacity>
    </Modal>
        </View>
      )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    dropdown:{
        padding:12,
        borderWidth:1,
        borderColor:'grey',
        marginRight:10,
        borderRadius:5,
     
    },
    input:{
        flex:1,
        borderWidth:1,
        borderColor:'grey',
        padding:10,
        borderRadius:5,
        backgroundColor:'white'
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    },
    modalContent:{
        height:600,
        width:'80%',
        backgroundColor:'white',
        padding:20,
        borderRadius:10,
    },
    option:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#e0e0e0', // Ayrım çizgisi rengi
        color:'black'
    },
    searchInput:{
        borderWidth:1,
        borderColor:'grey',
        backgroundColor:'#f1f1f1',
        padding:10,
        borderRadius:10,
        marginBottom:10
    }
})

export default CountryCode;