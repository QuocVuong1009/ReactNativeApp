import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Modal, Button, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailAPI } from '../redux/detailAction';
import { deleteAPI } from '../redux/deleteAction';
import { totalAPI } from '../redux/totalAction';

const Home = ({route, navigation}) => {
    const {keyName, specific} = route.params;
    const [isVisible, setVisible] = useState(false);
    const isLoading = useSelector(store => store.detail.isLoading || false);
    const hasSearched = useSelector(store => store.detail.hasSearched || false);
    const dispatch = useDispatch();
    const response = useSelector(store => store.detail.payload.response || []);
    const image = useSelector(store => store.detail.payload.image || '');

    const showModal = () => setVisible(true);

    const closeModal = () => setVisible(false)

    const acecptDelete = () => {
        dispatch(deleteAPI(keyName, specific))
        navigation.navigate('Lịch Sử Trích Xuất', {keyName : keyName})
        dispatch(totalAPI(keyName))
    }

    useEffect(() => {
        dispatch(detailAPI(keyName, specific));
    }, [dispatch, keyName, specific]);

    return (
        <View style={styles.container}>
            {/* <View style={{ flex: 1 }}> */}
            <ScrollView style={{flex : 1}} contentContainerStyle={styles.scrollContainer}>
                {isLoading ? (
                    <View style={{justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size='large' color="#cc3333" />
                        <Text style={styles.text}>
                            Đang Lấy Thông Tin, Xin Vui Lòng Đợi...
                        </Text>
                    </View>
                ) : (
                    hasSearched && (
                        Object.keys(response).length === 0 ? (
                            <Text style={{ fontSize: 40, color: "red", fontWeight: "bold", textAlign: "center" }}>
                                Không Có Dữ Liệu Nào Đã Được Lưu Ở Đây!!!
                            </Text>
                        ) : (
                            <View>
                                <Text style={styles.text}>
                                    Các Tên Thuốc Đã Được Trích Xuất Của "{specific}":
                                </Text>
                                {Object.keys(response)
                                    .filter(key => key.startsWith("presName"))
                                    .map((key, index) => (
                                        <Text key={index} style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
                                            {`Tên Thuốc ${index + 1}: ${response[key]}`}
                                        </Text>
                                    ))}
                                <Text style={styles.text}>
                                    Bức Ảnh:
                                </Text>
                                {image ? (
                                    <Image
                                        style={styles.image}
                                        source={{ uri: `data:image/png;base64,${image}` }}
                                    />
                                ) : null}
                            </View>
                        )
                    )
                )}
            {/* </View> */}
            </ScrollView>
            <View style={{flex : 0.15}}>
                {hasSearched && (
                        Object.keys(response).length === 0 ? (null) : (
                            <View style={{flexDirection : "row", paddingLeft : "10%", paddingRight : "10%", justifyContent : "space-between"}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Chỉnh Sửa', {keyName : keyName, specific : specific, image : image, data : response})} style={styles.btn} >
                                    <Text style={{...styles.text, color : "white"}}> Chỉnh Sửa </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={showModal} style={{...styles.btn, backgroundColor : "red"}} >
                                    <Text style={{...styles.text, color : "white"}}> Xóa Kết Quả </Text>
                                </TouchableOpacity>
                            </View>
                ))}
                <Modal
                    animationType = {"slide"}
                    transparent={true}
                    visible={isVisible}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalBody}>
                        <Text style={styles.text }>Bạn Có Chắc Chắn Muốn Xóa Toàn Bộ Dữ Liệu Của "{specific}" Hay Không</Text>
                        <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                            <View style={styles.modalButton}>
                                <Button title='Có' onPress={acecptDelete} />
                            </View>
                            <View style={styles.modalButton}>
                                <Button title='Không' onPress={closeModal} />
                            </View>
                        </View>
                      </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain'
    },
    btn: {
        backgroundColor: 'orange',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    modalContainer: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      },
    modalBody: {
        backgroundColor:"#FFFFFF",
        alignItems:'center',
        paddingBottom: 10,
        borderRadius: 10,
        elevation: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
      },
    modalButton: {
        marginHorizontal: 10,
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
});

export default Home;

