import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import MyIcon from '../MyIcon';

export default function MyPicker({
  label,
  iconname = 'stethoscope',
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <Text
        style={{
          ...fonts.subheadline3,
          color: Color.blueGray[900],
          marginBottom: 8,
        }}>
        {label}
      </Text>

      <View style={{
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Color.blueGray[300]
      }}>
        <View style={{
          position: 'absolute',
          left: 12,
          top: 13,
        }}>
          <MyIcon name={iconname} color={Color.blueGray[300]} size={24} />
        </View>
        <Picker style={{ width: '90%', height: 50, left: 40, transform: [{ scale: 1 }] }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: 12, ...fonts.body3, color: Color.blueGray[900], }} value={item.value} label={item.label} />;
          })}
        </Picker>
        <View style={{
          position: 'absolute',
          right: 12,
          top: 13,
          backgroundColor: Color.white[900]
        }}>
          <MyIcon name='alt-arrow-down' color={Color.blueGray[300]} size={24} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
