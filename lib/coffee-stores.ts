import { MapboxType } from '@/types';

const transformCoffeeData = (result: MapboxType) => {
  return {
    id: result.id,
    address: result.properties?.address || 'Toronto',
    name: result.text,
    imgUrl: '/static/hero-image.png',
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`,
    );
    const data = await response.json();

    return data.features.map((result: MapboxType) =>
      transformCoffeeData(result),
    );
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
  }
};

export const fetchCoffeeStore = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`,
    );
    const data = await response.json();

    const coffeeStore = data.features.map((result: MapboxType) =>
      transformCoffeeData(result),
    );

    return coffeeStore.length ? coffeeStore[0] : {};
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
  }
};
