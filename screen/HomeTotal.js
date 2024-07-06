// import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, FlatList} from 'react-native';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { totalAPI } from '../redux/totalAction';

// const HomeTotal = ({navigation}) => {
//     const isLoading = useSelector(store => store.total.isLoading || false);
//     const hasSearched = useSelector(store => store.total.hasSearch || false);
//     const dispatch = useDispatch();
//     const response = useSelector(store => store.total.payload.response || []);

//     const [keyName, setkeyName] = useState("");
//     const [outKeyName, setoutKeyName] = useState("");

//     const search = () => {
//         dispatch(totalAPI(keyName))
//         setoutKeyName(keyName)
//     }

//     const addHours = (date, hours) => {
//         const result = new Date(date);
//         result.setHours(result.getHours() + hours);
//         return result;
//     }

//     // const detailTouch = () => {
//     //     dispatch(detailAPI(keyName, specific));
//     //     navigation.navigate('Thông Tin Chi Tiết', {keyName : keyName, response.specific});
//     // }

//     const renderDetail = (item) => {
//         const dateTimeString = `${item.day}T${item.time}Z`;
//         const date = new Date(dateTimeString);
//         const adjustedDate = addHours(date, 7);
//         const adjustedDay = adjustedDate.toISOString().split('T')[0];
//         const adjustedTime = adjustedDate.toISOString().split('T')[1].split('.')[0];
//         return (
//             <TouchableOpacity onPress={() => navigation.navigate('Thông Tin Chi Tiết', {keyName : keyName, specific : item.specific})}>
//             {/* <TouchableOpacity onPress={detailTouch}> */}
//                 <View style={styles.box}>
//                     <Text style={{...styles.text, fontSize : 20}}>{item.specific}</Text>
//                     <Text style={{...styles.text, fontSize : 20}}>Ngày Lưu: {adjustedDay}</Text>
//                     <Text style={{...styles.text, fontSize : 20}}>Giờ Lưu: {adjustedTime}</Text>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         <View style={styles.container}>
//             <View>
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Input the name you want to find:"
//                     value={keyName}
//                     onChangeText={setkeyName}
//                 />
//                 <TouchableOpacity
//                     onPress={search}
//                     style={{ ...styles.btn, backgroundColor: '#3d85c6' }}>
//                     <Text style={styles.btnText}> Tìm kiếm </Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={{flex : 0.3}}>
//                 { hasSearched && (
//                         response.status == "fail" ? (
//                             <Text></Text>
//                         ) : (
//                             <Text style={styles.text}>
//                                 Xin Chào {outKeyName}. Đây Là Danh Sách Những Lần Bạn Đã Trích Xuất Đơn Thuốc
//                             </Text>
//                         )
//                     )}
//             </View>
//             <View style={{ flex: 1.5 }}>
//                 {isLoading ? (
//                     <ActivityIndicator size='large' color="#cc3333" />
//                 ) : (
//                     hasSearched && (
//                         response.status == "fail" ? (
//                             <Text style={{ fontSize: 40, color: "red", fontWeight: "bold", textAlign: "center" }}>
//                                 Xin Lỗi {outKeyName}. Bạn Chưa Lưu Bất Kỳ Kết Quả Nào
//                             </Text>
//                         ) : (
//                             <FlatList
//                                 data={response}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 renderItem={({item}) => renderDetail(item)}
//                             />
//                         )
//                     )
//                 )}
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop : "10%",
//         paddingBottom : "10%"
//     },
//     text: {
//         fontSize: 25,
//         fontWeight: 'bold',
//         color: 'black',
//         textAlign: 'center'
//     },
//     searchInput: {
//         width: '90%',
//         borderWidth: 2,
//         borderColor: '#3d85c6',
//         borderRadius: 15,
//         marginVertical: 10,
//         padding: 10
//     },
//     btn: {
//         backgroundColor: '#086972',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         margin: 10,
//         borderRadius: 50,
//         alignItems: 'center'
//     },
//     btnText: {
//         fontSize: 18,
//         color: '#fff',
//     },
//     loading: {
//         position: "relative",
//         top: '50%',
//         left: '50%',
//         transform: [{ translateX: -50 }, { translateY: -50 }]
//     },
//     box: {
//         backgroundColor: 'gray',
//         margin: 10,
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });

// export default HomeTotal;

import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { totalAPI } from '../redux/totalAction';

const HomeTotal = ({route, navigation}) => {
    const {keyName}  = route.params;
    const isLoading = useSelector(store => store.total.isLoading || false);
    const dispatch = useDispatch();
    const response = useSelector(store => store.total.payload.response || []);

    const [outKeyName, setoutKeyName] = useState("");


    const addHours = (date, hours) => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    }

    useEffect(() => {
        setoutKeyName(keyName);
        dispatch(totalAPI(keyName));
    }, [setoutKeyName, dispatch, keyName]);

    const renderDetail = (item) => {
        const dateTimeString = `${item.day}T${item.time}Z`;
        const date = new Date(dateTimeString);
        const adjustedDate = addHours(date, 7);
        const adjustedDay = adjustedDate.toISOString().split('T')[0];
        const adjustedTime = adjustedDate.toISOString().split('T')[1].split('.')[0];
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Thông Tin Chi Tiết', {keyName : keyName, specific : item.specific})}>
            {/* <TouchableOpacity onPress={detailTouch}> */}
                <View style={styles.box}>
                    <Text style={{...styles.text, fontSize : 20}}>{item.specific}</Text>
                    <Text style={{...styles.text, fontSize : 20}}>Ngày Lưu: {adjustedDay}</Text>
                    <Text style={{...styles.text, fontSize : 20}}>Giờ Lưu: {adjustedTime}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1.5 }}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size='large' color="#cc3333" />
                        <Text style={styles.text}>
                            Đang Lấy Thông Tin, Xin Vui Lòng Đợi...
                        </Text>
                    </View>
                ) : (
                        response.status == "fail" ? (
                            <Text style={{ fontSize: 40, color: "red", fontWeight: "bold", textAlign: "center" }}>
                                Xin Lỗi {outKeyName}. Bạn Chưa Lưu Bất Kỳ Kết Quả Nào
                            </Text>
                        ) : (
                            <View>
                                <Text style={styles.text}>
                                    Xin Chào {outKeyName}. Đây Là Danh Sách Những Lần Bạn Đã Trích Xuất Đơn Thuốc
                                </Text>
                                <FlatList
                                    data={response}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => renderDetail(item)}
                                />
                            </View>
                        )
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop : "10%",
        paddingBottom : "10%"
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    searchInput: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#3d85c6',
        borderRadius: 15,
        marginVertical: 10,
        padding: 10
    },
    btn: {
        backgroundColor: '#086972',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
    },
    loading: {
        position: "relative",
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }]
    },
    box: {
        backgroundColor: 'gray',
        margin: 10,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeTotal;
