import axios from 'axios';

const URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c68304c21cfc592d77a90af18d16dd9b';

const getTheWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metrics',
      APPID: API_KEY,
    },
  });

  return data;
};

export default getTheWeather;
