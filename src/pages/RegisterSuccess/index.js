import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, fonts } from '../../utils';
import RegisterSuccessImage from '../../assets/RegisterSuccessImage.svg'
import { MyButton } from '../../components';
export default function RegisterSuccess({ navigation, route }) {
    const USER = route.params.user;

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.primary[900],
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
                    <RegisterSuccessImage width={160} height={160} />
                </View>

                <Text style={{
                    marginTop: 32,
                    ...fonts.headline2,
                    color: Color.white[900],
                    textAlign: 'center',
                }}>Pendaftaran Berhasil</Text>
                <Text style={{
                    marginTop: 4,
                    ...fonts.body3,
                    color: Color.white[900],
                    textAlign: 'center',
                    marginBottom: 32,
                }}>Kamu sudah dapat melakukan pemesanan layanan
                    dan menikmati promo serta layanan lainnya
                    di Youthology Aesthetic Clinic.</Text>

                <MyButton onPress={() => navigation.replace('MainApp')} title="Ke Halaman Utama" textColor={Color.primary[900]} backgroundColor={Color.white[900]} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})