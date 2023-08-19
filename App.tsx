/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, type PropsWithChildren, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Formulario from './components/Formulario';
import {searchType} from './types/busquedaType';
import {
  api,
  apiKey,
  appIdParam,
  getWeatherPath,
  unitsMeasurements,
  unitsParam,
  weatherParam,
} from './api/api';
import {weatherResponse} from './types/weatherResponse';
import Clima from './components/Clima';
import {backgroundColorApp} from './constants/backgroundColorApp';

const App = () => {
  const [search, setSearch] = useState<searchType>({city: '', country: ''});
  const [isSearching, setIsSearching] = useState(false);
  const [weatherResult, setWeatherResult] = useState<weatherResponse>();
  const [bgColor, setBgColor] = useState(backgroundColorApp.normal);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const getWeather = async () => {
    try {
      const response = await api.get(getWeatherPath, {
        params: {
          [weatherParam]: `${search.city},${search.country}`,
          [appIdParam]: apiKey,
          [unitsParam]: unitsMeasurements.metric,
        },
      });
      if (response.status === 200) {
        const result = response.data as weatherResponse;
        setWeatherResult(result);
        changeBgColorApp(result.main.temp);
      }
    } catch (ex) {
      displayAlert();
    } finally {
    }
  };

  const changeBgColorApp = (tempActual: number) => {
    if (tempActual < 10) {
      setBgColor(backgroundColorApp.frio);
    } else if (tempActual >= 10 && tempActual < 25) {
      setBgColor(backgroundColorApp.normal);
    } else {
      setBgColor(backgroundColorApp.caliente);
    }
  };

  const displayAlert = () => {
    Alert.alert('Warning', 'City or country  are not valid', [{text: 'ok'}]);
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  useEffect(() => {
    if (isSearching) {
      const requestWeather = async () => {
        await getWeather();
      };
      requestWeather();
      setIsSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima weatherResult={weatherResult} />
            <Formulario
              search={search}
              setSearch={setSearch}
              setIsSearching={setIsSearching}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
