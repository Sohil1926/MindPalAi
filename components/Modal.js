import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import PillButton from './PillButton';

export default function CustomModal({
  modalVisible,
  setModalVisible,
  text,
  showHideButton = true,
  offsetTop = 200,
}) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ ...styles.centeredView, marginTop: offsetTop }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          {/* <Pressable style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
          {showHideButton && (
            <PillButton
              text='Hide'
              onPress={() => setModalVisible(!modalVisible)}
              bgColor={'#F4B400'}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
