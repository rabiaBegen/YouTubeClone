// Import Firebase functions

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';



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

const auth = getAuth(app);
const db = getFirestore(app);

// Kullanıcı kaydı fonksiyonu
export const registerUser = async (email, phoneNumber, password, additionalInfo) => {
  try {
    // Auth ve Firestore nesnelerini kontrol etme
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name: additionalInfo.name,
      day: additionalInfo.selectedDay,
      month: additionalInfo.selectedMonth,
      year: additionalInfo.selectedYear,
      gender: additionalInfo.selectedGender,
      phoneNumber: phoneNumber,
    });

    return user;
  } catch (error) {
    console.log("Kullanıcı kaydı sırasında hata: ", error);
    throw error;
  }
}


// E-mail ile giriş fonksiyonu
export const emailPasswordLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
}

// kullanıcı bilgilerini alan fonk
export const getUserInfo = async (uid) => {
  try {
    
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('Kullanıcı bilgisi bulunamadı');
    }
  } catch (error) {
    console.log('Kullanıcı bilgileri alınamadı:', error);
    throw error;
  }
};

