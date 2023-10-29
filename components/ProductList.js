import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDhsB4mw--bg4Rp8YJ73k8T4awfcL4Z7zw",
  authDomain: "k-mart-1cf75.firebaseapp.com",
  databaseURL: "https://k-mart-1cf75-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "k-mart-1cf75",
  storageBucket: "k-mart-1cf75.appspot.com",
  messagingSenderId: "43837954833",
  appId: "1:43837954833:web:768248a59daa6d05704ab0"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const ProductList = ({ selectedCategory, cartItems, addToCart }) => {
  const [products, setProducts] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 600 ? 3 : 1;
  const [hoverStates, setHoverStates] = useState([]);

  useEffect(() => {
    // Reference to the "products" node in your database
    const productsRef = ref(db, 'products');

    // Fetch the products
    get(productsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data) {
            const productArray = Object.values(data);

            // Filter products based on the selected category
            const filteredProducts = selectedCategory === 'Home'
              ? productArray
              : productArray.filter(product => product.category === selectedCategory);

            setProducts(filteredProducts);

            // Initialize hover states for each product to false
            setHoverStates(filteredProducts.map(() => false));
          }
        } else {
          // No data found
          setProducts([]);
          setHoverStates([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedCategory]);

  const handleAddToCartClick = (product, index) => {
    addToCart(product);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.photo }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>INR {item.price}</Text>
            <TouchableOpacity
              style={[
                styles.Button,
                hoverStates[index] && {
                  backgroundColor: 'orange',
                  borderColor: 'white',
                },
              ]}
              onPress={() => handleAddToCartClick(item, index)}
              onPressIn={() => {
                const updatedHoverStates = [...hoverStates];
                updatedHoverStates[index] = true;
                setHoverStates(updatedHoverStates);
              }}
              onPressOut={() => {
                const updatedHoverStates = [...hoverStates];
                updatedHoverStates[index] = false;
                setHoverStates(updatedHoverStates);
              }}
            >
              <Text style={{ fontWeight: '600', color: hoverStates[index] ? 'white' : 'black' }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 16,
  },
  Button: {
    marginTop: 4,
    alignItems: 'center',
    padding: 3,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'orange',
    fontWeight: '700',
  },
});

export default ProductList;
