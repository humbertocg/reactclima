import {Picker} from '@react-native-community/picker';
import React, {useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {countries} from '../constants/countries';
import {searchType} from '../types/busquedaType';

type formularioType = {
  search: searchType;
  setSearch: React.Dispatch<React.SetStateAction<searchType>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const Formulario = (props: formularioType) => {
  const [animateButton] = useState(new Animated.Value(1));

  const {city, country} = props.search;
  const setSearch = props.setSearch;
  const setIsSearching = props.setIsSearching;

  const onSearchWeather = () => {
    if (city.trim() === '' || country === '') {
      Alert.alert('Warning', 'City and country fields are needed', [
        {text: 'ok'},
      ]);
      return;
    }
    setIsSearching(true);
  };

  const startAnimation = () => {
    Animated.spring(animateButton, {
      toValue: 0.9,
      useNativeDriver: false,
    }).start();
  };

  const endAnimation = () => {
    Animated.spring(animateButton, {
      toValue: 1,
      friction: 1,
      tension: 30,
      useNativeDriver: false,
    }).start();
  };

  const styleAnimation = {
    transform: [{scale: animateButton}],
  };
  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={city}
            onChangeText={text => {
              setSearch({
                ...props.search,
                city: text,
              });
            }}
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>

        <View>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue, itemIndex) => {
              setSearch({...props.search, country: itemValue as string});
            }}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item
              key={`pais_${0}`}
              label={'-- Seleccione un pais --'}
              value={''}
            />
            {countries.map((item, index) => {
              return (
                <Picker.Item
                  key={`pais_${index + 1}`}
                  label={item.country}
                  value={item.code}
                />
              );
            })}
          </Picker>
        </View>

        <View>
          <TouchableWithoutFeedback
            onPress={() => onSearchWeather()}
            onPressIn={() => startAnimation()}
            onPressOut={() => endAnimation()}>
            <Animated.View style={[styles.btnBuscar, styleAnimation]}>
              <Text style={styles.btnTextBuscar}>Buscar clima</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {},
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  btnTextBuscar: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});

export default Formulario;
