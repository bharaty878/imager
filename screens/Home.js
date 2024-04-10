
import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);


    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/curated?per_page=40', {
          headers: {
            'Authorization': 'k16S13krSKBBFtESjuZmuH5AlZZ2Cl5rZCCKIDtQ589eE5EX84ULXN9T'
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
    
        const data = await response.json();
        setImages(data.photos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false); // Set loading to false to stop the ActivityIndicator
      }
    };

  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CachedImage
            source={{ uri: item.src.medium }}
            style={styles.image}
          />
          
          )}
        />
      )}
      <Button title='press' onPress={()=>fetchImages()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
});

export default Home;