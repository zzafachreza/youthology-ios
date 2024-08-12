import { StatusBar, Image, ImageBackground, BackHandler, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { getData } from '../../utils/localStorage'
import { MyButton, MyGap } from '../../components'

export default function OnBoarding({ navigation, route }) {

    const DATA = [
        {
            image: require('../../assets/get1.png'),
            title: 'Para dokter berpengalaman di bidang kecatikan',
            caption: 'Berdedikasi lebih dari 13 tahun dengan pengalaman yang telah teruji.'
        },
        {
            image: require('../../assets/get2.png'),
            title: 'Teknologi terbaru dan terupdate pada klinik Youthology',
            caption: 'Mengikuti perkembangan terkini dalam industri kecantikan untuk menyajikan treatment terbaik.'
        },
        {
            image: require('../../assets/get3.png'),
            title: 'Tenaga medis dan pelayanan professional',
            caption: 'Tim tenaga medis profesional dalam bidangnya, tetapi jugaramah dalam memberikan pelayanan.'
        },
    ];

    const [nomor, setNomor] = useState(0);

    const backAction = () => {
        setNomor(nomor - 1)
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
            <View style={{
                flex: 1.5,
            }}>
                <Image source={DATA[nomor].image} style={{
                    width: '100%',
                    resizeMode: 'cover',
                }} />
            </View>
            <View style={{
                flex: 1,
                backgroundColor: Color.white[900],
                padding: 16,
            }}>
                <Text style={{
                    ...fonts.headline1,
                    textAlign: 'center',
                    color: Color.blueGray[900]
                }}>{DATA[nomor].title}</Text>
                <Text style={{
                    ...fonts.body3,
                    textAlign: 'center',
                    color: Color.blueGray[400]
                }}>{DATA[nomor].caption}</Text>
                <View style={{
                    marginVertical: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TouchableWithoutFeedback onPress={() => setNomor(0)}>
                            <View style={nomor == 0 ? styles.active : styles.disable} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setNomor(1)}>
                            <View style={nomor == 1 ? styles.active : styles.disable} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setNomor(2)}>
                            <View style={nomor == 2 ? styles.active : styles.disable} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <MyButton title="Selanjutnya" onPress={() => {
                    if (nomor == 2) {
                        navigation.replace('GetStarted')
                    } else {
                        setNomor(nomor + 1)
                    }
                }} />
                <MyGap jarak={16} />
                <MyButton onPress={() => navigation.replace('GetStarted')} title="Mulai Sekarang" textColor={Color.primary[900]} borderSize={2} backgroundColor={Color.white[900]} />

            </View>
        </SafeAreaView>
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