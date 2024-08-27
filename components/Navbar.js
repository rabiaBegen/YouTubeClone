import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const {width}=Dimensions.get('window');

const Navbar = ({ items = [], setActivePage }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index, page) => {
    setSelectedIndex(index);
    setActivePage(page);
  };

  return (
    <View style={styles.navBar}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={() => [
            styles.iconContainer,
            { backgroundColor: selectedIndex === index ? '#D9E3F0' : 'white' }
          ]}
          onPress={() => handlePress(index, item.text)}
        >
          {item.icon && <Icon name={item.icon} size={24} />}
          <Text style={styles.iconText}>{item.text}</Text>
        </Pressable>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  navBar: {
    height: 60,
    width:width,
    width: "100%",
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
 
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight:6,
    marginLeft:6,
    padding: 10,
  },
  iconText: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Navbar;
