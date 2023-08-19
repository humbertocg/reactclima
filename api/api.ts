import axios from 'axios';

const baseURL = 'https://api.openweathermap.org';
export const imgURL = 'https://openweathermap.org/img/w/';
export const apiKey = '';
export enum unitsMeasurements {
  standard = 'standard',
  metric = 'metric',
  imperial = 'imperial',
}

export const api = axios.create({
  baseURL,
});

export const getWeatherPath = '/data/2.5/weather';
export const weatherParam = 'q';
export const appIdParam = 'appid';
export const unitsParam = 'units';
