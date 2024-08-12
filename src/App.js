import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routes';
import { LogBox, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Color } from './utils/colors';

import { storeData } from './utils/localStorage';
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import { MyIcon } from './components';
import { fonts } from './utils';


export default function App() {
  LogBox.ignoreAllLogs();


  const navigationRef = useRef();




  return (
    <NavigationContainer ref={navigationRef}>
      <ToastProvider
        duration={2000}
        placement="bottom"
        animationDuration={250}
        animationType='zoom-in'
        successColor={Color.blueGray[50]}
        successIcon={<MyIcon name='check-circle' color={Color.tealGreen[500]} size={24} />}
        dangerColor={<MyIcon name='close-circle' color={Color.tealGreen[500]} size={24} />}
        renderToast={(toast) => {
          return (
            <View style={{
              backgroundColor: Color.blueGray[50],
              padding: 10,
              width: '85%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Color.blueGray[100],
              flexDirection: 'row',
            }}>
              {toast.type == 'success' ? <MyIcon name='check-circle' color={Color.tealGreen[500]} size={24} /> : toast.type == 'warning' ? <MyIcon name='info-circle' color={Color.blueGray[400]} size={24} /> : <MyIcon name='close-circle' color={Color.red[500]} size={24} />}
              <Text style={{
                left: 10,
                flex: 1,
                ...fonts.body3,
                color: Color.primary[900]
              }}>{toast.message}</Text>
              {/* <Pressable>
                <Icon type='ionicon' name='close' color={Color.blueGray[400]} />
              </Pressable> */}
            </View>
          )
        }}
      >
        <Router />
      </ToastProvider>
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}
