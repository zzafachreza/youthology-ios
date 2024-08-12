import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function EditAccount({ navigation, route }) {
    const [buka, setBuka] = useState(false);
    const [kirim, setKirim] = useState(route.params);

    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const sendServer = () => {

        console.log(kirim);


        setLoading(true);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                storeData('user', res.data.data);
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'MainApp' }]
                // })
                navigation.replace('MainApp');



            }
        })
    }



    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Edit Akun" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        overflow: 'hidden',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 80,
                            height: 80,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.foto_user,
                        }} />
                    </View>
                </View>
                <TouchableOpacity style={{
                    borderWidth: 2,
                    borderColor: Color.primary[900],
                    width: 150,
                    height: 45,
                    borderRadius: 12,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={() => {


                    launchImageLibrary({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);
                        if (!response.didCancel) {
                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                        }

                    });



                }}>
                    <MyIcon name='pen2' size={24} color={Color.primary[900]} />
                    <Text style={{
                        ...fonts.headline5,
                        marginLeft: 12,
                        color: Color.primary[900]
                    }}>Ganti Foto</Text>
                </TouchableOpacity>

                <View style={{
                    padding: 10,
                }}>
                    <MyInput label="Nama Lengkap" iconname='user-rounded' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_lengkap: x
                        })
                    }} value={kirim.nama_lengkap} />
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
                    <MyInput label="Nomor Rekam Medis" iconname='user-heart' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            rekam_medis: x
                        })
                    }} value={kirim.rekam_medis} />
                    <MyGap jarak={20} />
                    <MyInput label="Tempat Lahir" iconname='map-point' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            tempat_lahir: x
                        })
                    }} value={kirim.tempat_lahir} />
                    <MyGap jarak={20} />
                    <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_lahir: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    <MyInput label="Alamat Saat ini" iconname='map-point' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alamat: x
                        })
                    }} value={kirim.alamat} />
                    <MyGap jarak={20} />
                    <MyInput label="Email" iconname='letter' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            email: x
                        })
                    }} value={kirim.email} />
                    {/* Kata Sandi */}
                    <MyGap jarak={20} />
                    <View>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.blueGray[900],
                            marginBottom: 8,
                        }}>Kata Sandi</Text>
                        <View style={{
                            height: 50,
                        }}>

                            <TextInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    newpassword: x
                                })
                            }} value={kirim.newpassword} autoCapitalize='none' secureTextEntry={buka ? false : true} placeholderTextColor={Color.blueGray[400]} placeholder='Abaikan jika tidak ganti kata sandi' style={{
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
                    {!loading && <MyButton title="Simpan" onPress={sendServer} />}
                    {loading && <ActivityIndicator size="large" color={Color.primary[900]} />}
                    <MyGap jarak={20} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})