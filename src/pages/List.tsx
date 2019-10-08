import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import env from '../config/env';

export default function List({ navigation }) {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const savedTechs = await AsyncStorage.getItem('aircnc.techs');
      if (!savedTechs) return;
      setTechs(savedTechs.split(',').map(tech => tech.trim()));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user_id = await AsyncStorage.getItem('aircnc.user_id');
      if (!user_id) return;

      const socket = socketio(env.API_BASEURL, {
        query: { user_id },
      });

      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`,
        );
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
      <TouchableOpacity
        style={[styles.logo, { marginTop: 10 }]}
        onLongPress={async () => {
          await AsyncStorage.clear();
          navigation.navigate('Login');
        }}
      >
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
