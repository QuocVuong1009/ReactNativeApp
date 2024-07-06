// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Modal, Button, ScrollView, TextInput } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadImageAPI } from '../redux/uploadAction';
// import { saveAPI } from '../redux/saveAction';

// const Home = ({ route, navigation }) => {
//     const { file, value } = route.params;
//     const responseString = useSelector(store => store.upload.payload.response || '');
//     const isLoading = useSelector(store => store.upload.isLoading || false);
//     const isLoadingS = useSelector(store => store.save.isLoading || false);
//     const responseS = useSelector(store => store.save.payload.response || {});
//     const [isVisible, setVisible] = useState(false);
//     const [isVisibleResponse, setVisibleResponse] = useState(false);
//     const [specific, setSpecific] = useState("");
//     const [result, setResult] = useState("");
//     const [hasTaken, setTaken] = useState(false);
//     const [prescriptionData, setPrescriptionData] = useState({});
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(uploadImageAPI(file, value));
//     }, [dispatch, file, value]);

//     useEffect(() => {
//         if (responseString) {
//             try {
//                 const responseObject = JSON.parse(responseString);
//                 setPrescriptionData(responseObject);
//                 const resultString = JSON.stringify(
//                     Object.keys(responseObject)
//                         .filter(key => key.startsWith("presName"))
//                         .reduce((acc, key) => {
//                             acc[key] = responseObject[key];
//                             return acc;
//                         }, {})
//                 );
//                 setResult(resultString);
//                 console.log('The response in Home is:', responseObject);
//             } catch (e) {
//                 console.error('Failed to parse response string', e);
//             }
//         }
//     }, [responseString]);

//     const handleSave = () => {
//         dispatch(saveAPI(file, value, result, specific));
//         setVisible(false);
//     }

//     const handleUnSave = () => {
//         setSpecific("");
//         setVisible(false);
//     }

//     useEffect(() => {
//         if (!isLoadingS && responseS.status !== undefined && hasTaken) {
//             setVisibleResponse(true);
//         }
//     }, [isLoadingS, responseS]);

//     const handleModalResponse = () => {
//         setVisibleResponse(false);
//         if (responseS.status) {
//             navigation.navigate('HomeCamera');
//         }
//     }

//     const handlePressSave = () => {
//         setVisible(true);
//         setTaken(true);
//     }

