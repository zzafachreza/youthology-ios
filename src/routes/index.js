import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Register,
  Login,
  Home,
  GetStarted,
  OnBoarding,
  RegisterSuccess,
  Treatment,
  CSAdmin,
  Account,
  CSAdminTanggal,
  CSAdminKonfirmasi,
  CSAdminSuccess,
  CSAdminJadwal,
  Blog,
  BlogDetail,
  EditAccount,
  Tetang,
  VoucherSaya,
  Bagikan,
  Tentang,
  JadwalDetail,
  FlashSale,
  Unggah,
  UnggahSuccess,
  VoucherDetail,
  Member,
  Tukar,
  Cara,
  Notifikasi,
  Lupa,
  Otp,
  Reset,
  JadwalSaya,
  JadwalEdit
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/BottomNavigator';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {


  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Treatment" component={Treatment} />
      <Tab.Screen name="CSAdmin" component={CSAdmin} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};


export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="CSAdminJadwal"
        component={CSAdminJadwal}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CSAdminKonfirmasi"
        component={CSAdminKonfirmasi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CSAdminSuccess"
        component={CSAdminSuccess}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Tentang"
        component={Tentang}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="VoucherSaya"
        component={VoucherSaya}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Bagikan"
        component={Bagikan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JadwalDetail"
        component={JadwalDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FlashSale"
        component={FlashSale}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Unggah"
        component={Unggah}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UnggahSuccess"
        component={UnggahSuccess}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="VoucherDetail"
        component={VoucherDetail}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Member"
        component={Member}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Tukar"
        component={Tukar}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Cara"
        component={Cara}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Lupa"
        component={Lupa}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Reset"
        component={Reset}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="JadwalSaya"
        component={JadwalSaya}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="JadwalEdit"
        component={JadwalEdit}
        options={{
          headerShown: false,
        }}
      />




    </Stack.Navigator>
  );
}
