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

export default function VoucherSaya({ navigation, route }) {
    const [pilih, setPilih] = useState(0);

    const [loading, setLoading] = useState(true);
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);

    useEffect(() => {
        if (isFocus) {
            __getKlaim();
        }
    }, [isFocus]);
    const __getKlaim = () => {
        setLoading(true);
        getData('user').then(uu => {
            axios.post(apiURL + 'klaim', {
                fid_user: uu.id
            }).then(res => {
                console.log('jadwal', res.data);
                setData(res.data);
                setTmp(res.data);
                setLoading(false);
            })
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Voucher Saya" />

            {/* BATAS HEADER */}
            <View style={{
                marginVertical: 8,
                marginHorizontal: 16,
                borderRadius: 12,
                padding: 4,
                backgroundColor: Color.blueGray[50],
                flexDirection: 'row'
            }}>
                <TouchableWithoutFeedback onPress={() => setPilih(0)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilih == 0 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilih == 0 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Pending</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setPilih(1)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilih == 1 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilih == 1 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Selesai Klaim</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{
                padding: 16
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        height: 50,
                        marginRight: 8
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

                                if (pilih > 0) {
                                    let TMPSrc = data.filter(i => i.status !== 'Menunggu Persetujuan').filter(i => i.nama_voucher.toLowerCase().indexOf(x.toLowerCase()) > -1)
                                    if (TMPSrc.length > 0) {
                                        setData(TMPSrc);
                                    } else {
                                        setData(tmp);
                                    }
                                } else {
                                    let TMPSrc = data.filter(i => i.status == 'Menunggu Persetujuan').filter(i => i.nama_voucher.toLowerCase().indexOf(x.toLowerCase()) > -1)
                                    if (TMPSrc.length > 0) {
                                        setData(TMPSrc);
                                    } else {
                                        setData(tmp);
                                    }
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

            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}
            {!loading &&

                <View style={{
                    flex: 1,
                    padding: 16
                }}>

                    <FlatList showsVerticalScrollIndicator={false} maxToRenderPerBatch={2} ListEmptyComponent={<MyEmpty />} data={pilih > 0 ? data.filter(i => i.status !== 'Menunggu Persetujuan') : data.filter(i => i.status == 'Menunggu Persetujuan')} renderItem={(({ item, index }) => {
                        return (

                            <TouchableOpacity onPress={() => navigation.navigate('VoucherDetail', item)} style={{
                                backgroundColor: Color.primary[900],
                                borderWidth: 1,
                                borderRadius: 12,
                                marginBottom: 12,
                                borderColor: Color.blueGray[100]
                            }}>
                                <View style={{
                                    padding: 16,
                                    backgroundColor: Color.white[900],
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,

                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: Color.blueGray[900],
                                            flex: 1,
                                        }}>{item.nama_voucher}</Text>
                                        <Image source={require('../../assets/persen.png')} style={{
                                            width: 24,
                                            height: 24,
                                        }} />
                                    </View>
                                    <Text style={{
                                        ...fonts.caption1,
                                        color: Color.blueGray[400],
                                        flex: 1,
                                    }}>Voucher {item.jenis}</Text>
                                </View>
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
                                    }}>Status</Text>
                                    <Text style={{
                                        ...fonts.body3,
                                        color: item.status == 'Diterima' ? Color.white[900] : item.status == 'Ditolak' ? Color.primary[400] : Color.yellow[500]
                                    }}>{item.status}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })} />
                    {/* <MyGap jarak={200} /> */}
                </View>


            }

            {loading && <MyLoading />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})