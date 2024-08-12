import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Color, DimensionThisPhone, MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { apiURL, getData } from '../../utils/localStorage';
import MyIcon from '../MyIcon';
import axios from 'axios';
import FastImage from 'react-native-fast-image'

export default function MyHeaderPoint({ title = 'CS Admin', level }) {
    const navigation = useNavigation();
    // const [user, setUser] = useState({
    //     nama_lengkap: 'Nama Saya'
    // });
    // const isFocus = useIsFocused();
    // useEffect(() => {
    //     if (isFocus) {
    //         __GetUserProfile()
    //     }

    // }, [isFocus]);


    // const __GetUserProfile = () => {
    //     getData('user').then(uu => {
    //         axios.post(apiURL + 'user_data', {
    //             id: uu.id
    //         }).then(res => {
    //             console.log(res.data);
    //             setUser(res.data);
    //         })
    //     })
    // }

    return (
        <View style={{
            height: 100,
            backgroundColor: Color.primary[900],
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16
        }}>
            <Text style={{
                flex: 1,
                ...fonts.headline3,
                color: Color.white[900]
            }}>{title}</Text>
            <View style={{

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Member')}>
                    <FastImage source={user.member == 'Silver' ? require('../../assets/badgeSilver.png') : user.member == 'Gold' ? require('../../assets/badgeGold.png') : require('../../assets/badgePlatinum.png')} style={{
                        width: 100,
                        resizeMode: 'contain',
                        height: 35
                    }} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')} style={{
                    width: 40,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#FFFFFF1F',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MyIcon name='bell' size={24} color={Color.white[900]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})