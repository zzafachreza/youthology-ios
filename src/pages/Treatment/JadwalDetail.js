import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyLoading, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';

export default function JadwalDetail({ navigation, route }) {
    const toast = useToast();
    const [kirim, setKirim] = useState(route.params);
    const [comp, setComp] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data)
            setComp(res.data.data)
        })
    }, []);

    const sendBatal = () => {

        setLoading(true);
        console.log(kirim.id);
        axios.post(apiURL + 'appointment_cancel', {
            id: kirim.id
        }).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                setKirim({
                    ...kirim,
                    status_appointment: 'Dibatalkan'
                });
                setLoading(false);
            }
        })

    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Detail Jadwal" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <View style={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        backgroundColor: Color.blueGray[50],
                        padding: 12,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/treatment.png')} style={{
                                width: 40,
                                height: 40,
                            }} />
                            <View style={{
                                left: 8
                            }}>

                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.blueGray[400],
                                }}>{kirim.nama_dokter}</Text>
                                <Text style={{
                                    ...fonts.body3,
                                    color: Color.blueGray[900],
                                }}>{kirim.perawatan}</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginTop: 12,
                            ...fonts.body3,
                            color: Color.blueGray[400],
                        }}>ID:#{kirim.kode}</Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(comp.website)
                        }}>
                            <Image source={require('../../assets/lokasi.png')} style={{
                                width: '100%',
                                height: 120,
                                marginVertical: 12,
                                borderRadius: 12,
                            }} />
                        </TouchableOpacity>


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
                            color: Color.yellow[500]
                        }}>{kirim.status_appointment}</Text>
                    </View>

                    <View style={{
                        marginTop: 12,
                        borderRadius: 12,
                        backgroundColor: Color.blueGray[50],
                        padding: 12,
                    }}>
                        <Text style={{
                            ...fonts.headline4,
                            color: Color.blueGray[900],
                        }}>Data Pribadi</Text>
                        <Text style={{
                            ...fonts.caption1,
                            color: Color.blueGray[400],
                        }}>Berisi data pribadi sesuai identitasmu</Text>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Nama Lengkap</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{kirim.nama_lengkap}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Jenis Kelamin</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{kirim.jenis_kelamin}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Tanggal Lahir</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{moment(kirim.tanggal_lahir).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Nomor Telepon</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>+62{kirim.telepon}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>No. Rekam Medis</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{kirim.rekam_medis}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Alamat</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{kirim.alamat}</Text>
                            </View>

                        </View>


                    </View>

                    <View style={{
                        marginTop: 12,
                        borderRadius: 12,
                        backgroundColor: Color.blueGray[50],
                        padding: 12,
                    }}>
                        <Text style={{
                            ...fonts.headline4,
                            color: Color.blueGray[900],
                        }}>Tanggal dan Jam Perawatan</Text>
                        <Text style={{
                            ...fonts.caption1,
                            color: Color.blueGray[400],
                        }}>Berisi data tanggal dan jam melakukan perawatan</Text>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Tanggal Perawatan</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{moment(kirim.tanggal_janji).format('dddd, DD MMMM YYYY')}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    ...fonts.caption1,
                                    color: Color.blueGray[400],
                                }}>Jam Perawatan</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: Color.blueGray[900],
                                }}>{kirim.jam_janji}</Text>
                            </View>
                        </View>

                    </View>

                    <MyGap jarak={20} />

                    {kirim.status_appointment !== 'Dibatalkan' && <MyButton onPress={() => navigation.navigate('JadwalEdit', kirim)} title="Jadwalkan Ulang" />}

                    <MyGap jarak={20} />

                    {!loading && kirim.status_appointment !== 'Dibatalkan' &&

                        <MyButton title="Batalkan" backgroundColor={Color.red[500]} onPress={() => {
                            Alert.alert(MYAPP, 'Apakah kamu yakin akan batalkan jadwal ini ?', [
                                {
                                    text: 'TIDAK'
                                },
                                {
                                    text: 'Ya, Batalkan',
                                    onPress: sendBatal
                                }
                            ])
                        }} />
                    }

                    {loading && <MyLoading />}




                </View>



            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})