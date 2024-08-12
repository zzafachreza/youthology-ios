import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Color, DimensionThisPhone, MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { apiURL, getData } from '../../utils/localStorage';
import MyIcon from '../MyIcon';
import axios from 'axios';
export default function MyHeader({ onPress, color = Color.blueGray[900], title, icon = false, iconname = 'share' }) {


  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __GetUserProfile()
    }

  }, [isFocus]);


  const __GetUserProfile = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'user_data', {
        id: uu.id
      }).then(res => {
        console.log(res.data);
        setUser(res.data);
      })
    })
  }
  return (


    <View style={{
      marginTop: 16,
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingVertical: 16,
    }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{

      }}>
        <MyIcon name='arrow-left-outline' size={24} color={color} />
      </TouchableOpacity>

      <Text style={{
        ...fonts.headline4,
        flex: 1,
        left: 24,

        color: color
      }}>{title}</Text>

      {icon &&
        <TouchableOpacity onPress={onPress} style={{

        }}>
          <MyIcon name={iconname} size={24} color={color} />
        </TouchableOpacity>
      }
    </View>

  );
}

const styles = StyleSheet.create({});
