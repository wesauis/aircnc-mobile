import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }) {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('aircnc.techs')
      .then(savedTechs => {
        const techsArr = savedTechs.split(',').map(tech => tech.trim());
        setTechs(techsArr);
      })
      .catch(error => console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
      <TouchableOpacity
        style={[styles.logo, { marginTop: 10 }]}
        onLongPress={() =>
          AsyncStorage.clear()
            .then(() => navigation.navigate('Login'))
            .catch(error => console.error)
        }
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
