import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState<string>('');
  const [techs, setTechs] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem('aircnc.user_id').then(user => {
      if (user) navigation.navigate('List');
    });
  }, []);

  async function handleSubmit() {
    const req = { email: email.trim() };

    if (!(req.email && techs.trim())) return;

    const res = await api.post('/sessions', req);
    const { _id } = res.data;

    if (!_id) return;

    await AsyncStorage.setItem('aircnc.user_id', _id);
    await AsyncStorage.setItem('aircnc.techs', techs.trim());

    navigation.navigate('List');
  }

  return (
    // On my android device the padding is needed
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        ></TextInput>

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de Interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        ></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
