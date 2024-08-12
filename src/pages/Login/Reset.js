import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyIcon, MyLoading } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';

export default function Reset({ navigation, route }) {
    const [kirim, setKirim] = useState({
        email: route.params.email,
        password: '',
    })
    const [buka, setBuka] = useState(false);
    const [buka2, setBuka2] = useState(false);
    const [sama, SetSama] = useState(true);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const sendServer = () => {
        if (kirim.password.length == 0) {
            toast.show('Kode OTP wajib diisi !', {
                type: 'danger'
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'reset_sandi', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    2
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.replace('Login')
                } else {
                    toast.show(res.data.message, {
                        type: 'danger'
                    })
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Buat Kata Sandi Baru" />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 16,
            }}>
                <Text style={{
                    ...fonts.body3,
                    color: Color.blueGray[900]
                }}>Silahkan buat kata sandi baru</Text>
                <MyGap jarak={20} />

                <MyGap jarak={20} />
                {/* Kata Sandi */}
                <View>
                    <Text style={{
                        ...fonts.subheadline3,
                        color: Color.blueGray[900],
                        marginBottom: 8,
                    }}>Buat Kata Sandi</Text>
                    <View style={{
                        height: 50,
                    }}>

                        <TextInput onChangeText={x => {
                            setKirim({
                                ...kirim,
                                password: x
                            })
                        }} value={kirim.password} autoCapitalize='none' secureTextEntry={buka ? false : true} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan kata sandi' style={{
                            ...fonts.body3,
                            flex: 1,
                            height: 50,
                            paddingHorizontal: 12,
                            color: Color.blueGray[900],
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: Color.blueGray[300]
                        }} />

                        <View style={{
                            position: 'absolute',
                            right: 0,

                        }}>
                            <TouchableOpacity style={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                paddingRight: 12,
                            }} onPress={() => setBuka(!buka)}>
                                {!buka && <MyIcon name='eye' color={Color.blueGray[400]} size={24} />}
                                {buka && <MyIcon name='eye-closed' color={Color.blueGray[400]} size={24} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <MyGap jarak={20} />
                {/* Ulangi Kata Sandi */}
                <View>
                    <Text style={{
                        ...fonts.subheadline3,
                        color: Color.blueGray[900],
                        marginBottom: 8,
                    }}>Konfirmasi Kata Sandi</Text>
                    <View style={{
                        height: 50,
                    }}>

                        <TextInput onChangeText={x => {

                            if (kirim.password !== x) {
                                SetSama(false);
                            } else {
                                SetSama(true);
                            }

                            setKirim({
                                ...kirim,
                                repassword: x
                            })
                        }} value={kirim.repassword} autoCapitalize='none' secureTextEntry={buka2 ? false : true} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan ulang kata sandi' style={{
                            ...fonts.body3,
                            flex: 1,
                            height: 50,
                            paddingHorizontal: 12,
                            color: Color.blueGray[900],
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: !sama ? Color.red[500] : Color.blueGray[300]
                        }} />

                        <View style={{
                            position: 'absolute',
                            right: 0,

                        }}>
                            <TouchableOpacity style={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                paddingRight: 12,

                            }} onPress={() => setBuka2(!buka2)}>
                                {!buka2 && <MyIcon name='eye' color={Color.blueGray[400]} size={24} />}
                                {buka2 && <MyIcon name='eye-closed' color={Color.blueGray[400]} size={24} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Kirim" />}
                {loading && <MyLoading />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})