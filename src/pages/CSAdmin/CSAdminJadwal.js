import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyLoading, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from 'react-native-wheel-pick';

export default function CSAdminJadwal({ navigation, route }) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState(route.params);

    const [waktu, setWaktu] = useState([]);
    const [info, setInfo] = useState('')

    useEffect(() => {
        __getwaktu()
    }, []);

    const __getwaktu = (x = kirim.tanggal_janji) => {
        setLoading(true);
        axios.post(apiURL + 'waktu', {
            fid_dokter: route.params.fid_dokter,
            tanggal_janji: x
        }).then(res => {
            console.log(res.data);

            if (res.data.data.length > 0) {
                setWaktu(res.data.data);
                setInfo(res.data.informasi);
            } else {
                setInfo(res.data.informasi);
                setWaktu([])
            }
            // setWaktu(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }


    const sendServer = () => {
        console.log(kirim);
        if (kirim.jam_janji.length == 0) {
            toast.show('Jam perawatan wajib di pilih', {
                type: 'danger'
            })
        }
        navigation.navigate('CSAdminKonfirmasi', kirim)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeaderPoint />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 12,
                    }}>Pilih tanggal dan jam melakukan perawatan {route.params.dokter}</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: Color.yellow[50],
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MyIcon name='info-square' color={Color.yellow[500]} size={24} />
                        <Text style={{
                            marginLeft: 12,
                            ...fonts.body3,
                            color: Color.blueGray[900]
                        }}>Silahkan pilih tanggal dan jam kapan kamu akan datang melakukan perawatan</Text>
                    </View>
                </View>

                <View style={{
                    padding: 16
                }}>
                    <Calendar
                        scrollable
                        maxDate={kirim.tanggal_janji_max}
                        minDate={moment().add(7, 'day').format('YYYY-MM-DD')}
                        disableAllTouchEventsForDisabledDays={true}
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
                            console.log(x);
                            __getwaktu(x.dateString)
                            setKirim({
                                ...kirim,
                                tanggal_janji: x.dateString
                            })
                        }}
                        markedDates={{
                            [kirim.tanggal_janji]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}

                    />
                    <MyGap jarak={20} />
                    {waktu.length > 0 &&
                        <Text style={{
                            ...fonts.headline4,
                            color: Color.blueGray[900]
                        }}>Pilih Jam Perawatan</Text>
                    }

                    {info.length > 0 &&

                        <Text style={{
                            ...fonts.body3,
                            textAlign: 'center',
                            color: Color.red[500]
                        }}>{route.params.dokter} - {info}</Text>

                    }

                    {!loading && <>

                        {waktu.length > 0 &&
                            <Picker
                                style={{ backgroundColor: Color.white[900], width: '100%', height: 200 }}
                                selectedValue={kirim.jam_janji}
                                textSize={30}
                                pickerData={waktu}
                                selectLineSize={6}
                                isShowSelectBackground={true}
                                selectTextColor={Color.blueGray[900]}
                                selectBackgroundColor={Color.primary[50] + 'AA'}
                                // selectLineColor={Color.primary[50]}
                                onValueChange={value => setKirim({
                                    ...kirim,
                                    jam_janji: value
                                })}
                            />
                        }
                        {/* <View style={{
                            marginVertical: 4,
                            backgroundColor: Color.white[900],
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: Color.blueGray[300]
                        }}>
                            <View style={{
                                position: 'absolute',
                                left: 12,
                                top: 13,
                            }}>
                                <MyIcon name="clock-square" color={Color.blueGray[300]} size={24} />
                            </View>
                            <Picker style={{ width: '90%', height: 50, left: 40, transform: [{ scale: 1 }] }}
                            >
                                {waktu.map(item => {
                                    return <Picker.Item textStyle={{ fontSize: 12, ...fonts.body3, color: Color.blueGray[900], }} value={item.jam} label={item.jam} />;
                                })}
                            </Picker>
                        </View> */}


                        {/* <FlatList columnWrapperStyle={{
                            flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginVertical: 4, flex: 1,
                        }} style={{
                            marginBottom: 20, flexGrow: 0
                        }} data={waktu} numColumns={2} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (item.akses == 'Close') {
                                        toast.show('Maaf jam tidak tersedia', {
                                            type: 'danger'
                                        })
                                    } else {
                                        setKirim({
                                            ...kirim,
                                            jam_janji: item.jam
                                        })
                                    }
                                }}>
                                    <View style={item.akses == 'Close' ? styles.btnDisable : item.jam == kirim.jam_janji ? styles.btnSelected : styles.btnAvaliable}>
                                        <Text style={item.akses == 'Close' ? styles.textDisable : item.jam == kirim.jam_janji ? styles.textSelected : styles.textAvaliable}>{item.jam}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} /> */}
                    </>}

                    {loading && <MyLoading />}



                    <MyGap jarak={24} />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 6,
                        }}>
                            <MyButton onPress={() => navigation.goBack()} title="Kembali" backgroundColor={Color.white[900]} textColor={Color.primary[900]} borderSize={2} />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 6
                        }}>
                            {waktu.length > 0 &&
                                <MyButton title="Lanjutkan" onPress={sendServer} />
                            }
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnAvaliable: {
        width: windowWidth / 2.5,
        marginVertical: 4,
        // width: 160,
        padding: 10,
        marginHorizontal: 6,
        borderRadius: 100,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textAvaliable: {
        ...fonts.subheadline3,
        color: Color.blueGray[900]
    },
    btnSelected: {
        width: windowWidth / 2.5,
        marginHorizontal: 6,
        borderRadius: 100,
        backgroundColor: Color.secondary[50],
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.secondary[900]
    },
    textSelected: {
        ...fonts.subheadline3,
        color: Color.secondary[900]
    },

    btnDisable: {
        width: windowWidth / 2.5,
        marginHorizontal: 6,
        borderRadius: 100,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textDisable: {
        ...fonts.subheadline3,
        color: Color.blueGray[400]
    }

})