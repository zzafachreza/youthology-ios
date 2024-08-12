import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image'
import { useIsFocused } from '@react-navigation/native';
export default function Treatment({ navigation, route }) {
    const [item, setItem] = useState(route.params);
    console.log(item);
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const [loading, setLoading] = useState(false);
    const [KETERANGAN, setKETERAGAN] = useState('');
    const isFocus = useIsFocused();
    const [dataKulit, setDataKulit] = useState([
        {
            judul: '',
            tanggal: '',
            jam: '',
            image: '',

        }
    ]);

    useEffect(() => {
        if (isFocus) {
            __GetDataKulit();
            __getArtikelKulit();
        }
    }, [isFocus]);

    const __getArtikelKulit = (x = route.params.id) => {
        setLoading(true)
        axios.post(apiURL + 'artikel_masalah_detail', {
            id: x
        }).then(res => {

            setItem(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }

    const __GetDataKulit = () => {
        setLoading(true)
        axios.post(apiURL + 'artikel_perawatan', {
            tipe: 'Masalah Kulit'
        }).then(res => {

            let TMP = [...res.data];
            res.data.map((itm, idx) => {
                TMP[idx].cek = itm.judul == route.params.judul ? 1 : 0
            })
            setDataKulit(TMP.sort((a, b) => a.cek < b.cek));
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }).finally(() => {

        })
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <MyHeaderPoint title='Perawatan' />

            {!loading && <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
                    <FlatList showsHorizontalScrollIndicator={false} data={dataKulit} horizontal renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                let TMP = [...dataKulit];
                                TMP.map((i, idx) => {
                                    if (i.judul == item.judul) {
                                        TMP[idx].cek = 1;

                                    } else {
                                        TMP[idx].cek = 0;
                                    }
                                });
                                setDataKulit(TMP);

                                __getArtikelKulit(item.id);


                            }}>
                                <View style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 24,
                                    backgroundColor: item.cek > 0 ? Color.primary[50] : Color.white[900],
                                    borderColor: item.cek > 0 ? Color.primary[900] : Color.blueGray[100],
                                    borderRadius: 100,
                                    marginRight: 8,
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: item.cek > 0 ? Color.primary[900] : Color.blueGray[500],
                                    }}>{item.judul}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }} />

                    <Text style={{
                        ...fonts.headline2,
                        color: Color.blueGray[900]
                    }}>{item.judul}</Text>
                    <View style={{
                        marginVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <MyIcon name='user-circle' size={40} color={Color.blueGray[400]} />

                        <View style={{
                            marginLeft: 12
                        }}>
                            <Text style={{
                                ...fonts.subheadline3,
                                color: Color.blueGray[900],

                            }}>{item.author}</Text>
                            <Text style={{
                                ...fonts.caption1,
                                color: Color.blueGray[400]
                            }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}, {item.jam}</Text>


                        </View>

                    </View>



                    <FastImage
                        style={{
                            marginTop: 12,
                            height: 230,
                            width: '100%',
                            resizeMode: 'stretch',
                            marginBottom: 12,
                        }}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.normal,
                        }}

                    />


                    <RenderHtml
                        onHTMLLoaded={() => {
                            setLoading(false)
                        }}
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
                            html: item.keterangan
                        }}
                    />



                </View>
            </ScrollView>}

            {loading && <MyLoading />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})