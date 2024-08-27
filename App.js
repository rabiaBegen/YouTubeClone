import React, { useState } from "react";
import { View ,Text, KeyboardAvoidingView, Platform} from "react-native";

import Home from "./screens/Home";
import Shorts from "./screens/Shorts";
import Profil from "./screens/Profil";
import Header from "./Header";
import Navbar from './components/Navbar';
import AddVideo from './screens/AddVideo';
import Abonelikler from './screens/Abonelikler';




import { initializeApp,getApps} from 'firebase/app';
// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyD7NRZ7K_DgBfiJZtwen72dusHQmmjzw3U",
  authDomain: "clone-dfaad.firebaseapp.com",
  projectId: "clone-dfaad",
  storageBucket: "clone-dfaad.appspot.com",
  messagingSenderId: "810748468377",
  appId: "1:810748468377:android:acd97715aa564c9aa36c08",
};


// Firebase'i başlat (yalnızca eğer başlatılmamışsa)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Zaten başlatılmış olan uygulamayı kullan
}



const App=()=>{
  const [activeScreen,setActiveScreen]=useState('Anasayfa');
  const [searching, setSearching] = useState(false);

  const renderScreen=()=>{
    switch(activeScreen){
      case 'Anasayfa':
        return(
        <Home 
        searching={searching}        
          />
        );
      case 'Shorts':
        return <Shorts></Shorts>;
      case 'Siz':
        return <Profil></Profil>;
      case 'Ekle':
        return <AddVideo/>;
      case 'Abonelikler':
        return <Abonelikler/>;
      default:
        return <Text>404 - Not Found </Text>;
    }
  };
  const navbarItems = [
    { icon: 'home-outline', text: 'Anasayfa' },
    { icon: 'play-circle-outline', text: 'Shorts' },
    { icon: 'add-circle-outline', text: 'Ekle' },
    { icon: 'notifications-outline', text: 'Abonelikler' },
    { icon: 'person-circle-outline', text: 'Siz' },
  ];

  return(
    <View style={{flex:1}}>
       
       <Header title="YouTube" searching={searching} setSearching={setSearching} navigate={setActiveScreen} />
    <KeyboardAvoidingView  //navbarın klavyenin üstüne çıkmaması için
    style={{flex:1}}
    behavior={Platform.OS==='windows'?'padding':'height'}
    >
        {renderScreen()}
        {!searching && <Navbar items={navbarItems} setActivePage={setActiveScreen} />}
  
    </KeyboardAvoidingView>
    </View>
  );
  
}

export default App;
