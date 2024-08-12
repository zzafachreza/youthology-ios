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
export default function BlogDetail({ navigation, route }) {
    const item = route.params;
    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const [loading, setLoading] = useState(true);
    const [KETERANGAN, setKETERAGAN] = useState('');

    useEffect(() => {
        axios.post(apiURL + 'artikel_detail', {
            id: item.id
        }).then(res => {
            console.log(res.data);
            setKETERAGAN(res.data);
        })
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900],
        }}>
            <MyHeader onPress={() => {
                Share.open({
                    url: item.share,
                    title: item.title,

                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
            }} title="Baca Artikel" icon='share' />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>
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

                    {loading && <MyLoading />}
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
                            html: KETERANGAN
                        }}
                    />



                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})