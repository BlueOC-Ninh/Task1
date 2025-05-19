export const handleCallApi = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!res.ok) {
        throw new Error(`error: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  