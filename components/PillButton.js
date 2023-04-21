import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';

export default function PillButton({
  onPress,
  text,
  bgColor,
  textColor = 'black',
}) {
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: bgColor, fontFamily: 'Manrope_600SemiBold' }}
      onPress={onPress}
    >
      <Text style={{ ...styles.buttonText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    fontFamily: 'Manrope_600SemiBold',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
  },
});
