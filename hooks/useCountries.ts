import countries from "world-countries";
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
  latlng: country.latlng,
  region: country.region,
  subregion: country.subregion,
}));

export const useCountries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};
