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
        if (!res) {
          navigation.replace('OnBoarding');
        } else {
          navigation.replace('MainApp');
        }
      })
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <StatusBar hidden backgroundColor={Color.primary[900]} barStyle="light-content" />
      <ImageBackground source={require('../../assets/bg.png')} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('../../assets/logo.png')} style={{
          width: 200,
          height: 200,
        }} />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})