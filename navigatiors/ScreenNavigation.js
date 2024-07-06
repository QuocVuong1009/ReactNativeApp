import HomeTotal from "../screen/HomeTotal";
import HomeDetail from "../screen/HomeDetail";
import HomeModify from "../screen/HomeModify";
import HomeCamera from "../screen/HomeCamera";
import HomeSave from "../screen/HomeSave";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { React } from 'react';

const Stack = createNativeStackNavigator();

const Appnavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeCamera">
                <Stack.Screen name="HomeCamera" component={HomeCamera} options={{animationEnabled: false, header: () => null}}/>
                <Stack.Screen name="HomeSave" component={HomeSave} options={{animationEnabled: false, header: () => null}}/>
                <Stack.Screen name="Lịch Sử Trích Xuất" component={HomeTotal} options={{animationEnabled: false}}/>
                <Stack.Screen name="Thông Tin Chi Tiết" component={HomeDetail} options={{animationEnabled: false}}/>
                <Stack.Screen name="Chỉnh Sửa" component={HomeModify} options={{animationEnabled: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Appnavigator;