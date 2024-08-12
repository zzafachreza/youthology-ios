import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { getData } from '../../utils/localStorage'
import { MyButton, MyGap } from '../../components'

export default function GetStarted({ navigation, route }) {

    return (
        <ImageBackground source={require('../../assets/getstarted.png')} style={{
            flex: 1,
            height: '100%',
            width: '100%'
        }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
            <View style={{
                flex: 1.3
            }}></View>
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <Text style={{
                    ...fonts.headline0,
                    color: Color.white[900]
                }}>Youthology{'\n'}Aesthetic Clinic</Text>
                <Text style={{
                    ...fonts.body2,
                    color: Color.white[900]
                }}>
                    Define Beauty, Define You
                </Text>
                <MyGap jarak={32} />
                <MyButton title="Masuk ke Akun" onPress={() => navigation.navigate('Login')} />
                <MyGap jarak={12} />
                <MyButton onPress={() => navigation.navigate('Register')} borderColor={Color.white[900]} title="Daftarkan Akun" textColor={Color.white[900]} borderSize={2} backgroundColor={'transparent'} />

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    active: {
        marginHorizontal: 4,
        width: 32,
        height: 4,
        backgroundColor: Color.primary[900],
        borderRadius: 100
    },
    disable: {
        marginHorizontal: 4,
        width: 32,
        height: 4,
        backgroundColor: Color.blueGray[300],
        borderRadius: 100
    }
})