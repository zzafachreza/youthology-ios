import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyLoading, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';
export default function Tentang({ navigation, route }) {
    const [comp, setComp] = useState({});
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data)
            setComp(res.data.data)
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Tentang Aplikasi" />
            {!loading &&
                <ScrollView>
                    <View style={{
                        padding: 16,
                    }}>
                        <Text style={{
                            ...fonts.headline2,
                            color: Color.blueGray[900],
                            marginBottom: 12,
                        }}>{comp.nama}</Text>
                        <Text style={{
                            ...fonts.body3,
                            color: Color.blueGray[400],
                            marginBottom: 12,
                        }}>{comp.alamat}</Text>
                        <View style={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            backgroundColor: Color.blueGray[50],
                            padding: 12,
                        }}>

                            <Text style={{
                                ...fonts.body3,
                                color: Color.blueGray[400],
                            }}>Lokasi Klinik</Text>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL(comp.website)
                            }}>
                                <Image source={require('../../assets/lokasi.png')} style={{
                                    width: '100%',
                                    height: 120,
                                    marginVertical: 12,
                                    borderRadius: 12,
                                }} />
                            </TouchableOpacity>


                        </View>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(comp.website)
                        }}>
                            <View style={{
                                padding: 10,
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                backgroundColor: Color.primary[900],
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    ...fonts.body3,
                                    flex: 1,
                                    color: Color.white[900]
                                }}>Buka Google Maps</Text>

                                <MyIcon name='round-alt-arrow-right' size={24} color={Color.white[900]} />
                            </View>
                        </TouchableOpacity>

                        <Text style={{
                            ...fonts.body3,
                            color: Color.blueGray[900],
                            marginTop: 12,
                        }}>{comp.deskripsi}</Text>

                    </View>
                </ScrollView>
            }

            {
                loading && <MyLoading />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})