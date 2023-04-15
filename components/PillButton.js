import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; // import TouchableOpacity

export default function PillButton({
  onPress,
  text,
  bgColor,
  textColor = 'black',
}) {
  return (
    <TouchableOpacity // replace Button with TouchableOpacity
      style={{ ...styles.button, backgroundColor: bgColor }} // add custom styles
      onPress={onPress}
    >
      <Text style={{ ...styles.buttonText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    color: 'white',
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: '#fff',
    color: 'black',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
