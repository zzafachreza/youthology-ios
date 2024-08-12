import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData } from '../../utils/localStorage';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon } from '../../components';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';

export default function Cara({ navigation, route }) {
    const [pilih, setPilih] = useState(0);

    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);

    useEffect(() => {
        if (isFocus) {
            __getKlaim();
        }
    }, [isFocus]);
    const __getKlaim = () => {

        axios.post(apiURL + 'cara').then(res => {
            console.log('jadwal', res.data);
            setData(res.data);

        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Detail" />


            {/* SUB HALAMAN TREATMENT */}
            {/* TREATMENT */}
            {!loading &&

                <View style={{
                    padding: 16
                }}>
                    <View style={{
                        marginVertical: 12,
                        backgroundColor: Color.blueGray[50],
                        padding: 16,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItem: 'center',
                    }}>
                        <MyIcon name='question-square' size={24} color={Color.blueGray[900]} />
                        <Text style={{
                            flex: 1,
                            left: 10,
                            ...fonts.headline4,
                            color: Color.blueGray[900],
                            marginBottom: 12,
                        }}>Bagaimana cara saya mendapatkan poin?</Text>
                    </View>
                    <FlatList data={data} renderItem={(({ item, index }) => {
                        return (

                            <View style={{
                                flexDirection: 'row',
                                // alignItems: 'center',
                                padding: 12,
                                marginVertical: 8,
                                borderRadius: 12,
                                borderColor: Color.blueGray[100]
                            }}>
                                <View style={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: Color.blueGray[100],
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 100,
                                }}>
                                    <Text style={{
                                        ...fonts.headline3,
                                    }}>{index + 1}</Text>
                                </View>
                                <Text style={{
                                    flex: 1,
                                    left: 10,
                                    ...fonts.body3
                                }}>{item.langkah}</Text>
                            </View>
                        )
                    })} />

                </View>


            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})