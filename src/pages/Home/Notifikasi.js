import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import { MyEmpty, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';

export default function Notifikasi({ navigation, route }) {
    const [pilih, setPilih] = useState(0);

    const [loading, setLoading] = useState(true);
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [cek, setCek] = useState('Semua');
    const toast = useToast();

    useEffect(() => {
        if (isFocus) {
            __getNotifikasi();
        }
    }, [isFocus]);
    const __getNotifikasi = () => {
        setLoading(true);
        getData('user').then(uu => {
            axios.post(apiURL + 'notifikasi', {
                fid_user: uu.id
            }).then(res => {
                console.log('jadwal', res.data);
                setData(res.data);
                setTmp(res.data);
                setLoading(false)

            })
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Pemberitahuan" />


            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}


            <View style={{
                padding: 16,
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <TouchableOpacity onPress={() => {
                        setCek('Semua');
                        setData(tmp)
                    }} style={{
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: cek == 'Semua' ? Color.primary[900] : Color.blueGray[400],
                        backgroundColor: cek == 'Semua' ? Color.primary[50] : Color.white[900],
                        width: 100,
                        borderRadius: 12,
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.primary[900]
                        }}>Semua</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCek('Flash Sale');
                        setData(data.filter(i => i.tipe == 'Flash Sale'))
                    }} style={{
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: cek == 'Flash Sale' ? Color.primary[900] : Color.blueGray[400],
                        backgroundColor: cek == 'Flash Sale' ? Color.primary[50] : Color.white[900],
                        width: 100,
                        borderRadius: 12,
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.primary[900]
                        }}>Flash Sale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCek('Promo');
                        setData(data.filter(i => i.tipe == 'Promo'))
                    }} style={{
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: cek == 'Promo' ? Color.primary[900] : Color.blueGray[400],
                        backgroundColor: cek == 'Promo' ? Color.primary[50] : Color.white[900],
                        width: 100,
                        borderRadius: 12,
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: Color.primary[900]
                        }}>Promo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            height: 50,
                        }}>
                            <View style={{
                                position: 'absolute',
                                left: 12,
                                top: 13,
                            }}>
                                <MyIcon name='magnifer' color={Color.blueGray[300]} size={24} />
                            </View>
                            <TextInput onChangeText={x => {


                                if (x.length > 0) {
                                    let TMPSrc = data.filter(i => i.judul.toLowerCase().indexOf(x.toLowerCase()) > -1)
                                    if (TMPSrc.length > 0) {
                                        setData(TMPSrc);
                                    } else {
                                        setData(tmp);
                                    }
                                } else {
                                    setData(tmp);
                                }

                            }} placeholderTextColor={Color.blueGray[400]} placeholder='Cari' style={{
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
                </View>
                {/* searc */}


                <View style={{
                    flex: 1,
                }}>
                    {!loading && <FlatList ListEmptyComponent={<MyEmpty />} style={{
                        // marginBottom: 150,
                    }} showsVerticalScrollIndicator={false} data={data} renderItem={(({ item, index }) => {
                        return (

                            <Swipeable renderRightActions={() => {
                                return (
                                    <View style={{
                                        width: 100,
                                        padding: 10,
                                        backgroundColor: Color.blueGray[100]
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            console.log(item.id)
                                            axios.post(apiURL + 'notifikasi_delete', {
                                                id: item.id
                                            }).then(res => {
                                                console.log(res.data)
                                                if (res.data.status == 200) {
                                                    toast.show(res.data.message, {
                                                        type: 'success'
                                                    });
                                                    let tmp = [...data];
                                                    tmp.splice(index, 1);
                                                    setData(tmp);
                                                    // __getNotifikasi();
                                                }
                                            })
                                        }} style={{
                                            width: 80,
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon type='ionicon' size={30} name='trash-outline' color={Color.red[500]} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}>
                                <TouchableWithoutFeedback onPress={() => {
                                    if (item.judul == 'Klaim Voucher') {
                                        navigation.navigate('VoucherSaya')
                                    } else if (item.judul == 'Jadwal Perawatan') {
                                        navigation.navigate('JadwalSaya')
                                    }
                                }}>
                                    <View style={{
                                        backgroundColor: Color.white[900],
                                        borderBottomWidth: 1,
                                        padding: 12,
                                        borderColor: Color.blueGray[100]
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                ...fonts.headline4,
                                                color: Color.blueGray[900]
                                            }}>{item.judul}</Text>
                                            <Text style={{
                                                ...fonts.caption1,
                                                color: Color.blueGray[400]
                                            }}>{moment(item.tanggal + ' ' + item.jam).format('HH:mm')}</Text>
                                        </View>
                                        <Text style={{
                                            ...fonts.body3,
                                            color: Color.blueGray[900]
                                        }}>{item.keterangan}</Text>

                                        <Text style={{
                                            // borderWidth: 1,
                                            width: 100,
                                            marginTop: 8,
                                            borderRadius: 100,
                                            textAlign: 'center',
                                            backgroundColor: item.tipe == 'Flash Sale' ? Color.red[500] : item.tipe == 'Promo' ? Color.tealGreen[500] : Color.primary[900],
                                            ...fonts.caption1,
                                            color: Color.white[900]
                                        }}>{item.tipe}</Text>

                                    </View>
                                </TouchableWithoutFeedback>
                            </Swipeable>

                        )
                    })} />
                    }
                    {loading && <MyLoading />}
                </View>
            </View>





        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})