import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Modal from "react-native-modal";

export default function CSAdmin({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [isVisible, setModalVisible] = useState(false);
    const [kirim, setKirim] = useState({
        nama_lengkap: '',
        telepon: '',
        fid_perawatan: '',
        fid_dokter: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Perempuan',
        rekam_medis: '',
        alamat: '',
        tanggal_janji: moment().add(7, 'day').format('YYYY-MM-DD'),
        tanggal_janji_max: moment().add(37, 'day').format('YYYY-MM-DD'),
        jam_janji: ''
    });


    const [perawatan, setPerawatan] = useState([
        {
            label: '',
            value: ''
        }
    ]);

    const [dokter, setDokter] = useState([
        {
            label: '',
            value: ''
        }
    ]);

    const sendServer = () => {
        let doktmp = dokter.filter(i => i.id == kirim.fid_dokter);

        if (perawatan.filter(i => i.cek > 0).length == 0) {
            toast.show('Minimal pilih 1 jenis perawatan', {
                type: 'danger'
            })
        } else if (kirim.nama_lengkap.length == 0) {
            toast.show('Nama lengkap wajib di isi', {
                type: 'danger'
            })
        } else if (kirim.telepon.length == 0) {
            toast.show('Nomor telepon wajib di isi', {
                type: 'danger'
            })
        } else {
            console.log({
                ...kirim,
                dokter: dokter.filter(i => i.id == kirim.fid_dokter)[0].label,
                perawatan: perawatan.filter(i => i.cek > 0)
            })
            // console.log(doktmp)
            navigation.navigate('CSAdminJadwal', {
                ...kirim,
                dokter: dokter.filter(i => i.id == kirim.fid_dokter)[0].label,
                perawatan: perawatan.filter(i => i.cek > 0)
            })
        }


    }

    const [user, setUser] = useState({})
    const isFocus = useIsFocused();
    useEffect(() => {

        if (isFocus) {

            getData('user').then(res => {

                setUser(res);
                // setKirim({
                //     ...kirim,
                //     fid_user: res.id,
                // })
                setLoading(true);
                axios.post(apiURL + 'perawatan').then(per => {

                    setPerawatan(per.data);
                    axios.post(apiURL + 'dokter').then(dok => {
                        console.log(dok.data)
                        setDokter(dok.data);
                        setKirim({
                            ...kirim,
                            fid_user: res.id,
                            fid_perawatan: per.data[0].value,
                            fid_dokter: dok.data[0].value,
                            dokter: dok.data[0].label,
                            perawatan: per.data[0].label,

                        })
                    }).finally(() => {
                        setLoading(false);
                    })



                })
            });
        }


    }, [isFocus])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeaderPoint />
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                // backgroundColor: Color.primary[900],
                opacity: 0.5,
                zIndex: 99,
                height: windowHeight,
                width: windowWidth
            }}>
                <Spinner isVisible={true} size={100} type={"Bounce"} color={Color.primary[900]} />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 12,
                    }}>Lengkapi data pribadi milikmu untuk melanjutkan pemesanan</Text>
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
                        }}>Pastikan data yang kamu masukkan sesuai dengan kartu identitas penduduk.</Text>
                    </View>
                </View>

                <View style={{
                    padding: 16
                }}>
                    <TouchableOpacity onPress={() => {
                        try {
                            setLoading(true)
                            setKirim({
                                ...kirim,
                                nama_lengkap: user.nama_lengkap,
                                telepon: user.telepon,
                                tanggal_lahir: user.tanggal_lahir,
                                rekam_medis: user.rekam_medis,
                                alamat: user.alamat

                            })
                        } catch (error) {

                        } finally {
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000);
                        }
                    }} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end'
                    }}>
                        <Icon type='ionicon' name='copy-outline' color={Color.primary[900]} size={20} />
                        <Text style={{
                            ...fonts.body3,
                            marginLeft: 10,
                            color: Color.primary[900]
                        }}>Gunakan Informasi Akun</Text>
                    </TouchableOpacity>
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
                    {/* Jenis Perawatan */}
                    {/* <MyPicker value={kirim.fid_perawatan} iconname='cosmetic' label="Jenis Perawatan" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_perawatan: x
                        })
                    }} data={perawatan} /> */}
                    <MyGap jarak={20} />
                    {/* Jenis Perawatan */}
                    <Text
                        style={{
                            ...fonts.subheadline3,
                            color: Color.blueGray[900],
                            marginBottom: 8,
                        }}>
                        Jenis Perawatan
                    </Text>

                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                    }}>
                        <View style={{
                            height: 50,
                            borderWidth: 1,
                            borderColor: Color.blueGray[300],
                            backgroundColor: Color.white[900],
                            borderRadius: 8,
                            padding: 12,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MyIcon name='cosmetic' size={20} color={Color.blueGray[300]} />
                            <Text style={{
                                ...fonts.body3,
                                left: 8,
                                color: Color.blueGray[400],
                            }}>Pilih Perawatan</Text>
                        </View>
                    </TouchableOpacity>

                    <FlatList contentContainerStyle={{
                        justifyContent: 'space-evenly'
                    }} data={perawatan.filter(i => i.cek > 0)} numColumns={1} renderItem={({ item, index }) => {
                        return (
                            <View onPress={() => {
                                let temp = [...perawatan]
                                temp[index].cek = 0;
                                setPerawatan(temp)
                            }} style={{
                                flex: 1,
                                // borderBottomWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                // margin: 5,
                                marginTop: 4,

                                flexDirection: 'row'
                            }}>
                                <Icon type='ionicon' name='bookmark' color={Color.primary[900]} />
                                <Text style={{
                                    flex: 1,
                                    marginLeft: 5,
                                    ...fonts.body3,
                                    color: Color.blueGray[900],
                                }}>{item.nama_perawatan}</Text>

                            </View>
                        )
                    }} />
                    <MyGap jarak={20} />
                    <MyPicker iconname='stethoscope' label="Pilih Dokter" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_dokter: x
                        })
                    }} data={dokter} />

                    <MyGap jarak={20} />
                    <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_lahir: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    <MyPicker iconname='user-rounded' label="Jenis Kelamin" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis_kelamin: x
                        })
                    }} data={[
                        {
                            label: 'Perempuan',
                            value: 'Perempuan'
                        },
                        {
                            label: 'Laki-laki',
                            value: 'Laki-laki'
                        },

                    ]} />
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
                    <MyInput iconname='map-point' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alamat: x
                        })
                    }} label="Alamat" value={kirim.alamat} placeholder="Ketikkan alamat domisili" />
                    <MyGap jarak={24} />
                    <MyButton title="Pilih Tanggal & Jam" onPress={sendServer} />

                </View>
            </ScrollView>
            <Modal style={{
                margin: 0,
            }} isVisible={isVisible}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                onRequestClose={() => {

                    setModalVisible(!isVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{
                        height: windowHeight / 1.2,
                        backgroundColor: Color.white[900],
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        paddingTop: 24,
                        paddingHorizontal: 18
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline4,
                                color: Color.blueGray[900],
                            }}>Jenis Perawatan</Text>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)

                            }}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            flex: 1,
                            padding: 16,
                        }}>
                            <FlatList contentContainerStyle={{
                                justifyContent: 'space-evenly'
                            }} data={perawatan} numColumns={1} renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        let temp = [...perawatan]
                                        temp[index].cek = temp[index].cek > 0 ? 0 : 1;
                                        setPerawatan(temp)
                                    }} style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        borderColor: item.cek > 0 ? Color.primary[900] : Color.blueGray[300],
                                        padding: 10,
                                        margin: 5,

                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.body3,
                                            color: Color.blueGray[900],
                                        }}>{item.nama_perawatan}</Text>
                                        <Icon type='ionicon' name={item.cek > 0 ? 'checkmark-circle' : 'checkmark-circle-outline'} color={item.cek > 0 ? Color.primary[900] : Color.blueGray[300]} />
                                    </TouchableOpacity>
                                )
                            }} />
                        </View>


                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})