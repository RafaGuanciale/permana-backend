async function getWeather(req, res, next) {
  try {
    const { lat, lon } = req.query;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}`,
    );

    const data = await response.json();
    const temp = Math.round(data.current.temp_c);
    const isDay = Boolean(data.current.is_day);
    const period = isDay ? "Dia" : "Noite";
    let weatherDescription;
    if (temp < 15) {
      weatherDescription = isDay ? "frio" : "fria";
    } else if (temp < 24) {
      weatherDescription = isDay ? "ameno" : "amena";
    } else {
      weatherDescription = "quente";
    }

    const conditions = {
      Sunny: "Ensolarado",
      Clear: "Limpo",
      Cloudy: "Nublado",
      "Partly cloudy": "Parcialmente nublado",
      Mist: "Névoa",
      Rain: "Chuva",
      "Light rain": "Chuva leve",
    };
    const condition =
      conditions[data.current.condition.text] || data.current.condition.text;

    res.send({
      temp: `${temp}°`,
      condition,
      detail: `${period} ${weatherDescription}`,
      icon: `https:${data.current.condition.icon}`,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWeather };
