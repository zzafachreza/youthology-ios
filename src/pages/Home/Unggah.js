import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyLoading, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Unggah({ navigation, route }) {

    const toast = useToast();

    const [kirim, setKirim] = useState({
        fid_user: route.params.fid_user,
        poin: route.params.poin,
        fid_voucher: route.params.fid_voucher,
        foto_klaim: 'https://zavalabs.com/nogambar.jpg',
    });

    const [loading, setLoading] = useState(false)



    const sendServer = () => {
        console.log(kirim);
        if (kirim.foto_klaim == 'https://zavalabs.com/nogambar.jpg') {
            toast.show('Bukti transaksi wajib di unggah !', {
                type: 'danger'
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'klaim_add', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.replace('UnggahSuccess')
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
            <MyHeader title="Unggah Bukti Transfer" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 12,
                    }}>Untuk melakukan klaim voucher, silahkan unggah bukti transaksimu</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: Color.yellow[50],
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center'
                    }}>
                        <MyIcon name='info-square' color={Color.yellow[500]} size={24} />
                        <Text style={{
                            maxWidth: '80%',
                            marginLeft: 12,
                            ...fonts.body3,
                            color: Color.blueGray[900]
                        }}>Silahkan pilih foto bukti transfer dengan format png/jpeg.</Text>
                    </View>
                </View>

                <View style={{
                    padding: 16
                }}>

                    <View style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 200,
                            height: 283,
                            borderWidth: 1,
                            borderColor: Color.blueGray[100],
                            overflow: 'hidden',
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                width: 200,
                                height: 283,
                            }} source={{
                                uri: kirim.foto_klaim,
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
                            maxWidth: 1000,
                            maxHeight: 1000
                        }, response => {
                            // console.log('All Response = ', response);
                            if (!response.didCancel) {
                                setKirim({
                                    ...kirim,
                                    foto_klaim: `data:${response.type};base64, ${response.base64}`,
                                });
                            }

                        });



                    }}>
                        <MyIcon name='upload-square' size={24} color={Color.primary[900]} />
                        <Text style={{
                            ...fonts.headline5,
                            marginLeft: 12,
                            color: Color.primary[900]
                        }}>Pilih File</Text>
                    </TouchableOpacity>

                    <MyGap jarak={24} />
                    {!loading && <TouchableOpacity
                        onPress={sendServer}
                        style={
                            {
                                alignSelf: 'center',
                                width: 340,
                                height: 42,
                                borderRadius: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: kirim.foto_klaim == 'https://zavalabs.com/nogambar.jpg' ? Color.blueGray[400] : Color.primary[900],
                                flexDirection: 'row',

                            }
                        }
                    >
                        <MyIcon name='check-circle' color={Color.white[900]} size={16} />
                        <Text
                            style={{
                                left: 5,
                                ...fonts.headline5,
                                color: Color.white[900]
                            }}>
                            Kirim
                        </Text>
                    </TouchableOpacity>}

                    {loading && <MyLoading />}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})