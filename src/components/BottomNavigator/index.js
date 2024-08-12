import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { DimensionThisPhone, fonts } from '../../utils';
import MyIcon from '../MyIcon';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }


  const [kulit, setKulit] = useState({})
  useEffect(() => {
    __GetDataKulit();
  }, []);

  const __GetDataKulit = () => {
    axios.post(apiURL + 'artikel', {
      tipe: 'Masalah Kulit'
    }).then(res => {

      setKulit(res.data[0])
    })
  }

  return (
    <View style={{
      backgroundColor: Color.white[900], flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: Color.blueGray[100],
      height: 65,

    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (label == 'Treatment') {
              navigation.navigate(route.name, kulit);
            } else {
              navigation.navigate(route.name);
            }

          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home-smile';
        let Newlabel = '';

        if (label === 'Home') {
          iconName = 'home-smile';
          Newlabel = 'Home';
        } else if (label === 'Account') {
          iconName = 'user-rounded';
          Newlabel = 'My Account';
        } else if (label === 'Treatment') {
          iconName = 'cosmetic';
          Newlabel = 'Treatment';
        } else if (label === 'CSAdmin') {
          iconName = 'whatsapp';
          Newlabel = 'Booking';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{

                paddingTop: 5,
                paddingBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  height: 65,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>

                <MyIcon name={iconName} size={24} color={isFocused ? Color.primary[900] : Color.blueGray[400]} />
                <Text style={{
                  marginTop: 4,
                  fontFamily: fonts.body2.fontFamily,
                  textAlign: 'center',
                  fontSize: 12,
                  color: isFocused ? Color.primary[900] : Color.blueGray[400]
                }}>{Newlabel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
