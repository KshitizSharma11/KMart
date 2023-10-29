import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Cart from './components/Cart'; // Import the Cart component

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Set the StatusBar style to dark content (black text on light background)
    StatusBar.setBarStyle('dark-content');
  }, []);

  const addToCart = (product) => {
    // Add a product to the cart
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    // Remove a product from the cart
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <Navbar onCategorySelect={setSelectedCategory} navigateToCart={() => setSelectedCategory('Cart')} />
        {selectedCategory === 'Cart' && <Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
        <ProductList
          selectedCategory={selectedCategory}
          cartItems={cartItems}
          addToCart={addToCart}
        />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
