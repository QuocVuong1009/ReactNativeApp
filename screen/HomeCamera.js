// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput } from 'react-native';
// import { uploadImageAPI } from '../redux/uploadAction';

// export default function App({navigation}) {
//   const [facing, setFacing] = useState('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [isVisible, setVisible] = useState(true);
//   const [value, setValue] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [isTakingPicture, setIsTakingPicture] = useState(false);
//   const dispatch = useDispatch();
//   const cameraRef = useRef(null);

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   const showModal = () => setVisible(true);
//   const handleEnter = () => {
//     setVisible(false);
//   }

//   const takePicture = async () => {
//     if (!isTakingPicture && cameraRef.current) { // Check if not already taking picture
//       setIsTakingPicture(true); // Set state to indicate taking picture
//       const photo = await cameraRef.current.takePictureAsync();
//       console.log(photo);
//       const file = {
//         uri: photo.uri,
//         name: `photo.jpg`, // You can use a more dynamic name
//         type: `image/jpg`
//       };
//       dispatch(uploadImageAPI(file, value));
//       setIsTakingPicture(false); // Reset state after successfully taking picture
//     }
//   };

//   return (
//     <View style={{flex : 1}}>
//       <View style={{flex : 0.05, flexDirection : "row", justifyContent : "flex-end", paddingBottom : "5%", paddingTop : "10%"}}>
//         <TouchableOpacity style={{ flexDirection : "row", alignItems : "center"}} onPress={() => navigation.navigate('Lịch Sử Trích Xuất', {keyName : value})}>
//           <Text style={{alignContent : "center", fontWeight : "bold", fontSize : 20}}>
//                 Lịch Sử Trích Xuất
//           </Text>
//           <Image style={{width: 30, height: 30, resizeMode: 'contain', borderRadius : 20}} source={require('../assets/dot.jpg')}/> 
//         </TouchableOpacity>
//       </View>
//       <View style={styles.container}>
//         <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      
//         </CameraView>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button}>
//             <Image style={{...styles.Icon, width: 1, height: 1}} source={require('../assets/blankn.jpg')}/>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={takePicture}>
//             <Image style={{...styles.Icon, width: 90, height: 90}} source={require('../assets/takepicn.png')}/>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Image style={{...styles.Icon, width: 60, height: 60}} source={require('../assets/flipcamn.png')}/>
//         </TouchableOpacity>
//       </View>
//       <Modal
//         animationType={"slide"}
//         transparent={false}
//         visible={isVisible}>
//         <View style={styles.modalContainer}>
//             <View style={{...styles.modalBody}}>
//                 <Text style={styles.modalText}>Mời Bạn Nhập Tên Của Bạn!</Text>
//                 <TextInput
//                   style={{...styles.searchInput}}
//                   placeholder="Nhập tên của bạn ở đây!!"
//                   value={value}
//                   onChangeText={setValue}
//                 />
//                 <Button title='Đồng Ý' style={styles.modalButton} onPress={handleEnter}/>
//             </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 0.03,
//     flexDirection: 'row',
//     justifyContent: "space-around",
//     backgroundColor: 'transparent',
//     margin: 64
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'center',
//     alignItems: 'center',
//     marginHorizontal: 40,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign : "center"
//   },
//   Icon: {
//     resizeMode: 'contain',
//     borderRadius : 20
//   },
//   modalContainer: {
//     justifyContent: 'center',
//     // alignItems: 'center',
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)'
// },
// modalBody: {
//     backgroundColor: "#FFFFFF",
//     alignItems: 'center',
//     paddingBottom: 10,
//     borderRadius: 10,
//     elevation: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderStyle: 'solid'
// },
// modalButton: {
//     marginHorizontal: 10,
//     flex: 1,
// },
// modalText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//     textAlign: 'center',
//     marginVertical: 10
// },
// searchInput: {
//   width: '90%',
//   borderWidth: 2,
//   borderColor: '#3d85c6',
//   borderRadius: 15,
//   marginVertical: 10,
//   padding: 10
// },
// });

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal, TextInput } from 'react-native';
// import { uploadImageAPI } from '../redux/uploadAction';

export default function App({navigation}) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isVisible, setVisible] = useState(true);
  const [value, setValue] = useState("");
  // const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const dispatch = useDispatch();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleEnter = () => {
    setVisible(false);
  }

  const takePicture = async () => {
    if (isUploading) {
      return; // If already uploading, prevent further actions
    }
  
    setIsUploading(true); // Set uploading state to true
  
    if (cameraRef.current) {
      try {
        const currentRef = cameraRef.current;
        cameraRef.current = null; // Temporarily disable ref to prevent further captures
        const photo = await currentRef.takePictureAsync();
        cameraRef.current = currentRef; // Restore ref after capture
  
        const file = {
          uri: photo.uri,
          name: 'photo.jpg', // Corrected name format
          type: 'image/jpeg', // Corrected MIME type format
        };
  
        // dispatch(uploadImageAPI(file, value)); // Dispatch upload action
        navigation.navigate('HomeSave', {file : file, value : value})
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsUploading(false); // Reset uploading state regardless of success or failure
      }
    }
  };

  return (
    <View style={{flex : 1}}>
      <View style={{flex : 0.05, flexDirection : "row", justifyContent : "flex-end", paddingBottom : "5%", paddingTop : "10%"}}>
        <TouchableOpacity style={{ flexDirection : "row", alignItems : "center"}} onPress={() => navigation.navigate('Lịch Sử Trích Xuất', {keyName : value})}>
          <Text style={{alignContent : "center", fontWeight : "bold", fontSize : 20}}>
                Lịch Sử Trích Xuất
          </Text>
          <Image style={{width: 30, height: 30, resizeMode: 'contain', borderRadius : 20}} source={require('../assets/dot.jpg')}/> 
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      
        </CameraView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
            <Image style={{...styles.Icon, width: 1, height: 1}} source={require('../assets/blankn.jpg')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image style={{...styles.Icon, width: 90, height: 90}} source={require('../assets/takepicn.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Image style={{...styles.Icon, width: 60, height: 60}} source={require('../assets/flipcamn.png')}/>
        </TouchableOpacity>
      </View>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={isVisible}>
        <View style={styles.modalContainer}>
            <View style={{...styles.modalBody}}>
                <Text style={styles.modalText}>Mời Bạn Nhập Tên Của Bạn!</Text>
                <TextInput
                  style={{...styles.searchInput}}
                  placeholder="Nhập tên của bạn ở đây!!"
                  value={value}
                  onChangeText={setValue}
                />
                <Button title='Đồng Ý' style={styles.modalButton} onPress={handleEnter}/>
            </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.03,
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign : "center"
  },
  Icon: {
    resizeMode: 'contain',
    borderRadius : 20
  },
  modalContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
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
    borderStyle: 'solid'
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
searchInput: {
  width: '90%',
  borderWidth: 2,
  borderColor: '#3d85c6',
  borderRadius: 15,
  marginVertical: 10,
  padding: 10
},
});
