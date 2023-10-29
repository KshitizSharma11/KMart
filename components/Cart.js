import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartHeader}>Shopping Cart</Text>
      {cartItems.length === 0 ? ( // Check if cart is empty
        <Text style={styles.emptyCartText}>Your Cart Is Empty 🗑️</Text>
      ) : (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <View style={styles.productInfo}>
              <Image source={{ uri: item.photo }} style={styles.productImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>Price: INR {item.price}</Text>
              </View>
            </View>
            <TouchableHighlight
              style={styles.removeButton}
              onPress={() => removeFromCart(index)}
              underlayColor="Orange" // Set the background color when pressed
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableHighlight>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    padding: 16,
  },
  cartHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 24,
    marginTop: '11%',
    textAlign: 'center',
  },
  cartItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'teal',
    marginTop: 8,
    width: '100%',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: 2,
  },
});

export default Cart;
