import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Button, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailAPI } from '../redux/detailAction';
import { updateAPI } from '../redux/modifyAction';
import { totalAPI } from '../redux/totalAction';

const HomeModify = ({ route, navigation }) => {
    const { keyName, specific, image, data } = route.params;
    const [editableSpecific, setEditableSpecific] = useState(specific);
    const [editableData, setEditableData] = useState(data);
    const [isVisibleR, setVisibleR] = useState(false);
    const [isVisibleA, setVisibleA] = useState(false);
    const [hasDone, setHasDone] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.update.isLoading || false);

    const showModal_remove = () => setVisibleR(true);
    const closeModal_remove = () => setVisibleR(false);
    const showModal_accecpt = () => setVisibleA(true);
    const closeModal_accecpt = () => setVisibleA(false);

    useEffect(() => {
        if (!isLoading && hasDone == true) {
            closeModal_accecpt();
            navigation.navigate('Thông Tin Chi Tiết', { keyName: keyName, specific: editableSpecific });
            dispatch(detailAPI(keyName, editableSpecific));
            dispatch(totalAPI(keyName))
        }
    }, [isLoading]);

    const handleSave = () => {
        setHasDone(true)
        dispatch(updateAPI(keyName, specific, editableData, editableSpecific));
    };

    const handleCancel = () => {
        setEditableSpecific(specific);
        setEditableData(data);
        closeModal_remove();
    };

    const handleAddField = (index) => {
        const newData = { ...editableData };
        const newEntries = Object.entries(newData);
        const newKey = `presName${Object.keys(newData).length + 1}`;
        newEntries.splice(index + 1, 0, [newKey, '']);
        const reorderedData = newEntries.reduce((acc, [key, value], idx) => {
            acc[`presName${idx + 1}`] = value;
            return acc;
        }, {});
        setEditableData(reorderedData);
    };

    const handleRemoveField = (index) => {
        const newData = { ...editableData };
        const newEntries = Object.entries(newData);
        if (newEntries.length > 1) {
            newEntries.splice(index, 1);
            const reorderedData = newEntries.reduce((acc, [key, value], idx) => {
                acc[`presName${idx + 1}`] = value;
                return acc;
            }, {});
            setEditableData(reorderedData);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.text}>Xin Chào {keyName} ! Mời Bạn Thay Đổi Đơn Thuốc Của Mình </Text>
                <Text style={styles.label}>Tên của đơn thuốc:</Text>
                <TextInput
                    style={styles.input}
                    value={editableSpecific}
                    onChangeText={setEditableSpecific}
                />
                {Object.keys(editableData)
                    .filter(key => key.startsWith("presName"))
                    .map((key, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.label}>{`Tên Thuốc ${index + 1}:`}</Text>
                            <View style={styles.row}>
                                <TextInput
                                    style={styles.input}
                                    value={editableData[key]}
                                    onChangeText={(text) => setEditableData(prev => ({ ...prev, [key]: text }))}
                                />
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity onPress={() => handleAddField(index)}>
                                        <Image style={styles.Icon} source={require('../assets/plusn.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleRemoveField(index)}>
                                        <Image style={[styles.Icon, styles.marginLeft]} source={require('../assets/minusn.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                <Text style={styles.label}>Bức Ảnh:</Text>
                {image ? (
                    <Image
                        style={styles.image}
                        source={{ uri: `data:image/png;base64,${image}` }}
                    />
                ) : null}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showModal_accecpt} style={{ ...styles.btn, backgroundColor: "green" }} >
                    <Text style={styles.btnText}> Lưu </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showModal_remove} style={{ ...styles.btn, backgroundColor: "red" }} >
                    <Text style={styles.btnText}> Hủy Bỏ </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={isVisibleR}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalText}>Bạn Có Chắc Chắn Muốn Hủy Bỏ Những Thay Đổi Hay Không</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.modalButton}>
                                <Button title='Có' onPress={handleCancel} />
                            </View>
                            <View style={styles.modalButton}>
                                <Button title='Không' onPress={closeModal_remove} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={isVisibleA}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalText}>Bạn Có Chắc Chắn Muốn Lưu Thay Đổi Hay Không</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.modalButton}>
                                <Button title='Có' onPress={handleSave} />
                            </View>
                            <View style={styles.modalButton}>
                                <Button title='Không' onPress={closeModal_accecpt} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: '100%',
        marginVertical: 10
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
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
        resizeMode: 'contain',
        marginVertical: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: "10%",
        paddingVertical: 10,
    },
    btn: {
        flex: 1,
        backgroundColor: 'orange',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 50,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalBody: {
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
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
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    Icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    marginLeft: {
        marginLeft: 20,
    },
});

