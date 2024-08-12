import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import KulitBerjerawat from '../../assets/KulitBerjerawat.svg'
import KulitKusam from '../../assets/KulitKusam.svg'
import KulitKendur from '../../assets/KulitKendur.svg'
import FlekHitam from '../../assets/FlekHitam.svg'
import { MyButton, MyGap, MyIcon, MyLoading } from '../../components';
import CountDown from 'react-native-countdown-component';
import MyCarouser from '../../components/MyCarouser';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Toast, useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import FastImage from 'react-native-fast-image'
export default function Home({ navigation, route }) {

  const toast = useToast();

  const [user, setUser] = useState({
    nama_lengkap: 'Nama Saya'
  });
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [dataJawdal, setDataJadwal] = useState([
    {
      nama_perawatan: 'Milky Laser Booster',
      tanggal_janji: '2024-06-23',
      jam_janji: '09:00',
    },
  ])

  const [dataArtikel, setDataArtikel] = useState([]);
  const [dataKulit, setDataKulit] = useState([]);
  const [loadingArtikel, setLoadingArtikel] = useState(false);


  const [REWARD, setREWARD] = useState([0, 0, 0, 0, 0, 0, 0]);
  const isFocus = useIsFocused();
  const [POPUP, setPOPUP] = useState('')


  useEffect(() => {
    __GetDataArtikel();
    __GetDataKulit();
    updateTOKEN();
    _getPopup();
    if (isFocus) {

      __cekOpenApps();
      getFalshSale();
      __getJadwal();
      __GetUserProfile();
      __getPoinHarian();
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      // alert(obj.notification.title)
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'YouthologyID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)
        vibrate: true,
      });

      getFalshSale();


    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      PushNotification.localNotification({
        /* Android Only Properties */
        priority: 'high',
        importance: Importance.HIGH,
        channelId: 'YouthologyIDBCK', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)

      });
    });


    return unsubscribe;


  }, [isFocus]);

  const __cekOpenApps = () => {
    getData('banner').then(res => {
      console.log(res);
      if (res.open) {
        setModalVisible2(true);
      }
    })
  }


  const [FLASHSALE, setFALSHSALE] = useState(0);
  const getFalshSale = () => {
    axios.post(apiURL + 'get_flash_sale').then(res => {
      console.log('FLASH SALE', res.data)
      setFALSHSALE(parseInt(res.data));
    })
  }

  const updateTOKEN = () => {
    getData('user').then(uu => {
      setUser(uu);

      axios.post(apiURL + 'get_token', {
        id: uu.id
      }).then(res => {

        getData('token').then(token => {
          // console.log(token.token);
          // alert(token.token);

          if (token.token !== res.data) {
            console.log('update TOKEN');
            axios.post(apiURL + 'update_token', {
              id: uu.id,
              token: token.token
            }).then(resp => {
              // console.log('token berhasil diperbaharui', resp.data)
            })
          } else {
            // console.log('token terbaru')
          }
        })

      })


    })
  }

  const __GetDataArtikel = () => {
    setLoadingArtikel(true)
    axios.post(apiURL + 'artikel', {
      limit: 3,
      tipe: 'Regular'
    }).then(res => {

      setDataArtikel(res.data);
      setLoadingArtikel(false)
    })
  }

  const _getPopup = () => {
    axios.post(apiURL + 'popup').then(res => {
      setPOPUP(res.data);
    })
  }


  const listData = dataKulit ?? [];
  const numColumns = Math.ceil(dataKulit.length / 2);


  const __GetDataKulit = () => {
    axios.post(apiURL + 'artikel', {
      tipe: 'Masalah Kulit'
    }).then(res => {

      setDataKulit(res.data);
    })
  }

  const __GetUserProfile = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'user_data', {
        id: uu.id
      }).then(res => {
        // if (res.data.cekin !== moment().format('YYYY-MM-DD')) {
        //   setModalVisible2(true)
        // }
        setDataCek({
          cekin: res.data.cekin,
          dayin: res.data.dayin,
        })
        storeData('user', res.data)
        setUser(res.data);
      })
    })
  }

  const [DAILY, SETDAILY] = useState(0)
  const [dataCEK, setDataCek] = useState({
    cekin: '',
    dayin: ''
  })
  const __getPoinHarian = () => {
    axios.post(apiURL + 'get_daily').then(res => {
      // console.log('jadwal', res.data);
      SETDAILY(res.data);
      let tmp = [];
      for (let index = 0; index < 7; index++) {

        if (index < (7 - 1)) {
          tmp.push(parseFloat(res.data))
        } else {
          tmp.push(50)
        }

      }
      setREWARD(tmp);
    })
  }


  const __getJadwal = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'appointment', {
        fid_user: uu.id
      }).then(res => {
        setDataJadwal(res.data);
      })
    })
  }




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: Color.white[900]
    }}>
      <StatusBar backgroundColor={Color.primary[900]} barStyle="light-content" />
      {/* header */}
      <View style={{
        height: 100,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: Color.primary[900]
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Image source={{
              uri: user.foto_user
            }} style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }} />
          </TouchableOpacity>
          <Text style={{
            left: 12,
            flex: 1,
            ...fonts.headline4,
            color: Color.white[900]
          }}>Halo, {user.nama_lengkap.split(" ")[0]}</Text>
        </View>
        <View style={{
          flex: 0.6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Member')}>
            <Image source={user.member == 'Silver' ? require('../../assets/badgeSilver.png') : user.member == 'Gold' ? require('../../assets/badgeGold.png') : require('../../assets/badgePlatinum.png')} style={{
              width: 100,
              resizeMode: 'contain',
              height: 35
            }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')} style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#FFFFFF1F',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <MyIcon name='bell' size={24} color={Color.white[900]} />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SEARCH */}

        <View style={{
          height: 160,
          padding: 16,
          backgroundColor: Color.primary[900]
        }}>
          <Text style={{
            ...fonts.body3,
            color: Color.white[900],
            marginBottom: 4
          }}>Selamat Datang di Youthology Aesthetic Clinic!</Text>
          <Text style={{
            ...fonts.headline2,
            color: Color.white[900],
            marginBottom: 12
          }}>Define Beauty, Define You</Text>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('JadwalSaya')
          }}>
            <View style={{
              height: 50,
              backgroundColor: Color.white[900],
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <MyIcon name='magnifer' size={20} color={Color.blueGray[300]} />
              <Text style={{
                ...fonts.body3,
                left: 8,
                color: Color.blueGray[400],
              }}>Cari treatment</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* FLASH SALE */}
        <View>
          <View style={{
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              ...fonts.headline4,
              color: Color.blueGray[900]
            }}>Promo Untukmu</Text>
            {FLASHSALE > 0 &&
              <View style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{

                  ...fonts.caption1,
                  color: Color.blueGray[900],
                  marginRight: 5,
                }}>Berakhir dalam</Text>
                <CountDown
                  id={'ID' + FLASHSALE}
                  until={FLASHSALE}
                  size={15}
                  showSeparator
                  separatorStyle={{
                    marginHorizontal: 4,
                    color: Color.blueGray[400],

                  }}
                  digitStyle={{ backgroundColor: Color.red[500] }}
                  digitTxtStyle={{ color: Color.white[900] }}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{ h: null, m: null, s: null }}
                />
              </View>
            }
          </View>
          <MyCarouser />
        </View>
        {/* MASALAH KULIT*/}
        <View style={{
          padding: 16,
        }}>
          <Text style={{
            ...fonts.headline4,
            color: Color.blueGray[900]
          }}>Pilihan Perawatan Sesuai Masalah Kulitmu</Text>

          <FlatList
            horizontal
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            data={dataKulit}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            key={i => i.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Treatment', item)} style={{

                  overflow: 'hidden'
                }}>

                  <ImageBackground source={require('../../assets/bgkulit.png')} style={{
                    flex: 1,
                    height: 55,
                    width: 175,
                    marginRight: 8,
                    borderRadius: 12,
                    marginTop: 12,
                    padding: 12,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>

                    <Text style={{
                      flex: 1,
                      ...fonts.headline5,
                      color: Color.white[900]
                    }}>{item.judul}</Text>
                    <Image source={{
                      uri: item.image
                    }} style={{
                      width: 30,
                      height: 30,
                    }} />
                  </ImageBackground>

                </TouchableOpacity>
              )
            }} />


        </View>

        {/* JADWAL PERAWATANMU*/}
        <View style={{
          padding: 16,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={{
              flex: 1,
              ...fonts.headline4,
              color: Color.blueGray[900]
            }}>Jadwal Perawatanmu</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JadwalSaya')}>
              <Text style={{
                ...fonts.subheadline3,
                color: Color.blueGray[900]
              }}>Lihat semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={dataJawdal} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('JadwalDetail', item)}>
                <View style={{
                  width: 288,
                  borderWidth: 1,
                  borderColor: Color.blueGray[400],
                  backgroundColor: index % 2 == 1 ? Color.secondary[900] : Color.primary[900],
                  borderRadius: 12,
                  marginRight: 8,
                  overflow: 'hidden',
                  position: 'relative'
                }}>


                  <View style={{
                    backgroundColor: Color.white[900],
                    borderRadius: 12,
                    width: 280,
                    left: 8,
                    padding: 12,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <View style={{
                        flex: 1,
                      }}>
                        <Text style={{
                          ...fonts.headline5,
                          color: Color.blueGray[900],
                        }}>{item.nama_dokter}</Text>
                        <Text style={{
                          ...fonts.body3,
                          color: Color.primary[900],
                        }}>{item.perawatan}</Text>
                      </View>
                      <MyIcon name='calendar-mark' size={24} color={index % 2 == 1 ? Color.secondary[900] : Color.primary[900]} />
                    </View>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <MyIcon name='calendar' size={16} color={Color.blueGray[400]} />
                      <Text style={{
                        ...fonts.caption1,
                        marginLeft: 4,
                        color: Color.blueGray[400]
                      }}>{moment(item.tanggal_janji).format('DD MMMM YYYY')}</Text>

                      <View style={{
                        marginHorizontal: 8,
                      }}>
                        <Icon type='ionicon' name='ellipse' size={6} color={Color.blueGray[400]} />
                      </View>
                      <MyIcon name='clock-square' size={16} color={Color.blueGray[400]} />
                      <Text style={{
                        ...fonts.caption1,
                        marginLeft: 4,
                        color: Color.blueGray[400]
                      }}>{item.jam_janji}</Text>

                    </View>

                  </View>


                </View>
              </TouchableWithoutFeedback>
            )
          }} />
        </View>

        {/* BLOG dan ARTIKEL*/}
        <View style={{
          padding: 16,
        }}>

          <Text style={{
            flex: 1,
            ...fonts.headline4,
            color: Color.blueGray[900],
            marginBottom: 12,
          }}>Artikel Terbaru</Text>


          <FlatList ListEmptyComponent={loadingArtikel && <MyLoading />} data={dataArtikel} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('BlogDetail', item)}>
                <View style={{
                  height: 180,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: Color.blueGray[100],
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 16,
                  marginRight: 8,
                  overflow: 'hidden',
                  flexDirection: 'row'
                }}>
                  <View style={{
                    flex: 1,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 4,
                      }}>{item.judul}</Text>
                      <Text style={{
                        ...fonts.caption1,
                        color: Color.blueGray.artikelDesc,
                      }}>{item.judul}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', item)} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 100,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.primary[900]

                    }}>
                      <Text style={{
                        ...fonts.caption1,
                        // flex: 1,
                        color: Color.primary[900],
                        marginRight: 10,
                      }}>Selengkapnya</Text>
                      <MyIcon size={16} color={Color.primary[900]} name='round-arrow-right-up' />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    // flex: 0.8
                  }}>


                    <FastImage
                      style={{
                        height: 160,
                        width: 120,
                        borderRadius: 8,
                      }}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.normal,
                      }}
                    // resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>

                </View>
              </TouchableWithoutFeedback>
            )
          }} />

          <TouchableWithoutFeedback onPress={() => navigation.navigate('Blog')}>
            <View style={{
              height: 42,
              borderWidth: 2,
              borderColor: Color.primary[900],
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  ...fonts.headline5,
                  color: Color.primary[900],
                  marginRight: 10,
                }}>Lihat Semua</Text>
                <MyIcon size={16} name='round-alt-arrow-right' color={Color.primary[900]} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

      </ScrollView >


      <Modal style={{
        margin: 16,
      }} isVisible={isModalVisible2}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onRequestClose={() => {

          setModalVisible2(!isModalVisible2);
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>

          <FastImage
            style={{
              height: windowHeight / 1.5,
              paddingTop: 24,
              paddingHorizontal: 18
            }}
            source={{
              uri: POPUP,
              priority: FastImage.priority.normal,
            }}

            resizeMode={FastImage.resizeMode.contain}

          />


          <TouchableOpacity onPress={() => {
            setModalVisible2(false);
            storeData('banner', {
              open: false
            })
            if (user.cekin !== moment().format('YYYY-MM-DD')) {
              setModalVisible(true)
            }

          }} style={{
            padding: 10,
          }}>
            <Icon type='ionicon' name='close-circle' size={60} color={Color.white[900]} />
          </TouchableOpacity>
        </View>
      </Modal>


      <Modal style={{
        margin: 0,
      }} isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onRequestClose={() => {

          setModalVisible(!isModalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{
            height: windowHeight / 1.5,
            backgroundColor: Color.white[900],
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            paddingTop: 24,
            paddingHorizontal: 18
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                flex: 1,
                ...fonts.headline4,
                color: Color.blueGray[900],
              }}>Check-in Poin</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false)

              }}>
                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
              </TouchableOpacity>

            </View>

            <View style={{
              marginVertical: 20,
              flexDirection: 'row'
            }}>
              <Text style={{
                flex: 1,
                ...fonts.body3,
                color: Color.blueGray[900],
              }}>Reward Poin Saya</Text>

              <View style={{
                height: 36,
                borderRadius: 100,
                paddingHorizontal: 12,
                backgroundColor: Color.secondary[900],
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/poin.png')} style={{
                  width: 28,
                  height: 28,
                }} />
                <Text style={{
                  marginLeft: 5,
                  marginRight: 8,
                  ...fonts.headline5,
                  color: Color.white[900],
                }}>{user.poin_saya} poin </Text>
                <MyIcon name='round-alt-arrow-right' size={15} color={Color.white[900]} />
              </View>
            </View>

            <FlatList
              contentContainerStyle={styles.listWrapper}
              style={{
                marginBottom: 20,
                height: 150,
                flexGrow: 0
              }} horizontal data={REWARD} renderItem={({ item, index }) => {
                return (
                  <View style={{

                    width: 45,
                    height: 75,
                    marginRight: 6,
                  }}>
                    <View style={{
                      borderWidth: 1.5,
                      borderColor: Color.blueGray[50],
                      height: 75,
                      backgroundColor: Color.blueGray[50],
                      width: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8
                    }}>
                      <Text style={{
                        ...fonts.headline5,
                        color: Color.blueGray[900],
                      }}>+{item}</Text>

                      {parseFloat(dataCEK.dayin) < (index + 1) &&
                        <Image source={require('../../assets/poin.png')} style={{
                          width: 28,
                          height: 28,
                        }} />}

                      {dataCEK.cekin <= moment().format('YYYY-MM-DD') && parseFloat(dataCEK.dayin) >= (index + 1) &&
                        <MyIcon name='check-circle' color={Color.secondary[900]} size={28} />}
                    </View>
                    <Text style={{
                      textAlign: 'center',
                      ...fonts.caption1,
                      color: Color.blueGray[400],
                    }}>Hari {index + 1}</Text>
                  </View>
                )
              }} />
            <Text style={{
              ...fonts.body3,
              color: Color.blueGray[900],
              textAlign: 'center',
            }}>Check in setiap hari dan dapatkan poin lebih di hari ke-7 untuk kamu tukarkan menjadi voucher treatment </Text>
            <MyGap jarak={20} />

            <MyButton title="Check-in Poin" onPress={() => {
              setModalVisible(false);
              axios.post(apiURL + 'daily_add', {
                fid_user: user.id,
                dayin: parseFloat(dataCEK.dayin) + 1,
                poin: (parseFloat(dataCEK.dayin) + 1) == 7 ? 50 : DAILY
              }).then(res => {
                console.log(res.data);
                toast.show('Berhasil check-in harian', {
                  type: 'success'
                })
              })
            }} />

            <MyGap jarak={8} />

            <MyButton onPress={() => setModalVisible(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



          </View>
        </View>
      </Modal>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
})