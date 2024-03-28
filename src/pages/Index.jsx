import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, Image, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const API_KEY = "YOUR_API_KEY";

const Index = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError("City not found. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Weather API
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
        <Button colorScheme="blue" leftIcon={<FaSearch />} onClick={fetchWeatherData} isLoading={loading}>
          Search
        </Button>
        {loading && <Spinner />}
        {error && <Text color="red.500">{error}</Text>}
        {weatherData && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              {weatherData.name}, {weatherData.sys.country}
            </Heading>
            <Image src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
            <Text fontSize="xl" mb={2}>
              {weatherData.weather[0].main}
            </Text>
            <Text fontSize="lg">Temperature: {weatherData.main.temp}°C</Text>
            <Text fontSize="lg">Feels like: {weatherData.main.feels_like}°C</Text>
            <Text fontSize="lg">Humidity: {weatherData.main.humidity}%</Text>
            <Text fontSize="lg">Wind Speed: {weatherData.wind.speed} m/s</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
