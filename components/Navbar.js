import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar({ onCategorySelect, navigateToCart }) {
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 600;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Home');

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleCategorySelect = (category) => {
    if (category === 'Cart') {
      navigateToCart();
    } else {
      setSelectedCategory(category);
      onCategorySelect(category);
    }
  };

  const getNavItemStyle = (category) => {
    return {
      ...styles.navItem,
      color: selectedCategory === category ? 'orange' : 'white',
    };
  };

  if (isMobile) {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="ios-menu" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Text style={styles.logoText}>KMART</Text>
        </View>
        <Modal
          visible={isMenuVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.mobileMenu}>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="ios-close" size={30} color="white" />
            </TouchableOpacity>
            <Text
              style={getNavItemStyle('Home')}
              onPress={() => handleCategorySelect('Home')}
            >
              Home
            </Text>
            <Text
              style={getNavItemStyle('Men')}
              onPress={() => handleCategorySelect('Men')}
            >
              Men
            </Text>
            <Text
              style={getNavItemStyle('Women')}
              onPress={() => handleCategorySelect('Women')}
            >
              Women
            </Text>
            <Text
              style={getNavItemStyle('Electronics')}
              onPress={() => handleCategorySelect('Electronics')}
            >
              Electronics
            </Text>
            <Text
              style={getNavItemStyle('Kids')}
              onPress={() => handleCategorySelect('Kids')}
            >
              Kids
            </Text>
            <Text
              style={getNavItemStyle('Home-Decor')}
              onPress={() => handleCategorySelect('Home-Decor')}
            >
              Home-Decor
            </Text>
            <Text
              style={getNavItemStyle('Cart')}
              onPress={() => handleCategorySelect('Cart')}
            >
              Cart
            </Text>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handleCategorySelect('Home')}>
        <Text style={getNavItemStyle('Home')}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Men')}>
        <Text style={getNavItemStyle('Men')}>Men</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Women')}>
        <Text style={getNavItemStyle('Women')}>Women</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Electronics')}>
        <Text style={getNavItemStyle('Electronics')}>Electronics</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Kids')}>
        <Text style={getNavItemStyle('Kids')}>Kids</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Home-Decor')}>
        <Text style={getNavItemStyle('Home-Decor')}>Home-Decor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategorySelect('Cart')}>
        <Text style={getNavItemStyle('Cart')}>Cart</Text>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Text style={styles.logoText}>KMART</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'darkslategray',
    paddingHorizontal: 10,
    height: 60,
    width: '100%',
  },
  
  navItem: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  
  logo: {
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 100,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  logoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  mobileMenu: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'darkslategray',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  mobileMenuItem: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
});

