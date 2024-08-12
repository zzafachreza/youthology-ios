import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import FastImage from 'react-native-fast-image'
export default function Blog({ navigation, route }) {

    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        __GetData();
    }, []);

    const __GetData = () => {
        setLoading(true)
        axios.post(apiURL + 'artikel_all').then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Artikel Terbaru" color={Color.blueGray[900]} />
            <View style={{
                padding: 16,
            }}>
                <View style={{
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


                        // if (x.length > 0) {
                        //     let TMPSrc = dataJawdal.filter(i => i.perawatan.toLowerCase().indexOf(x.toLowerCase()) > -1);
                        //     if (TMPSrc.length > 0) {
                        //         setDataJadwal(TMPSrc);
                        //     }
                        // } else {
                        //     setDataJadwal(tmp);
                        // }

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

            {/* blog */}


            <ScrollView>
                <View style={{
                    padding: 16
                }}>
                    <Text style={{
                        ...fonts.headline3,
                        color: Color.blueGray[900],
                        marginBottom: 20,
                    }}>Trending</Text>

                    <FlatList ListEmptyComponent={loading && <MyLoading />} showsHorizontalScrollIndicator={false} data={data} horizontal renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('BlogDetail', item)}>
                                <View style={{
                                    width: 310,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: Color.blueGray[100],
                                    borderRadius: 16,
                                    padding: 12,
                                    marginRight: 12,
                                }}>


                                    <FastImage
                                        style={{
                                            borderRadius: 8,
                                            width: 280,
                                            height: 180,
                                            alignSelf: 'center',
                                        }}
                                        source={{
                                            uri: item.image,
                                            priority: FastImage.priority.normal,
                                        }}

                                    />

                                    <Text style={{
                                        marginTop: 12,
                                        ...fonts.headline4,
                                        color: Color.blueGray[900],
                                        maxWidth: '100%'
                                    }}>{item.judul}</Text>
                                    <Text style={{
                                        marginTop: 12,
                                        ...fonts.caption1,
                                        color: Color.blueGray.artikelDesc,
                                        maxWidth: '100%'
                                    }}>{item.judul}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }} />
                </View>

                <View style={{
                    padding: 16
                }}>
                    <Text style={{
                        ...fonts.headline3,
                        color: Color.blueGray[900],
                        marginBottom: 20,
                    }}>Lainnya</Text>

                    <FlatList ListEmptyComponent={loading && <MyLoading />} showsVerticalScrollIndicator={false} data={data} renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('BlogDetail', item)}>
                                <View style={{
                                    height: 180,
                                    width: '100%',
                                    borderWidth: 1,
                                    borderColor: Color.blueGray[100],
                                    marginBottom: 12,
                                    padding: 12,
                                    borderRadius: 16,
                                    marginRight: 8,
                                    overflow: 'hidden',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Text style={{
                                                ...fonts.headline4,
                                                color: Color.blueGray[900],
                                                marginBottom: 4,
                                            }}>{item.judul}</Text>
                                            <Text style={{
                                                ...fonts.caption1,
                                                color: Color.blueGray.artikelDesc,
                                            }}>{item.judul}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', item)} style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: 100,
                                            borderBottomWidth: 1,
                                            borderBottomColor: Color.primary[900]

                                        }}>
                                            <Text style={{
                                                ...fonts.caption1,
                                                // flex: 1,
                                                color: Color.primary[900],
                                                marginRight: 10,
                                            }}>Selengkapnya</Text>
                                            <MyIcon size={16} color={Color.primary[900]} name='round-arrow-right-up' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        // flex: 0.8
                                    }}>


                                        <FastImage
                                            style={{
                                                height: 160,
                                                width: 120,
                                                borderRadius: 8,
                                            }}
                                            source={{
                                                uri: item.image,
                                                priority: FastImage.priority.normal,
                                            }}

                                        />
                                    </View>

                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }} />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})