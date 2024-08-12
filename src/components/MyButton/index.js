import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DimensionThisPhone, fonts, windowWidth, } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils';

export default function MyButton({
  title,
  backgroundColor = Color.primary[900],
  onPress,
  radius = 8,
  borderSize = 0,
  textColor = Color.white[900],
  borderColor = Color.primary[900],
}) {
  return (
    <TouchableOpacity
      style={
        {
          height: 42,
          borderRadius: radius,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderWidth: borderSize,
          borderColor: borderColor,
        }
      }
      onPress={onPress}>
      <Text
        style={{
          ...fonts.headline5,
          color: textColor
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

