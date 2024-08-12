import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getData, storeData } from './utils/localStorage';
import { fonts } from './utils/fonts'
import MyIcon from './components/MyIcon'

export default function App() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        ...fonts.headline2
      }}>Test</Text>

      <MyIcon name='bell' size={24} />


      <TouchableOpacity onPress={() => {
        let kirim = {
          nama: 'reza',
          telepon: '088723'
        }
        console.log(kirim)
        storeData('user', kirim)
      }} style={{
        padding: 10,
        backgroundColor: 'yellow'
      }}>
        <Text>Simpan async</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        getData('user').then(uu => {
          console.log(uu)
        })
      }} style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: 'orange'
      }}>
        <Text>Lihat data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})