import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import KulitBerjerawat from '../../assets/KulitBerjerawat.svg'
import KulitKusam from '../../assets/KulitKusam.svg'
import KulitKendur from '../../assets/KulitKendur.svg'
import FlekHitam from '../../assets/FlekHitam.svg'
import { MyButton, MyGap, MyHeader, MyIcon, MyLoading } from '../../components';
import CountDown from 'react-native-countdown-component';
import MyCarouser from '../../components/MyCarouser';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Toast, useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import DashedLine from 'react-native-dashed-line';
import RenderHtml from 'react-native-render-html';
import FastImage from 'react-native-fast-image'
import ImageView from 'react-native-image-viewing';

export default function VoucherDetail({
    navigation, route
}) {

    const item = route.params;
    const [loading, setLoaing] = useState(true);

    // IMAGE VIEW ZOOM
    const [gambarPilih, setGambarPilih] = useState([
        {
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
    ])
    const [visible, setIsVisible] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeader title="Detail" />
            <View style={{
                padding: 16
            }}>
                {/* COMPONN VOUCHER */}
                <View style={{
                    backgroundColor: Color.white[900],

                    borderRadius: 12,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    marginBottom: 12,
                }}>
                    <Image style={{
                        height: '100%',
                        width: 45,
                    }} source={item.jenis == 'Discount' ? require('../../assets/dics.png') : require('../../assets/cash.png')} />
                    <View style={{
                        flex: 1,
                        padding: 12,
                        borderTopWidth: 1,
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: Color.blueGray[100],
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                    }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: Color.blueGray[900],
                        }}>{item.nama_voucher}</Text>
                        <Text style={{
                            ...fonts.body3,
                            color: Color.blueGray[400],
                            marginBottom: 8,
                        }}>{item.informasi}</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}>
                            <MyIcon name='history-3' size={16} color={Color.blueGray[900]} />
                            <Text style={{
                                left: 8,
                                flex: 1,
                                ...fonts.caption1,
                                color: Color.blueGray[900]
                            }}>Berlaku sampai {moment(item.expired).format('DD MMMM YYYY')}</Text>
                        </View>

                        <DashedLine dashLength={8} dashThickness={1} dashGap={5} dashColor={Color.blueGray[200]} dashStyle={{ borderRadius: 2 }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 8,
                        }}>
                            <Image source={require('../../assets/poin.png')} style={{
                                width: 24,
                                height: 24,
                            }} />
                            <Text style={{
                                left: 8,
                                flex: 1,
                                ...fonts.headline5,
                                color: Color.blueGray[900]
                            }}>{item.poin} poin</Text>
                            {/* <Text style={{
                                // flex: 1,
                                ...fonts.body3,
                                color: Color.blueGray[900]
                            }}>Tersisa {item.jumlah} voucher</Text> */}

                        </View>
                    </View>
                </View>

                <View style={{
                    padding: 10,
                    borderRadius: 12,
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
                {/* IMAGE */}


                <FastImage
                    onLoad={() => setLoaing(false)}
                    style={{
                        marginTop: 12,
                        width: '100%',
                        alignSelf: 'center',
                        height: 300,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />





                {loading && item.tipe == 'Flash Sale' && <MyLoading />}

            </View>


            {/* // IMAGE VIEW ZOOM */}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})