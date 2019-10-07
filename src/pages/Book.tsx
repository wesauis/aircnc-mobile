import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import api from '../services/api';

export default function Book({ navigation }) {
  const spot_id = navigation.getParam('id');
  const [date, setDate] = useState<string>('');

  async function handleSubmit() {
    if (!date) return;

    const user_id = await AsyncStorage.getItem('aircnc.user_id');

    await api.post(
      `/spots/${spot_id}/bookings`,
      { date },
      { headers: { user_id } },
    );

    Alert.alert('Solicitação de reserva enviada');
    navigation.navigate('List');
  }

  async function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>

      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data desejas reservar"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    height: Constants.statusBarHeight,
  },
  container: {
    margin: 30,
    marginTop: 50,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    height: 42,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
});
