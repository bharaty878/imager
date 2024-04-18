import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet,Text, ActivityIndicator, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []); // Fetch images on component mount

  const fetchImages = async () => {
    try {
      const response = await fetch('https://api.pexels.com/v1/curated?per_page=140', {
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

  const filteredImages = images.filter(item => {
    // Filter images based on searchKeyword
    return item.photographer.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for images..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <Button title="Search" onPress={fetchImages} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredImages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item.src.medium)}>
              <CachedImage
                source={{ uri: item.src.medium }}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                        <Text style={{color:"white"}}>close</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default Home;













