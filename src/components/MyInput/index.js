import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import MyIcon from '../MyIcon';

export default function MyInput({
  onFocus,
  label,
  nolabel = false,
  borderColor,
  backgroundColor = colors.background_input,
  editable,
  icon = true,
  maxLength,
  iconname = 'user-rounded',
  onChangeText,
  value,
  borderWidth = 0,
  textColor = colors.primary,
  keyboardType,
  secureTextEntry,
  styleInput,
  onSubmitEditing,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  ref
}) {


  const [tutup, setTutup] = useState(true);

  const inputRef = useRef();
  return (
    <View>
      <Text style={{
        ...fonts.subheadline3,
        color: Color.blueGray[900],
        marginBottom: 8,
      }}>{label}</Text>
      <View style={{
        height: 50,
      }}>
        <View style={{
          position: 'absolute',
          left: 12,
          top: 13,
        }}>
          <MyIcon name={iconname} color={Color.blueGray[300]} size={24} />
        </View>
        <TextInput maxLength={maxLength} keyboardType={keyboardType} onChangeText={onChangeText} value={value} placeholderTextColor={Color.blueGray[400]} placeholder={placeholder} style={{
          ...fonts.body3,
          flex: 1,
          paddingLeft: 44,
          height: 50,
          paddingHorizontal: 12,
          color: Color.blueGray[900],
          borderWidth: 1,
          borderRadius: 8,
          borderColor: Color.blueGray[300]
        }} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
