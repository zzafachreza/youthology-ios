import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts } from '../../utils'
import { apiURL, api_token, getData, storeData } from '../../utils/localStorage'
import { MyButton, MyGap, MyIcon, MyLoading } from '../../components'
import { maskJs, maskCurrency } from 'mask-js';
import axios from 'axios'
import { useToast } from "react-native-toast-notifications";
export default function Login({ navigation, route }) {

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [kirim, setKirim] = useState({
    api_token: api_token,
    telepon: '',
    password: '',
  })
  const [buka, setBuka] = useState(false);

  const sendServer = () => {

    if (kirim.telepon.length == 0 || kirim.password.length == 0) {
      toast.show('Nomor telepon dan kata sandi masih kosong !', {
        type: 'warning',
        id: 'zvl'
      });
    } else {
      setLoading(true);
      console.log(kirim);
      axios.post(apiURL + 'login', kirim).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          toast.show(res.data.message, {
            type: 'success',
            id: 'zvl'
          });
          storeData('user', res.data.data)
          navigation.replace('MainApp');

        } else {
          toast.show(res.data.message, {
            type: 'error',
            id: 'zvl'
          });
        }
      }).finally(() => {
        setLoading(false);
      })
    }

  }

  return (
    <ImageBackground source={require('../../assets/bglogin.png')} style={{
      flex: 1,
    }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
      <View style={{
        flex: 0.4
      }}></View>
      <View style={{
        flex: 1,
        padding: 16,
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{
              ...fonts.headline2,
              color: Color.white[900],
              textAlign: 'center',
              marginBottom: 2
            }}>Mulai Konsultasikan Dengan Dokter Kami</Text>
            <Text style={{
              ...fonts.body3,
              color: Color.white[900],
              textAlign: 'center',
              marginTop: 2,
            }}>Silahkan masuk ke akun kamu</Text>
          </View>
          <MyGap jarak={24} />
          <View style={{
            padding: 20,
            backgroundColor: Color.white[900],
            borderRadius: 20,
          }}>
            <View>
              <Text style={{
                ...fonts.subheadline3,
                color: Color.blueGray[900],
                marginBottom: 8,
              }}>Nomor Telepon</Text>
              <View style={{
                flexDirection: 'row'
              }}>
                <View style={{
                  height: 50,
                  width: 70,
                  backgroundColor: Color.blueGray[100],
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopWidth: 1,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: Color.blueGray[300],
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{
                    ...fonts.body3,
                    color: Color.blueGray[400],
                    marginRight: 4,
                  }}>+62</Text>
                  <MyIcon name='alt-arrow-down' color={Color.blueGray[400]} size={24} />
                </View>
                <TextInput value={kirim.telepon} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    telepon: maskJs('999-9999-99999', x)
                  })
                }} keyboardType='phone-pad' placeholderTextColor={Color.blueGray[400]} placeholder='000-0000-0000' style={{
                  ...fonts.body3,
                  flex: 1,
                  height: 50,
                  paddingHorizontal: 12,
                  color: Color.blueGray[900],
                  borderWidth: 1,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  borderColor: Color.blueGray[300]
                }} />
              </View>
            </View>
            <MyGap jarak={20} />
            <View>
              <Text style={{
                ...fonts.subheadline3,
                color: Color.blueGray[900],
                marginBottom: 8,
              }}>Kata Sandi</Text>
              <View style={{
                height: 50,
              }}>

                <TextInput value={kirim.password} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    password: x
                  })
                }} autoCapitalize='none' secureTextEntry={buka ? false : true} placeholderTextColor={Color.blueGray[400]} placeholder='Ketikkan kata sandi' style={{
                  ...fonts.body3,
                  flex: 1,
                  height: 50,
                  paddingHorizontal: 12,
                  color: Color.blueGray[900],
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: Color.blueGray[300]
                }} />

                <View style={{
                  position: 'absolute',
                  right: 12,
                  top: 13,
                }}>
                  <TouchableOpacity onPress={() => setBuka(!buka)}>
                    {!buka && <MyIcon name='eye' color={Color.blueGray[400]} size={24} />}
                    {buka && <MyIcon name='eye-closed' color={Color.blueGray[400]} size={24} />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <MyGap jarak={20} />
            <TouchableOpacity onPress={() => navigation.navigate('Lupa')}>
              <Text style={{
                ...fonts.headline5,
                color: Color.primary[900],
                textAlign: 'right'
              }}>
                Lupa Kata Sandi?
              </Text>
            </TouchableOpacity>
            <MyGap jarak={24} />
            {!loading && <MyButton title="Masuk" onPress={sendServer} />}
            {loading && <MyLoading />}
            <MyGap jarak={12} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{
                ...fonts.body3,
                color: Color.blueGray[400],
                textAlign: 'center'
              }}>
                Belum memiliki akun? <Text style={{
                  ...fonts.headline5,
                  color: Color.primary[900],
                  textAlign: 'center'
                }}>
                  Daftar Sekarang!
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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