//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                     <ActivityIndicator size='large' color="#cc3333" />
//                     <Text style={styles.text}>
//                         Đang Trích Xuất Thông Tin Tên Thuốc, Xin Vui Lòng Đợi...
//                     </Text>
//                 </View>
//             ) : (
//                 prescriptionData.status === "fail" ? (
//                     <View style={{ flex: 1 }}>
//                         <View style={{ flex: 1, justifyContent: "center" }}>
//                             <Text style={styles.text}>
//                                 Xin Lỗi, Không Thể Trích Xuất Tên Thuốc. Bạn Vui Lòng chụp Lại Sao Cho Ảnh Chụp Chứa Toàn Bộ Nội Dung Và Sắc Nét Hơn Nhé!
//                             </Text>
//                         </View>
//                         <View style={{ flex: 0.15, paddingLeft: "10%", paddingRight: "10%", justifyContent: "center", alignItems: "center" }}>
//                             <TouchableOpacity style={{ ...styles.btn, backgroundColor: "red" }} onPress={() => navigation.navigate('HomeCamera')}>
//                                 <Text style={{ ...styles.text, color: "white" }}> Chụp Lại </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 ) : (
//                     <View style={{ flex: 1 }}>
//                         <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
//                             <Text style={styles.text}>
//                                 Các Tên Thuốc Đã Được Trích Xuất Ra Là:
//                             </Text>
//                             <View style={{ padding: "5%" }}>
//                                 {Object.keys(prescriptionData)
//                                     .filter(key => key.startsWith("presName"))
//                                     .map((key, index) => (
//                                         <Text key={index} style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
//                                             {`Tên Thuốc ${index + 1}: ${prescriptionData[key]}`}
//                                         </Text>
//                                     ))}
//                             </View>
//                             <Text style={styles.text}>
//                                 Bức Ảnh:
//                             </Text>
//                             {file ? (
//                                 <Image
//                                     style={styles.image}
//                                     source={{ uri: file.uri }}
//                                 />
//                             ) : null}
//                         </ScrollView>
//                         <View style={{ flex: 0.15, flexDirection: "row", paddingLeft: "10%", paddingRight: "10%", justifyContent: "space-between", alignItems: "center" }}>
//                             <TouchableOpacity style={{ ...styles.btn, backgroundColor: "red" }} onPress={() => navigation.navigate('HomeCamera')}>
//                                 <Text style={{ ...styles.text, color: "white" }}> Chụp Lại </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ ...styles.btn, backgroundColor: "blue" }} onPress={handlePressSave}>
//                                 <Text style={{ ...styles.text, color: "white" }}> Lưu </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )
//             )}
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={isVisible}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalBody}>
//                         <Text style={styles.text}>Hãy Nhập Vào Ghi Chú Của Đơn Thuốc Này (Bạn Có Thể Ghi Tên Bệnh Viện)</Text>
//                         <TextInput
//                             style={{ ...styles.searchInput }}
//                             placeholder="Nhập ghi chú của bạn ở đây!!"
//                             value={specific}
//                             onChangeText={setSpecific}
//                         />
//                         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                             <View style={styles.modalButton}>
//                                 <Button title='Lưu' onPress={handleSave} />
//                             </View>
//                             <View style={styles.modalButton}>
//                                 <Button title='Hủy Bỏ' onPress={handleUnSave} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//             <Modal
//                 animationType="slide"
//                 transparent={false}
//                 visible={isLoadingS}>
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size='large' color="#cc3333" />
//                     <Text>
//                         Đang Tiến Hành Lưu, Xin Lòng Lòng Đợi...
//                     </Text>
//                 </View>
//             </Modal>
//             <Modal
//                 animationType="slide"
//                 transparent={false}
//                 visible={isVisibleResponse}>
//                 <View style={styles.modalContainer}>
//                     <View style={{ ...styles.modalBody, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text style={styles.text}>
//                             {responseS.status ? "Bạn đã lưu thành công, giờ bạn có thể quay lại màn hình chính để chụp thêm bức ảnh mới hoặc nhấn vào Lịch Sử Trích Xuất để xem kết quả lưu" : "Có lỗi xảy ra trong quá trình lưu, vui lòng lưu lại"}
//                         </Text>
//                         <View style={styles.modalButtonN}>
//                             <Button title='OK' onPress={handleModalResponse} />
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: "10%"
//     },
//     scrollContainer: {},
//     text: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: 'black',
//         textAlign: 'center'
//     },
//     image: {
//         width: 400,
//         height: 400,
//         resizeMode: 'contain'
//     },
//     btn: {
//         backgroundColor: 'orange',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         margin: 10,
//         borderRadius: 50,
//         alignItems: 'center'
//     },
//     modalContainer: {
//         justifyContent:'center',
//         alignItems:'center',
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.4)'
//     },
//     modalBody: {
//         backgroundColor:"#FFFFFF",
//         alignItems:'center',
//         paddingBottom: 10,
//         borderRadius: 10,
//         elevation: 20,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderStyle: 'solid',
//         width: '80%'
//     },
//     modalContainerN: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.4)'
//     },
//     modalBodyN: {
//         backgroundColor: "#FFFFFF",
//         padding: 20,
//         borderRadius: 10,
//         elevation: 20,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderStyle: 'solid',
//         width: '80%'
//     },
//     modalButton: {
//         marginHorizontal: 10,
//         flex: 1,
//     },
//     modalButtonN: {
//         marginVertical: 10,
//         width: '60%',
//     },
//     searchInput: {
//         width: '90%',
//         borderWidth: 2,
//         borderColor: '#3d85c6',
//         borderRadius: 15,
//         marginVertical: 10,
//         padding: 10
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default Home;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Modal, Button, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAPI } from '../redux/uploadAction';
import { saveAPI } from '../redux/saveAction';

