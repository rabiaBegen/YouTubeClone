import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, ScrollView,alert } from 'react-native';

const YouTubePremium = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: 'https://example.com/youtube-premium-logo.png' }} 
          style={styles.logo}
        />
        <Text style={styles.title}>YouTube Premium</Text>
        <Text style={styles.subtitle}>Reklamsız bir deneyim ve özel özellikler için YouTube Premium</Text>
        
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Avantajlar:</Text>
          <Text style={styles.benefit}>✓ Reklamsız videolar</Text>
          <Text style={styles.benefit}>✓ Arka planda oynatma</Text>
          <Text style={styles.benefit}>✓ Çevrimdışı indirme</Text>
          <Text style={styles.benefit}>✓ YouTube Music Premium erişimi</Text>
        </View>
        
        <Pressable style={styles.subscribeButton} >
          <Text style={styles.subscribeText}>Üyelik Al</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  benefit: {
    fontSize: 16,
    color: '#555555',
  },
  subscribeButton: {
    backgroundColor: '#FF0000', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width:200,
  },
  subscribeText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default YouTubePremium;
