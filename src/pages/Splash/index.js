import { StatusBar, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../utils'
import { getData, storeData } from '../../utils/localStorage'

export default function Splash({ navigation, route }) {



  useEffect(() => {
    storeData('banner', {
      open: true
    })
    setTimeout(() => {
      getData('user').then(res => {
        console.log('data user', res)
        if (!res) {
          navigation.replace('GetStarted');
        } else {
          navigation.replace('MainApp');
        }
      })
    }, 1200)
  }, [])

  return (
    <ImageBackground source={require('../../assets/bg.png')} style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <StatusBar barStyle="light-content" />
      <Image source={require('../../assets/logo.png')} style={{
        width: 200,
        height: 200,
      }} />
    </ImageBackground>

  )
}

const styles = StyleSheet.create({})