import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { MyButton, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import DashedLine from 'react-native-dashed-line';
import RenderHtml from 'react-native-render-html';
import Modal from "react-native-modal";
import { useToast } from 'react-native-toast-notifications';

export default function Member({ navigation, route }) {
    const [isModalVisiblePoin, setModalVisiblePoin] = useState(false);
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const toast = useToast();
    const [isModalVisible, setModalVisible] = useState(false);
    const [pilih, setPilih] = useState(0);
    const [pilihmenu, setPilihmenu] = useState(0);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const isFocus = useIsFocused();
    const [data, setData] = useState([
        {
            level: 'Silver',
            keuntungan: '',
        },
        {
            level: 'Gold',
            keuntungan: '',
        },
        {
            level: 'Platinum',
            keuntungan: '',
        }
    ]);
    const [tmp, setTmp] = useState([]);
    const [cek, setCek] = useState('Silver')
    const [dataVoucher, setDataVoucher] = useState([]);
    useEffect(() => {
        if (isFocus) {
            _getMember();
            __getPoinHarian();
        }

        __getVouhcer()
    }, [isFocus]);

    const __getVouhcer = () => {

        axios.post(apiURL + 'voucher_all', {
            tipe: 'Regular'
        }).then(res => {
            setDataVoucher(res.data);
            setLoading(false);

        })

    }
    const [REWARD, setREWARD] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [DAILY, SETDAILY] = useState(0)
    const __getPoinHarian = () => {
        axios.post(apiURL + 'get_daily').then(res => {
            console.log('jadwal', res.data);
            SETDAILY(res.data);
            let tmp = [];
            for (let index = 0; index < 7; index++) {

                if (index < (7 - 1)) {
                    tmp.push(parseFloat(res.data))
                } else {
                    tmp.push(50)
                }

            }
            setREWARD(tmp);
        })
    }

    const [dataCEK, setDataCek] = useState({
        cekin: '',
        dayin: ''
    })
    const _getMember = () => {



        getData('user').then(uu => {
            setUser(uu);
            setCek(uu.member);
            axios.post(apiURL + 'user_data', {
                id: uu.id
            }).then(res => {
                console.log('user daat', {
                    cekin: res.data.cekin,
                    dayin: res.data.dayin,
                })
                setDataCek({
                    cekin: res.data.cekin,
                    dayin: res.data.dayin,
                })
                storeData('user', res.data)
                setUser(res.data);
            })
            axios.post(apiURL + 'member', {
                fid_user: uu.id
            }).then(res => {
                setData(res.data);
                setTmp(res.data)
            })
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Member Area" />

            {/* BATAS HEADER */}
            <View style={{
                marginVertical: 8,
                marginHorizontal: 16,
                borderRadius: 12,
                padding: 4,
                backgroundColor: Color.blueGray[50],
                flexDirection: 'row'
            }}>
                <TouchableWithoutFeedback onPress={() => setPilihmenu(0)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilihmenu == 0 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilihmenu == 0 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Reward Saya</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setPilihmenu(1)}>
                    <View style={{
                        flex: 1,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: pilihmenu == 1 ? Color.white[900] : Color.blueGray[50],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            ...fonts.subheadline3,
                            color: pilihmenu == 1 ? Color.blueGray[900] : Color.blueGray[500]
                        }}>Poin Saya</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>


            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}
            {!loading && pilihmenu == 0 &&

                <View style={{
                    flex: 1,
                    padding: 16,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setCek('Silver')
                        }} style={{
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: cek == 'Silver' ? Color.primary[900] : Color.blueGray[400],
                            backgroundColor: cek == 'Silver' ? Color.primary[50] : Color.white[900],
                            width: 100,
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.primary[900]
                            }}>Silver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setCek('Gold')
                        }} style={{
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: cek == 'Gold' ? Color.primary[900] : Color.blueGray[400],
                            backgroundColor: cek == 'Gold' ? Color.primary[50] : Color.white[900],
                            width: 100,
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.primary[900]
                            }}>Gold</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setCek('Platinum')
                        }} style={{
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: cek == 'Platinum' ? Color.primary[900] : Color.blueGray[400],
                            backgroundColor: cek == 'Platinum' ? Color.primary[50] : Color.white[900],
                            width: 100,
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.primary[900]
                            }}>Platinum</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        padding: 16,
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageBackground imageStyle={{ borderRadius: 20 }} style={{
                                height: 158,
                                width: '100%',
                                height: 146,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} source={cek == 'Silver' ? require('../../assets/bgsilver.png') : cek == 'Gold' ? require('../../assets/bggold.png') : require('../../assets/bgplatinum.png')}>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <MyIcon size={40} name='gift' color={cek == 'Silver' ? Color.primary[900] : Color.white[900]} />
                                    <View style={{
                                        marginLeft: 8,
                                    }}>

                                        <Text style={{
                                            ...fonts.caption1,
                                            color: cek == 'Silver' ? Color.primary[900] : Color.white[900]
                                        }}>{cek == user.member ? 'Level Saat Ini' : cek == 'Silver' && user.member == 'Gold' ? 'Level Terlewati' : cek == 'Platinum' && user.member == 'Gold' ? 'Level Terkunci' : cek == 'Gold' && user.member == 'Silver' ? 'Level Terkunci' : cek == 'Platinum' && user.member == 'Silver' ? 'Level Terkunci' : cek == 'Gold' && user.member == 'Platinum' ? 'Level Terkewati' : cek == 'Silver' && user.member == 'Platinum' ? 'Level Terkewati' : ''}</Text>
                                        <Text style={{
                                            ...fonts.headline4,
                                            color: cek == 'Silver' ? Color.primary[900] : Color.white[900]
                                        }}>{cek}</Text>
                                    </View>
                                </View>


                            </ImageBackground>

                            <Image source={user.member == 'Silver' ? require('../../assets/barsilver.png') : user.member == 'Gold' ? require('../../assets/bargold.png') : require('../../assets/barplatinum.png')} style={{
                                marginTop: 10,
                                marginBottom: 10,
                                width: '100%',
                                height: 30,
                                resizeMode: 'contain'
                            }} />


                            <Text style={{
                                ...fonts.headline5,
                            }}>Keuntungan Level {cek}</Text>


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
                                    html: data.filter(i => i.level == cek)[0].keuntungan
                                }}
                            />
                            <MyButton title="Tukarkan Reward" onPress={() => navigation.navigate('Tukar')} />
                            <MyGap jarak={30} />
                        </ScrollView>


                    </View>


                </View>
            }

            {!loading && pilihmenu == 1 &&

                <View style={{
                    padding: 16,
                }}>

                    <View style={{

                        // borderWidth: 1,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        marginBottom: 12,
                    }}>

                        <TouchableOpacity onPress={() => setModalVisiblePoin(true)}>
                            <View style={{
                                padding: 12,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/poin.png')} style={{
                                    width: 40,
                                    height: 40,
                                }} />
                                <Text style={{
                                    ...fonts.headline3,
                                    left: 5,
                                    flex: 1,
                                }}>{user.poin_saya} Poin</Text>
                                <MyIcon name='round-alt-arrow-right' size={30} color={Color.primary[900]} />
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            padding: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: Color.primary[900]
                        }}>
                            <MyIcon name='gift' size={30} color={Color.white[900]} />
                            <Text style={{
                                flex: 1,
                                left: 10,
                                ...fonts.body3,
                                color: Color.white[900]
                            }}>Kamu saat ini berada di level</Text>
                            <Text style={{
                                ...fonts.headline5,
                                color: Color.white[900]
                            }}>{user.member}</Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Cara')}>
                        <View style={{
                            borderRadius: 12,
                            padding: 12,
                            marginBottom: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: Color.primary[900]
                        }}>
                            <MyIcon name='question-square' size={30} color={Color.white[900]} />
                            <Text style={{
                                flex: 1,
                                left: 10,
                                ...fonts.body3,
                                color: Color.white[900]
                            }}>Bagaimana cara saya mendapatkan poin?</Text>
                            <MyIcon name='round-alt-arrow-right' size={30} color={Color.white[900]} />
                        </View>
                    </TouchableWithoutFeedback>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList data={dataVoucher} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (item.jumlah == 0) {
                                        toast.show("Maaf voucher sudah habis", {
                                            type: 'danger'
                                        });
                                    } else if (parseFloat(user.poin_saya) < parseFloat(pilih.poin)) {
                                        toast.show("Maaf poin kamu tidak cukup", {
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
                                            <Text style={{
                                                // flex: 1,
                                                ...fonts.body3,
                                                color: Color.blueGray[900]
                                            }}>Tersisa {item.jumlah} voucher</Text>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                        <MyGap jarak={windowHeight / 2} />
                    </ScrollView>
                </View>
            }

            {loading && <MyLoading />}

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
                            }}>Detail Voucher</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginVertical: 20,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.body3,
                                color: Color.blueGray[900],
                            }}>Poin Saya Saat ini</Text>

                            <View style={{
                                height: 36,
                                borderRadius: 100,
                                paddingHorizontal: 12,
                                backgroundColor: Color.secondary[900],
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/poin.png')} style={{
                                    width: 28,
                                    height: 28,
                                }} />
                                <Text style={{
                                    marginLeft: 5,
                                    marginRight: 8,
                                    ...fonts.headline5,
                                    color: Color.white[900],
                                }}>{user.poin_saya} poin </Text>
                                <MyIcon name='round-alt-arrow-right' size={15} color={Color.white[900]} />
                            </View>
                        </View>


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
                                    }}>Berlaku sampai {moment(pilih.expired).format('DD MMMM YYYY')}</Text>
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
                                    }}>{pilih.poin} poin</Text>
                                    <Text style={{
                                        // flex: 1,
                                        ...fonts.body3,
                                        color: Color.blueGray[900]
                                    }}>Tersisa {pilih.jumlah} voucher</Text>

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

                        <MyButton title="Klaim Voucher" onPress={() => {
                            console.log(pilih)

                            if (parseFloat(user.poin_saya) >= parseFloat(pilih.poin)) {
                                setModalVisible(false);


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
                                        _getMember();
                                        __getVouhcer();

                                    }
                                }).finally(() => {
                                    // setLoading(false);
                                })
                            } else {
                                setModalVisible(false);
                                toast.show("Maaf poin kamu tidak cukup", {
                                    type: 'danger'
                                });

                            }


                        }} />

                        <MyGap jarak={8} />

                        <MyButton onPress={() => setModalVisible(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



                    </View>
                </View>
            </Modal>

            <Modal style={{
                margin: 0,
            }} isVisible={isModalVisiblePoin}
                backdropOpacity={0.5}
                animationIn="fadeIn"
                animationOut="fadeOut"
                onRequestClose={() => {

                    setModalVisiblePoin(!isModalVisiblePoin);
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{
                        height: windowHeight / 1.5,
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
                            }}>Check-in Poin</Text>
                            <TouchableOpacity onPress={() => {
                                setModalVisiblePoin(false)

                            }}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginVertical: 20,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.body3,
                                color: Color.blueGray[900],
                            }}>Reward Poin Saya</Text>

                            <View style={{
                                height: 36,
                                borderRadius: 100,
                                paddingHorizontal: 12,
                                backgroundColor: Color.secondary[900],
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/poin.png')} style={{
                                    width: 28,
                                    height: 28,
                                }} />
                                <Text style={{
                                    marginLeft: 5,
                                    marginRight: 8,
                                    ...fonts.headline5,
                                    color: Color.white[900],
                                }}>{user.poin_saya} poin </Text>
                                <MyIcon name='round-alt-arrow-right' size={15} color={Color.white[900]} />
                            </View>
                        </View>

                        <FlatList
                            contentContainerStyle={styles.listWrapper}
                            style={{
                                marginBottom: 20,
                                height: 150,
                                flexGrow: 0
                            }} horizontal data={REWARD} renderItem={({ item, index }) => {
                                return (
                                    <View style={{

                                        width: 45,
                                        height: 75,
                                        marginRight: 6,
                                    }}>
                                        <View style={{
                                            borderWidth: 1.5,
                                            borderColor: Color.blueGray[50],
                                            height: 75,
                                            backgroundColor: Color.blueGray[50],
                                            width: 45,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 8
                                        }}>
                                            <Text style={{
                                                ...fonts.headline5,
                                                color: Color.blueGray[900],
                                            }}>+{item}</Text>

                                            {parseFloat(dataCEK.dayin) < (index + 1) &&
                                                <Image source={require('../../assets/poin.png')} style={{
                                                    width: 28,
                                                    height: 28,
                                                }} />}

                                            {dataCEK.cekin <= moment().format('YYYY-MM-DD') && parseFloat(dataCEK.dayin) >= (index + 1) &&
                                                <MyIcon name='check-circle' color={Color.secondary[900]} size={28} />}
                                        </View>
                                        <Text style={{
                                            textAlign: 'center',
                                            ...fonts.caption1,
                                            color: Color.blueGray[400],
                                        }}>Hari {index + 1}</Text>
                                    </View>
                                )
                            }} />
                        <Text style={{
                            ...fonts.body3,
                            color: Color.blueGray[900],
                            textAlign: 'center',
                        }}>Check in setiap hari dan dapatkan poin lebih di hari ke-7 untuk kamu tukarkan menjadi voucher treatment </Text>
                        <MyGap jarak={20} />
                        {dataCEK.cekin != moment().format('YYYY-MM-DD') &&
                            <MyButton title="Check-in Poin" onPress={() => {
                                setModalVisiblePoin(false);
                                axios.post(apiURL + 'daily_add', {
                                    fid_user: user.id,
                                    dayin: parseFloat(dataCEK.dayin) + 1,
                                    poin: (parseFloat(dataCEK.dayin) + 1) == 7 ? 50 : DAILY
                                }).then(res => {
                                    console.log(res.data);
                                    _getMember();
                                    toast.show('Berhasil check-in harian', {
                                        type: 'success'
                                    })
                                })
                            }} />
                        }
                        <MyGap jarak={8} />

                        <MyButton onPress={() => setModalVisiblePoin(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})