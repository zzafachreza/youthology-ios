import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, fonts } from '../../utils';
import RegisterSuccessImage from '../../assets/RegisterSuccessImage.svg'
import { MyButton, MyGap } from '../../components';

export default function MyEmpty() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Color.white[900],
                justifyContent: 'center',
                padding: 20,
            }}>
                <View style={{
                    justifyContent: 'center',
                    // alignItems: 'center'
                }}>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Image source={require('../../assets/kosong.png')} style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'contain'
                        }} />
                    </View>

                    <Text style={{
                        marginTop: 32,
                        ...fonts.headline2,
                        color: Color.blueGray[500],
                        textAlign: 'center',
                    }}>Belum ada data</Text>
                    <Text style={{
                        marginTop: 4,
                        ...fonts.body3,
                        color: Color.blueGray[400],
                        textAlign: 'center',
                        marginBottom: 32,
                    }}>Mungkin data belum tersedia</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({});
