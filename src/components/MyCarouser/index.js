import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fonts } from '../../utils/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { apiURL } from '../../utils/localStorage';
import FastImage from 'react-native-fast-image'

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      axios.get(apiURL + 'banner').then(res => {
        console.log('slider', res.data);
        setData(res.data);
      });
    }

  }, [isFocus]);

  const [data, setData] = useState([]);





  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FlashSale', {
      tipe: item.tipe,
      image: item.image
    })}>

      <FastImage
        style={{
          resizeMode: 'cover',
          height: 110,
          width: 340,
          borderRadius: 10,
        }}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

    </TouchableOpacity>
  );

  return (
    <View>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={0}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={340}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: colors.black,
    opacity: 1,
    height: 250,
    width: 300,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  cardImage: {
    height: 250,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
