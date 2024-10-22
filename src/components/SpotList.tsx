import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';
import env from '../config/env';

interface ISpot {
  _id: string;
  thumbnail_url: string;
  company: string;
  price: number;
}

function SpotList(props) {
  const [spots, setSpots] = useState<ISpot[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get('/spots', { params: { tech: props.tech } });
      setSpots(res.data);
    })();
  }, []);

  function handleNavigation(id) {
    props.navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{props.tech}</Text>
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: spot }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: `${env.API_BASEURL}/${spot.thumbnail_url}` }}
            />
            <Text style={styles.company}>{spot.company}</Text>
            <Text style={styles.price}>
              {spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigation(spot._id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotList);
