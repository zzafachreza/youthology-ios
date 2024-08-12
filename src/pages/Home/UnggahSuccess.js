import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, fonts } from '../../utils';
import RegisterSuccessImage from '../../assets/RegisterSuccessImage.svg'
import { MyButton, MyGap } from '../../components';
export default function UnggahSuccess({ navigation, route }) {


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
                }}>Bukti Transfer Berhasil Diunggah</Text>
                <Text style={{
                    marginTop: 4,
                    ...fonts.body3,
                    color: Color.white[900],
                    textAlign: 'center',
                    marginBottom: 32,
                }}>Mohon Menunggu Approval Dari Admin Untuk Klaim Vouchernya.</Text>

                <MyButton onPress={() => navigation.replace('VoucherSaya')} title="Riwayat Klaim Voucher" textColor={Color.primary[900]} backgroundColor={Color.white[900]} />
                <MyGap jarak={12} />
                <MyButton onPress={() => navigation.replace('MainApp')} title="Ke Halaman Utama" borderColor={Color.white[900]} borderSize={2} textColor={Color.white[900]} backgroundColor={Color.primary[900]} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})