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


export default function Register({ navigation, route }) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_lengkap: '',
        telepon: '',
        rekam_medis: '',
        email: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        password: '',
        repassword: '',
    });

    const [sama, SetSama] = useState(true);

    const sendServer = () => {

        if (kirim.telepon.length == 0) {
            toast.show('Nomor telepon wajib di isi', {
                type: 'danger'
            })
        } else if (kirim.email.length == 0) {
            toast.show('Email wajib di isi', {
                type: 'danger'
            })
        } else if (kirim.nama_lengkap.length == 0) {
            toast.show('Nama lengkap wajib di isi', {
                type: 'danger'
            })
        } else if (kirim.password.length == 0) {
            toast.show('Kata sandi wajib di isi', {
                type: 'danger'
            })
        } else {
            setLoading(true);
            console.log(kirim);
            axios.post(apiURL + 'register', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success',
                        id: 'zvl'
                    });
                    navigation.navigate('RegisterSuccess', {
                        user: res.data.data
                    });
                    storeData('user', res.data.data)
                } else {
                    toast.show(res.data.message, {
                        type: 'error',
                        id: 'zvl'
                    });
                }
            }).finally(() => {
                setLoading(false);
            })
        }

    }

    LocaleConfig.locales['id'] = {
        monthNames: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'Nopember',
            'Desember'
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul.', 'Agt', 'Sept', 'Okt', 'Nop', 'Des'],
        dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: "Hari ini"
    };
    LocaleConfig.defaultLocale = 'id';

    const [buka, setBuka] = useState(false);
    const [buka2, setBuka2] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.primary[900]
        }}>


            <StatusBar backgroundColor={Color.primary[900]} barStyle="light-content" />
            <MyHeader color={Color.white[900]} />
            <View style={{
                flex: 1,
                padding: 16,
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={{
                            ...fonts.headline2,
                            color: Color.white[900],
                            textAlign: 'center',
                            marginBottom: 2
                        }}>Temukan Solusi Permasalahan Kulitmu Disini</Text>
                        <Text style={{
                            ...fonts.body3,
                            color: Color.white[900],
                            textAlign: 'center',
                            marginTop: 2,
                        }}>Lengkapi Data Diri Sesuai KTP</Text>
                    </View>
                    <MyGap jarak={24} />
                    <View style={{
                        padding: 20,
                        backgroundColor: Color.white[900],
                        borderRadius: 20,
                    }}>
                        {/* Nama Lengkap */}
                        <View>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.blueGray[900],
                                marginBottom: 8,
                            }}>Nama Lengkap</Text>
                            <View style={{
                                height: 50,
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: 13,
                                }}>
                                    <MyIcon name='user-rounded' color={Color.blueGray[300]} size={24} />
                                </View>
                                <TextInput onChangeText={x => {
                                    setKirim({
                                        ...kirim,
                                        nama_lengkap: x
                                    })
                                }} value={kirim.nama_lengkap} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan nama lengkap' style={{
                                    ...fonts.body3,
                                    flex: 1,
                                    paddingLeft: 44,
                                    height: 50,
                                    paddingHorizontal: 12,
                                    color: Color.blueGray[900],
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: Color.blueGray[300]
                                }} />

                            </View>
                        </View>

                        <MyGap jarak={20} />
                        {/* Nomor Telepon */}
                        <View>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.blueGray[900],
                                marginBottom: 8,
                            }}>Nomor Telepon</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    height: 50,
                                    width: 70,
                                    backgroundColor: Color.blueGray[100],
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    borderTopWidth: 1,
                                    borderWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: Color.blueGray[300],
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        ...fonts.body3,
                                        color: Color.blueGray[400],
                                        marginRight: 4,
                                    }}>+62</Text>
                                    <MyIcon name='alt-arrow-down' color={Color.blueGray[300]} size={24} />
                                </View>
                                <TextInput value={kirim.telepon} keyboardType='phone-pad' placeholderTextColor={Color.blueGray[400]} placeholder='000-0000-0000' style={{
                                    ...fonts.body3,
                                    flex: 1,
                                    height: 50,
                                    paddingHorizontal: 12,
                                    color: Color.blueGray[900],
                                    borderWidth: 1,
                                    borderTopRightRadius: 8,
                                    borderBottomRightRadius: 8,
                                    borderColor: Color.blueGray[300]
                                }} onChangeText={x => {
                                    console.log(maskJs('999-9999-99999', x));
                                    setKirim({
                                        ...kirim,
                                        telepon: maskJs('999-9999-99999', x)
                                    })
                                }} />
                            </View>
                        </View>
                        <MyGap jarak={20} />
                        {/* Nomor Rekam Medis */}
                        <View>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.blueGray[900],
                                marginBottom: 8,
                            }}>Nomor Rekam Medis</Text>
                            <View style={{
                                height: 50,
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: 13,
                                }}>
                                    <MyIcon name='user-heart' color={Color.blueGray[300]} size={24} />
                                </View>
                                <TextInput value={kirim.rekam_medis} onChangeText={x => {
                                    setKirim({
                                        ...kirim,
                                        rekam_medis: x
                                    })
                                }} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan nomor rekam medis' style={{
                                    ...fonts.body3,
                                    flex: 1,
                                    paddingLeft: 44,
                                    height: 50,
                                    paddingHorizontal: 12,
                                    color: Color.blueGray[900],
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: Color.blueGray[300]
                                }} />

                            </View>
                        </View>
                        <MyGap jarak={20} />
                        {/* Email */}
                        <View>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.blueGray[900],
                                marginBottom: 8,
                            }}>Email</Text>
                            <View style={{
                                height: 50,
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: 13,
                                }}>
                                    <MyIcon name='letter' color={Color.blueGray[300]} size={24} />
                                </View>
                                <TextInput value={kirim.email} onChangeText={x => {
                                    setKirim({
                                        ...kirim,
                                        email: x
                                    })
                                }} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan email' style={{
                                    ...fonts.body3,
                                    flex: 1,
                                    paddingLeft: 44,
                                    height: 50,
                                    paddingHorizontal: 12,
                                    color: Color.blueGray[900],
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: Color.blueGray[300]
                                }} />

                            </View>
                        </View>

                        <MyGap jarak={20} />
                        <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => {
                            setKirim({
                                ...kirim,
                                tanggal_lahir: x
                            })
                        }} />

                        {/* <Calendar
                            scrollable
                            theme={{

                                textDayHeaderFontFamily: fonts.body3.fontFamily,
                                textMonthFontFamily: fonts.headline4.fontFamily,
                                textDayFontFamily: fonts.headline5.fontFamily,
                                textDayFontSize: 14,
                                arrowColor: Color.primary[900],
                                selectedDayBackgroundColor: Color.secondary[900],
                                todayTextColor: Color.secondary[900]

                            }}
                            onDayPress={x => {
                                console.log(x)
                                setKirim({
                                    ...kirim,
                                    tanggal_lahir: x.dateString
                                })
                            }}
                            markedDates={{
                                [kirim.tanggal_lahir]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                            }}

                        /> */}
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

                        <MyGap jarak={24} />
                        {!loading && <MyButton title="Daftar" onPress={sendServer} />}
                        {loading && <MyLoading />}
                        <MyGap jarak={12} />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{
                                ...fonts.body3,
                                color: Color.blueGray[400],
                                textAlign: 'center'
                            }}>
                                Saya sudah memiliki akun? <Text style={{
                                    ...fonts.headline5,
                                    color: Color.primary[900],
                                    textAlign: 'center'
                                }}>
                                    Masuk Sekarang!
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    active: {
        marginHorizontal: 4,
        width: 32,
        height: 4,
        backgroundColor: Color.primary[900],
        borderRadius: 100
    },
    disable: {
        marginHorizontal: 4,
        width: 32,
        height: 4,
        backgroundColor: Color.blueGray[300],
        borderRadius: 100
    }
})