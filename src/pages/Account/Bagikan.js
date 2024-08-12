import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import Tiktok from '../../assets/Tiktok.svg'
import axios from 'axios';
import { Icon } from 'react-native-elements';
export default function Bagikan({ navigation, route }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Ikuti Kami" />
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.instagram.com/youthologyclinic/')}
                    style={styles.btnSocial}
                >
                    <Icon type='ionicon' name='logo-instagram' color={Color.white[900]} size={20} />
                    <Text style={styles.textSocial}>
                        Instagram
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.tiktok.com/@youthologyclinic')}
                    style={styles.btnSocial}
                >
                    <Tiktok fill="white" width={20} height={20} />
                    <Text
                        style={styles.textSocial}>
                        Tiktok
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.youtube.com/channel/UCuP37QIrgIgEaILL9zyT-fg')}
                    style={styles.btnSocial}
                >
                    <Icon type='ionicon' name='logo-youtube' color={Color.white[900]} size={20} />
                    <Text
                        style={styles.textSocial}>
                        Youtube
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Linking.openURL('https://api.whatsapp.com/send/?phone=6287880006776')}
                    style={styles.btnSocial}
                >
                    <Icon type='ionicon' name='logo-whatsapp' color={Color.white[900]} size={20} />
                    <Text
                        style={styles.textSocial}>
                        Whatsapp
                    </Text>
                </TouchableOpacity>


                {/* <MyGap jarak={10} />
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://tr.ee/ca5OvMegvx')}
                    style={
                        {
                            alignSelf: 'center',
                            width: 340,
                            height: 42,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.socialMedia.youtube,
                            flexDirection: 'row',

                        }
                    }
                >
                    <Icon type='ionicon' name='logo-youtube' color={Color.white[900]} size={20} />
                    <Text
                        style={{
                            left: 5,
                            ...fonts.headline5,
                            color: Color.white[900]
                        }}>
                        Youtube
                    </Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    btnSocial: {
        alignSelf: 'center',
        width: '100%',
        height: windowHeight / 7,
        borderRadius: 12,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.primary[900],
        flexDirection: 'row',

    },
    textSocial: {
        left: 5,
        ...fonts.headline3,
        color: Color.white[900]
    }
})