const Home = ({ route, navigation }) => {
    const { file, value } = route.params;
    const responseString = useSelector(store => store.upload.payload.response || '');
    const isLoading = useSelector(store => store.upload.isLoading || false);
    const isLoadingS = useSelector(store => store.save.isLoading || false);
    const responseS = useSelector(store => store.save.payload.response || {});
    const [isVisible, setVisible] = useState(false);
    const [isVisibleResponse, setVisibleResponse] = useState(false);
    const [specific, setSpecific] = useState("");
    const [result, setResult] = useState("");
    const [hasTaken, setTaken] = useState(false);
    const [status, setStatus] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadImageAPI(file, value));
    }, [dispatch, file, value]);

    // Function to validate JSON string
    const isValidJSON = (str) => {
        try {
            const json = JSON.parse(str);
            return json && typeof json === 'object';
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        if (responseString && responseString !== '[]') {
            if (isValidJSON(responseString)) {
                const responseObject = JSON.parse(responseString);
                setPrescriptionData(responseObject);
                const resultString = JSON.stringify(
                    Object.keys(responseObject)
                        .filter(key => key.startsWith("presName"))
                        .reduce((acc, key) => {
                            acc[key] = responseObject[key];
                            return acc;
                        }, {})
                );
                setResult(resultString);
                setStatus({"status" : ""});
                console.log('The response in Home is:', responseObject);
            } else {
                // console.error('Invalid JSON response:', responseString);
                setStatus(responseString)
                console.log(`The satus in home is: `, status)
            }
        } else {
            console.log('Empty or invalid response:', responseString);
        }
    }, [responseString]);

    const handleSave = () => {
        dispatch(saveAPI(file, value, result, specific));
        // dispatch(saveAPI(file, value, responseString, specific));
        setVisible(false);
    }

    const handleUnSave = () => {
        setSpecific("");
        setVisible(false);
    }

    useEffect(() => {
        if (!isLoadingS && responseS.status !== undefined && hasTaken) {
            setVisibleResponse(true);
        }
    }, [isLoadingS, responseS]);

    const handleModalResponse = () => {
        setVisibleResponse(false);
        if (responseS.status) {
            navigation.navigate('HomeCamera');
        }
    }

    const handlePressSave = () => {
        setVisible(true);
        setTaken(true);
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size='large' color="#cc3333" />
                    <Text style={styles.text}>
                        Đang Trích Xuất Thông Tin Tên Thuốc, Xin Vui Lòng Đợi...
                    </Text>
                </View>
            ) : (
                status.status === "fail" ? (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.text}>
                                Xin Lỗi, Không Thể Trích Xuất Tên Thuốc. Bạn Vui Lòng chụp Lại Sao Cho Ảnh Chụp Chứa Toàn Bộ Nội Dung Và Sắc Nét Hơn Nhé!
                            </Text>
                        </View>
                        <View style={{ flex: 0.15, paddingLeft: "10%", paddingRight: "10%", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity style={{ ...styles.btn, backgroundColor: "red" }} onPress={() => navigation.navigate('HomeCamera')}>
                                <Text style={{ ...styles.text, color: "white" }}> Chụp Lại </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
                            <Text style={styles.text}>
                                Các Tên Thuốc Đã Được Trích Xuất Ra Là:
                            </Text>
                            <View style={{ padding: "5%" }}>
                                {Object.keys(prescriptionData)
                                    .filter(key => key.startsWith("presName"))
                                    .map((key, index) => (
                                        <Text key={index} style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
                                            {`Tên Thuốc ${index + 1}: ${prescriptionData[key]}`}
                                        </Text>
                                    ))}
                            </View>
                            <Text style={styles.text}>
                                Bức Ảnh:
                            </Text>
                            {file ? (
                                <Image
                                    style={styles.image}
                                    source={{ uri: file.uri }}
                                />
                            ) : null}
                        </ScrollView>
                        <View style={{ flex: 0.15, flexDirection: "row", paddingLeft: "10%", paddingRight: "10%", justifyContent: "space-between", alignItems: "center" }}>
                            <TouchableOpacity style={{ ...styles.btn, backgroundColor: "red" }} onPress={() => navigation.navigate('HomeCamera')}>
                                <Text style={{ ...styles.text, color: "white" }}> Chụp Lại </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.btn, backgroundColor: "blue" }} onPress={handlePressSave}>
                                <Text style={{ ...styles.text, color: "white" }}> Lưu </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBody}>
                        <Text style={styles.text}>Hãy Nhập Vào Ghi Chú Của Đơn Thuốc Này (Bạn Có Thể Ghi Tên Bệnh Viện)</Text>
                        <TextInput
                            style={{ ...styles.searchInput }}
                            placeholder="Nhập ghi chú của bạn ở đây!!"
                            value={specific}
                            onChangeText={setSpecific}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.modalButton}>
                                <Button title='Lưu' onPress={handleSave} />
                            </View>
                            <View style={styles.modalButton}>
                                <Button title='Hủy Bỏ' onPress={handleUnSave} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isLoadingS}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color="#cc3333" />
                    <Text style={styles.text}>
                        Đang Tiến Hành Lưu, Xin Lòng Lòng Đợi...
                    </Text>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isVisibleResponse}>
                <View style={styles.modalContainer}>
                    <View style={{ ...styles.modalBody, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>
                            {responseS.status ? "Bạn đã lưu thành công, giờ bạn có thể quay lại màn hình chính để chụp thêm bức ảnh mới hoặc nhấn vào Lịch Sử Trích Xuất để xem kết quả lưu" : "Có lỗi xảy ra trong quá trình lưu, vui lòng lưu lại"}
                        </Text>
                        <View style={styles.modalButtonN}>
                            <Button title='OK' onPress={handleModalResponse} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%"
    },
    scrollContainer: {},
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
        width: '80%'
    },
    modalContainerN: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalBodyN: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 10,
        elevation: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '80%'
    },
    modalButton: {
        marginHorizontal: 10,
        flex: 1,
    },
    modalButtonN: {
        marginVertical: 10,
        width: '60%',
    },
    searchInput: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#3d85c6',
        borderRadius: 15,
        marginVertical: 10,
        padding: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;

