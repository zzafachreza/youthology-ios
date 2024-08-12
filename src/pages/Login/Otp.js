import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyLoading } from '../../components'
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import OTPTextInput from 'react-native-otp-textinput';

export default function Otp({ navigation, route }) {
    const [kirim, setKirim] = useState({
        email: route.params.email,
        otp: '',
    });
    const [loading, setLoading] = useState(false);
    const censorWord = (str) => {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-3);
    }

    const censorEmail = (email) => {
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + arr[1];
    }

    const toast = useToast();
    const sendServer = () => {
        if (kirim.otp.length == 0) {
            toast.show('Kode OTP wajib diisi !', {
                type: 'danger'
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'otp', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    2
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.navigate('Reset', {
                        email: kirim.email
                    })
                } else {
                    toast.show(res.data.message, {
                        type: 'danger'
                    })
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.white[900]
        }}>
            <StatusBar backgroundColor={Color.white[900]} barStyle="dark-content" />
            <MyHeader title="Verifikasi Kode" />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 16,
            }}>
                <Text style={{
                    ...fonts.body3,
                    color: Color.blueGray[900]
                }}>Masukkan kode verifikasi yang telah kami kirimkan ke email {censorEmail(kirim.email)}</Text>
                <MyGap jarak={20} />

                <OTPTextInput handleTextChange={x => {
                    setKirim({
                        ...kirim,
                        otp: x
                    })
                }} offTintColor={Color.blueGray[400]} autoFocus containerStyle={{
                    backgroundColor: Color.blueGray[50],
                    padding: 12,
                }}

                    tintColor={Color.primary[900]}
                    textInputStyle={{
                        backgroundColor: Color.white[900],
                        borderWidth: 1,
                        borderColor: Color.blueGray[300],
                        borderRadius: 12,
                    }} />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Kirim" />}
                {loading && <MyLoading />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})