export default HomeModify;

// import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { detailAPI } from '../redux/detailAction';
// import { updateAPI } from '../redux/modifyAction';
// import { totalAPI } from '../redux/totalAction';

// const HomeModify = ({ route, navigation }) => {
//     const { keyName, specific, image, data } = route.params;
//     const [editableSpecific, setEditableSpecific] = useState(specific);
//     const [editableData, setEditableData] = useState(data);
//     const [isVisibleR, setVisibleR] = useState(false);
//     const [isVisibleA, setVisibleA] = useState(false);
//     const [hasDone, setHasDone] = useState(false);
//     const dispatch = useDispatch();
//     const isLoading = useSelector(store => store.update.isLoading || false);

//     const showModal_remove = () => setVisibleR(true);
//     const closeModal_remove = () => setVisibleR(false);
//     const showModal_accecpt = () => setVisibleA(true);
//     const closeModal_accecpt = () => setVisibleA(false);

//     useEffect(() => {
//         if (!isLoading && hasDone == true) {
//             closeModal_accecpt();
//             navigation.navigate('Thông Tin Chi Tiết', { keyName: keyName, specific: editableSpecific });
//             dispatch(detailAPI(keyName, editableSpecific));
//             dispatch(totalAPI(keyName))
//         }
//     }, [isLoading]);

//     const handleSave = () => {
//         setHasDone(true)
//         dispatch(updateAPI(keyName, specific, editableData, editableSpecific));
//     };

//     const handleCancel = () => {
//         setEditableSpecific(specific);
//         setEditableData(data);
//         closeModal_remove();
//     };

//     const handleAddField = (index) => {
//         const newData = { ...editableData };
//         const newEntries = Object.entries(newData);
//         const newKey = `presName${Object.keys(newData).length + 1}`;
//         newEntries.splice(index + 1, 0, [newKey, '']);
//         const reorderedData = newEntries.reduce((acc, [key, value], idx) => {
//             acc[`presName${idx + 1}`] = value;
//             return acc;
//         }, {});
//         setEditableData(reorderedData);
//     };

