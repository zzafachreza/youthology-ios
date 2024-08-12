import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyLoading } from '../../components'
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import Spinner from 'react-native-spinkit';

export default function Lupa({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const sendServer = () => {
        if (email.length == 0) {
            toast.show('Email wajib diisi !', {
                type: 'danger'
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'lupa', {
                email: email
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.navigate('Otp', {
                        email: email
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
            <MyHeader title="Lupa Kata Sandi" />

            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 16,
            }}>
                <Text style={{
                    ...fonts.body3,
                    color: Color.blueGray[900]
                }}>Ketikkan email terdaftar Anda. Kami akan mengirimkan kode verifikasi untuk proses membuat kata sandi baru.</Text>
                <MyGap jarak={20} />
                <MyInput onChangeText={x => setEmail(x)} label="Email" iconname='letter' placeholder=
                    'Masukan email' />

                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Kirim" />}
                {loading && <MyLoading />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})