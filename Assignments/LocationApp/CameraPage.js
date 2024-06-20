import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, Modal, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CameraPage = () => {
    const cameraRef = useRef(null);
    const [photos, setPhotos] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            setPhotos([...photos, photo.uri]);
        }
    };

    const handleThumbnailPress = (index) => {
        setSelectedPhotoIndex(index);
        setModalVisible(true);
    };

    const handleLocation = (MapPage) => {
        navigation.navigate(MapPage);
    };

    const handleChat = (ChatPage) => {
        navigation.navigate(ChatPage);
    };

    const handleSearch = (SearchPage) => {
        navigation.navigate(SearchPage);
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuBar}>

                <TouchableOpacity onPress={() => handleLocation('MapPage')} style={styles.menuButton}>
                    <Ionicons name="location" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChat('ChatPage')} style={styles.menuButton}>
                    <Ionicons name="chatbubbles" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSearch('SearchPage')} style={styles.menuButton}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                />
            </View>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={styles.photosContainer}>
                {photos.map((photoUri, index) => (
                    <TouchableOpacity key={index} onPress={() => handleThumbnailPress(index)}>
                        <Image source={{ uri: photoUri }} style={styles.photo} />
                    </TouchableOpacity>
                ))}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={{ uri: photos[selectedPhotoIndex] }} style={styles.fullPhoto} />
                        <Button style={{ marginTop: 10 }} title="Close" onPress={() => setModalVisible(false)} />
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
        alignItems: 'center',
    },
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    menuButton: {
        paddingHorizontal: 10,
    },
    cameraContainer: {
        width: Dimensions.get('window').width * 0.8,
        aspectRatio: 3 / 4,
        overflow: 'hidden',
        marginTop: 50,
    },
    camera: {
        flex: 1,
    },
    captureButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    photo: {
        width: 80,
        height: 80,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    fullPhoto: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain',
    },
});

export default CameraPage;