//     const handleRemoveField = (index) => {
//         const newData = { ...editableData };
//         const newEntries = Object.entries(newData);
//         if (newEntries.length > 1) {
//             newEntries.splice(index, 1);
//             const reorderedData = newEntries.reduce((acc, [key, value], idx) => {
//                 acc[`presName${idx + 1}`] = value;
//                 return acc;
//             }, {});
//             setEditableData(reorderedData);
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {isLoading ? (
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                     <ActivityIndicator size='large' color="#cc3333" />
//                     <Text style={styles.text}>
//                         Đang Trích Xuất Thông Tin Tên Thuốc, Xin Vui Lòng Đợi...
//                     </Text>
//                 </View>
//             ) : (
//                 <View style={{ flex: 1 }}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer}>
//                         <Text style={styles.text}>Xin Chào {keyName} ! Mời Bạn Thay Đổi Đơn Thuốc Của Mình </Text>
//                         <Text style={styles.label}>Tên của đơn thuốc:</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={editableSpecific}
//                             onChangeText={setEditableSpecific}
//                         />
//                         {Object.keys(editableData)
//                             .filter(key => key.startsWith("presName"))
//                             .map((key, index) => (
//                                 <View key={index} style={styles.inputContainer}>
//                                     <Text style={styles.label}>{`Tên Thuốc ${index + 1}:`}</Text>
//                                     <View style={styles.row}>
//                                         <TextInput
//                                             style={styles.input}
//                                             value={editableData[key]}
//                                             onChangeText={(text) => setEditableData(prev => ({ ...prev, [key]: text }))}
//                                         />
//                                         <View style={styles.buttonGroup}>
//                                             <TouchableOpacity onPress={() => handleAddField(index)}>
//                                                 <Image style={styles.Icon} source={require('../assets/plusn.png')} />
//                                             </TouchableOpacity>
//                                             <TouchableOpacity onPress={() => handleRemoveField(index)}>
//                                                 <Image style={[styles.Icon, styles.marginLeft]} source={require('../assets/minusn.png')} />
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>
//                                 </View>
//                             ))}
//                         <Text style={styles.label}>Bức Ảnh:</Text>
//                         {image ? (
//                             <Image
//                                 style={styles.image}
//                                 source={{ uri: `data:image/png;base64,${image}` }}
//                             />
//                         ) : null}
//                     </ScrollView>
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity onPress={showModal_accecpt} style={{ ...styles.btn, backgroundColor: "green" }} >
//                             <Text style={styles.btnText}> Lưu </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={showModal_remove} style={{ ...styles.btn, backgroundColor: "red" }} >
//                             <Text style={styles.btnText}> Hủy Bỏ </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             )}
//             <Modal
//                 animationType={"slide"}
//                 transparent={true}
//                 visible={isVisibleR}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalBody}>
//                         <Text style={styles.modalText}>Bạn Có Chắc Chắn Muốn Hủy Bỏ Những Thay Đổi Hay Không</Text>
//                         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                             <View style={styles.modalButton}>
//                                 <Button title='Có' onPress={handleCancel} />
//                             </View>
//                             <View style={styles.modalButton}>
//                                 <Button title='Không' onPress={closeModal_remove} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//             <Modal
//                 animationType={"slide"}
//                 transparent={true}
//                 visible={isVisibleA}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalBody}>
//                         <Text style={styles.modalText}>Bạn Có Chắc Chắn Muốn Lưu Thay Đổi Hay Không</Text>
//                         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                             <View style={styles.modalButton}>
//                                 <Button title='Có' onPress={handleSave} />
//                             </View>
//                             <View style={styles.modalButton}>
//                                 <Button title='Không' onPress={closeModal_accecpt} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         padding: 20,
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'black',
//         textAlign: 'left',
//         width: '100%',
//         marginVertical: 10
//     },
//     input: {
//         flex: 1,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 10,
//     },
//     inputContainer: {
//         width: '100%',
//         marginBottom: 15,
//     },
//     text: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: 'black',
//         textAlign: 'center'
//     },
//     image: {
//         width: 400,
//         height: 400,
//         resizeMode: 'contain',
//         marginVertical: 20
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: "10%",
//         paddingVertical: 10,
//     },
//     btn: {
//         flex: 1,
//         backgroundColor: 'orange',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         marginHorizontal: 5,
//         borderRadius: 50,
//         alignItems: 'center'
//     },
//     btnText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     modalContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.4)'
//     },
//     modalBody: {
//         backgroundColor: "#FFFFFF",
//         alignItems: 'center',
//         paddingBottom: 10,
//         borderRadius: 10,
//         elevation: 20,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderStyle: 'solid',
//     },
//     modalButton: {
//         marginHorizontal: 10,
//         flex: 1,
//     },
//     modalText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'black',
//         textAlign: 'center',
//         marginVertical: 10
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//     },
//     buttonGroup: {
//         flexDirection: 'row',
//         marginLeft: 10,
//     },
//     Icon: {
//         width: 25,
//         height: 25,
//         resizeMode: 'contain',
//     },
//     marginLeft: {
//         marginLeft: 20,
//     },
// });

// export default HomeModify;

