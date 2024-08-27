import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Profil from "./Profil";

const { height, width } = Dimensions.get('window');

/* Bar bileşeni ile her gün için bir çubuk  oluşturyorum
günlük izleme ile haftanın en yüksek izlemesinin oranının yüzdelik hesabanı buluyorum
*/
const Bar = ({ label, value, maxValue }) => {
  const barHeight = (value / maxValue) * 100; // Yüzdelik hesaplama

  return (
    <View style={styles.barContainer}>
      <View style={[styles.bar, { height: `${barHeight}%` }]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

// Ana bileşen: Haftalık izleme süresini gösteren grafik
const IzlemeSuresi = () => {
  const watchTimes = [
    { day: 'Pazartesi', minutes: 120 },
    { day: 'Salı', minutes: 90 },
    { day: 'Çarşamba', minutes: 75 },
    { day: 'Perşembe', minutes: 60 },
    { day: 'Cuma', minutes: 45 },
    { day: 'Cumartesi', minutes: 130 },
    { day: 'Pazar', minutes: 100 }
  ];

  const maxValue = Math.max(...watchTimes.map(item => item.minutes));

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [activePage, setActivePage] = useState('IzlemeSuresi');

  const toggleVisibility1 = () => {
    setIsVisible(!isVisible);
  };

  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };

  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Profil':
        return <Profil />;
      default:
        return (
          <View style={styles.x}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => setActivePage('Profil')}>
              <Icon name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <View style={styles.chartContainer}>
              {watchTimes.map(item => (
                <Bar key={item.day} label={item.day} value={item.minutes} maxValue={maxValue} />
              ))}
            </View>
            <View style={{ flexDirection: 'column', marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={styles.text}>Bugün</Text>
                <Text style={{ marginLeft: 200 }}>20 dk.</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={styles.text}>Son 7 gün</Text>
                <Text style={{ marginLeft: 10 }}>370 dk.</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>İstatistikler için YouTube ürünlerindeki (YouTube Music ve YouTube TV hariç) izleme geçmişiniz alınmıştır.</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.text, { marginRight: 70 }]}>Video izlemeye ara vermeyi hatırlat</Text>
                <TouchableOpacity onPress={toggleVisibility1}>
                  <Icon name={isVisible ? 'arrow-forward' : 'arrow-back-sharp'} size={20} color={isVisible ? 'blue' : 'grey'} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Text style={[styles.text, { marginRight: 70 }]}>Uyku vaktini hatırlat</Text>
                <TouchableOpacity onPress={toggleVisibility2}>
                  <Icon name={isVisible2 ? 'arrow-forward' : 'arrow-back-sharp'} size={20} color={isVisible2 ? 'blue' : 'grey'} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Text style={[styles.text, { marginRight: 70 }]}>Cep telefonu/tablette otomatik oynatma</Text>
                <TouchableOpacity onPress={toggleVisibility3}>
                  <Icon name={isVisible3 ? 'arrow-forward' : 'arrow-back-sharp'} size={20} color={isVisible3 ? 'blue' : 'grey'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        );
    }
  };

  return (
    <View style={{flex:1}}>
      {renderPage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10
  },
  x: {
    width: width,
    height: 300,
    backgroundColor: 'white'
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 130
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 30,
    backgroundColor: '#026CA8',
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#BCBEBD',
    margin: 5,
    marginTop: 10,
    marginBottom: 20
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  }
});

export default IzlemeSuresi;
