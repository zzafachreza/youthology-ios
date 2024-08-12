import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import KulitBerjerawat from '../../assets/KulitBerjerawat.svg'
import KulitKusam from '../../assets/KulitKusam.svg'
import KulitKendur from '../../assets/KulitKendur.svg'
import FlekHitam from '../../assets/FlekHitam.svg'
import { MyButton, MyEmpty, MyGap, MyHeader, MyIcon, MyLoading } from '../../components';
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

export default function Tukar({ navigation, route }) {
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const toast = useToast();
    const isFocus = useIsFocused();
    const [user, setUser] = useState({});
    const [dataVoucher, setDataVoucher] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [pilih, setPilih] = useState({});
    const [loading, setLoading] = useState(true);

    const __getVouhcer = () => {

        axios.post(apiURL + 'voucher_all', {
            tipe: 'Regular'
        }).then(res => {
            console.log(res.data);
            setDataVoucher(res.data);
            setLoading(false)

        })

    }

    const __GetUserProfile = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'user_data', {
                id: uu.id
            }).then(res => {
                console.log(res.data);
                setUser(res.data);
            })
        })
    }
    useEffect(() => {

        if (isFocus) {
            __getVouhcer();
            __GetUserProfile();
        }

    }, [isFocus]);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <MyHeader title="Tukarkan Reward" />

            <View style={{
                flex: 1,
                padding: 16
            }}>
                <Text style={{
                    ...fonts.headline4,
                    marginBottom: 10,
                }}>Yuk, ambil reward Kamu! 🤩 </Text>
                {!loading &&

                    <FlatList ListEmptyComponent={<MyEmpty />} data={dataVoucher.filter(i => i.poin <= parseInt(user.poin_saya))} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                if (item.jumlah == 0) {
                                    toast.show("Maaf voucher sudah habis", {
                                        type: 'danger'
                                    });
                                } else {
                                    setPilih(item);
                                    setModalVisible(true);
                                }

                            }} style={{
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
                                    backgroundColor: item.jumlah == 0 ? Color.blueGray[200] : Color.white[900],
                                    borderBottomWidth: 1,
                                    borderColor: Color.blueGray[100],
                                    borderTopRightRadius: 12,
                                    borderBottomRightRadius: 12,
                                }}>
                                    <Text style={{
                                        ...fonts.headline5,
                                        color: item.jumlah == 0 ? Color.blueGray[400] : Color.blueGray[900],
                                    }}>{item.nama_voucher}</Text>
                                    <Text style={{
                                        ...fonts.body3,
                                        color: Color.blueGray[400],
                                        marginBottom: 8,
                                    }}>{item.informasi}</Text>



                                    <DashedLine dashLength={8} dashThickness={1} dashGap={5} dashColor={Color.blueGray[200]} dashStyle={{ borderRadius: 2 }} />
                                    <View style={{

                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 8,



                                    }}>

                                        <Text style={{

                                            flex: 1,
                                            ...fonts.headline5,
                                            color: Color.blueGray[900]
                                        }}>Klaim Reward</Text>
                                        <MyIcon name='round-alt-arrow-right' size={24} color={Color.primary[900]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                }

                {loading && <MyLoading />}
            </View>


            <Modal style={{
                margin: 0,
            }} isVisible={isModalVisible}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                onRequestClose={() => {

                    setModalVisible(!isModalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{
                        height: windowHeight / 1.1,
                        backgroundColor: Color.white[900],
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        paddingTop: 24,
                        paddingHorizontal: 18,
                        paddingBottom: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline4,
                                color: Color.blueGray[900],
                            }}>Detail Reward</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>



                        <View style={{
                            backgroundColor: Color.white[900],
                            marginTop: 10,
                            borderRadius: 12,
                            flexDirection: 'row',
                            overflow: 'hidden',
                            marginBottom: 12,
                        }}>
                            <Image style={{
                                height: '100%',
                                width: 45,
                            }} source={pilih.jenis == 'Discount' ? require('../../assets/dics.png') : require('../../assets/cash.png')} />
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
                                }}>{pilih.nama_voucher}</Text>
                                <Text style={{
                                    ...fonts.body3,
                                    color: Color.blueGray[400],
                                    marginBottom: 8,
                                }}>{pilih.informasi}</Text>



                                <DashedLine dashLength={8} dashThickness={1} dashGap={5} dashColor={Color.blueGray[200]} dashStyle={{ borderRadius: 2 }} />
                                <View style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 8,



                                }}>
                                    <MyIcon name='history-3' size={16} color={Color.blueGray[900]} />
                                    <Text style={{
                                        left: 8,
                                        flex: 1,
                                        ...fonts.caption1,
                                        color: Color.blueGray[900]
                                    }}>Berlaku sampai {moment(pilih.expired).format('DD MMMM YYYY')}</Text>
                                </View>
                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{
                                ...fonts.body3,
                            }}>Syarat & Ketentuan:</Text>
                            <RenderHtml
                                tagsStyles={{
                                    p: {
                                        fontFamily: fonts.body3.fontFamily,
                                        textAlign: 'justify',
                                        lineHeight: 26,
                                    },
                                }}
                                systemFonts={systemFonts}
                                contentWidth={windowWidth}
                                source={{
                                    html: pilih.syarat_ketentuan
                                }}
                            />
                        </ScrollView>

                        <MyGap jarak={20} />

                        <MyButton title="Klaim Reward" onPress={() => {
                            console.log(pilih);
                            setModalVisible(false);
                            // navigation.navigate('Unggah', {
                            //     fid_user: user.id,
                            //     fid_voucher: pilih.id,
                            //     poin: pilih.poin,
                            // });

                            axios.post(apiURL + 'reward_add', {
                                fid_user: user.id,
                                fid_voucher: pilih.id,
                                poin: pilih.poin,
                            }).then(res => {
                                console.log(res.data);
                                if (res.data.status == 200) {
                                    toast.show(res.data.message, {
                                        type: 'success'
                                    });

                                    __GetUserProfile();

                                }
                            }).finally(() => {
                                // setLoading(false);
                            })

                        }} />

                        <MyGap jarak={8} />

                        <MyButton onPress={() => setModalVisible(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})