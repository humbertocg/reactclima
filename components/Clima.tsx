import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {weatherResponse} from '../types/weatherResponse';
import {imgURL} from '../api/api';

type climaType = {
  weatherResult?: weatherResponse;
};

const Clima = (props: climaType) => {
  const {name, main, weather} = props.weatherResult ?? {
    name: '',
    main: {
      temp: '',
      feels_like: '',
      temp_min: '',
      temp_max: '',
      pressure: '',
      humidity: '',
      sea_level: '',
      grnd_level: '',
    },
    weather: [],
  };
  if (name === '') {
    return null;
  }
  return (
    <View style={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {main.temp}
        <Text style={styles.temperatura}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{uri: `${imgURL}${weather[0].icon}.png`}}
        />
      </Text>

      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          Min: <Text style={styles.temperatura}>{main.temp_min}&#x2103;</Text>
        </Text>

        <Text style={styles.texto}>
          Max: <Text style={styles.temperatura}>{main.temp_max}&#x2103;</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  texto: {color: '#FFF', fontSize: 20, textAlign: 'center', marginRight: 20},
  actual: {fontSize: 80, marginRight: 0, fontWeight: 'bold'},
  temperatura: {fontSize: 24, fontWeight: 'bold'},
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Clima;
