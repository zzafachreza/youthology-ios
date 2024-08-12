import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyCalendar, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInput, MyPicker } from '../../components';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';
import KonfirmasiOrder from '../../assets/KonfirmasiOrder.svg'

export default function CSAdminKonfirmasi({ navigation, route }) {

    const [kirim, setKirim] = useState(route.params);
    const toast = useToast();

    const [isModalVisible, setModalVisible] = useState(false);

    const sendServer = () => {
        console.log(kirim);


        axios.post(apiURL + 'appointement_add', kirim).then(res => {
            console.log(res.data);

            let WATemplate = `*JADWAL JANJI TEMU*%0A%0A`;
            WATemplate += `Dokter = ${kirim.dokter}%0A`;
            WATemplate += `Jenis Perawatan %0A`;
            kirim.perawatan.map((i, idx) => {
                WATemplate += `*- ${i.nama_perawatan}*%0A`;
            })


            WATemplate += `%0ANama Lengkap = ${kirim.nama_lengkap}%0A`;
            WATemplate += `Jenis Kelamin = ${kirim.jenis_kelamin}%0A`;
            WATemplate += `Tanggal Lahir = ${kirim.tanggal_lahir}%0A`;
            WATemplate += `Nomor Telepon = ${kirim.telepon}%0A`;
            WATemplate += `No. Rekam Medis = ${kirim.rekam_medis}%0A`;
            WATemplate += `Alamat = ${kirim.alamat}%0A%0A`;
            WATemplate += `Tanggal = ${kirim.tanggal_janji}%0A`;
            WATemplate += `Jam = ${kirim.jam_janji}%0A`;
            console.log(WATemplate);
            Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + WATemplate)

            setModalVisible(false);
            navigation.navigate('CSAdminSuccess', kirim)
        })


    }
    const [comp, setComp] = useState({});
    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data)
            setComp(res.data.data)
        })
    }, []);
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
                    <View style={{
                        borderRadius: 12,
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
                                }}>{kirim.dokter}</Text>

                                <FlatList data={kirim.perawatan} renderItem={({ item, index }) => {
                                    return (
                                        <View style={{
                                            marginVertical: 2,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Icon type='ionicon' name='bookmark' color={Color.blueGray[900]} size={14} />
                                            <Text style={{
                                                marginLeft: 5,
                                                ...fonts.headline5,
                                                color: Color.blueGray[900],
                                            }}>{item.nama_perawatan}</Text>
                                        </View>
                                    )
                                }} />

                            </View>
                        </View>
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <TouchableOpacity onPress={() => navigation.pop(2)} style={{
                            height: 42,
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: Color.primary[900],
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <MyIcon name='pen2' size={24} color={Color.primary[900]} />
                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.primary[900],
                                    marginLeft: 8,
                                }}>Ubah Perawatan</Text>
                            </View>
                        </TouchableOpacity>

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
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>
                        <TouchableOpacity onPress={() => navigation.pop(2)} style={{
                            height: 42,
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: Color.primary[900],
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <MyIcon name='pen2' size={24} color={Color.primary[900]} />
                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.primary[900],
                                    marginLeft: 8,
                                }}>Ubah Data</Text>
                            </View>
                        </TouchableOpacity>
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
                        <View style={{
                            marginVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[100]
                        }}></View>

                        <TouchableOpacity onPress={() => navigation.pop(1)} style={{
                            height: 40,
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: Color.primary[900],
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <MyIcon name='pen2' size={24} color={Color.primary[900]} />
                                <Text style={{
                                    ...fonts.headline5,
                                    color: Color.primary[900],
                                    marginLeft: 8,
                                }}>Ubah Data</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                        height: 42,
                        marginTop: 20,
                        borderRadius: 8,
                        backgroundColor: Color.primary[900],
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MyIcon name='whatsapp' size={24} color={Color.white[900]} />
                            <Text style={{
                                ...fonts.headline5,
                                color: Color.white[900],
                                marginLeft: 8,
                            }}>Pesan Sekarang</Text>
                        </View>
                    </TouchableOpacity>

                </View>



            </ScrollView>

            <Modal style={{
                margin: 0,
            }} isVisible={isModalVisible}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                transparent={true}
                onRequestClose={() => {

                    setModalVisible(!isModalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{
                        height: windowHeight / 1.6,
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
                            }}>Konfirmasi Tindakan</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            flex: 1,
                            // alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <KonfirmasiOrder />
                            </View>
                            <Text style={{
                                ...fonts.body3,
                                color: Color.blueGray[900],
                                textAlign: 'center',
                            }}>Pemesanan perawatan akan dilanjutkan melalui pesan Whatsapp dengan admin Youthology Clinic. Apakah kamu berkenan untuk melanjutkan?</Text>
                            <MyGap jarak={20} />

                            <MyButton onPress={sendServer} title="Ya, lanjutkan" />

                            <MyGap jarak={8} />

                            <MyButton onPress={
                                () => {
                                    setModalVisible(false);
                                    setTimeout(() => {
                                        toast.show('Pesanan Telah dibatalkan\nSilahkan pilih perawatan lain', {
                                            type: 'error'
                                        });
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'CSAdmin' }]
                                        })
                                    }, 300)
                                }
                            } backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tidak, Batalkan" />

                        </View>


                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnAvaliable: {
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textAvaliable: {
        ...fonts.subheadline3,
        color: Color.blueGray[900]
    },
    btnSelected: {
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.secondary[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.secondary[900]
    },
    textSelected: {
        ...fonts.subheadline3,
        color: Color.secondary[900]
    },

    btnDisable: {
        width: 160,
        marginHorizontal: 6,
        borderRadius: 100,
        height: 35,
        backgroundColor: Color.blueGray[50],
        borderWidth: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.blueGray[100]
    },
    textDisable: {
        ...fonts.subheadline3,
        color: Color.blueGray[400]
    }

})