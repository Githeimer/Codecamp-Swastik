import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Box, VStack, Input, Button, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const [source, setSource] = useState(null); // Source coordinates
  const [destination, setDestination] = useState(null); // Destination coordinates

  const handleMapPress = (event) => {
    if (!source) {
      setSource(event.nativeEvent.coordinate);
    } else if (!destination) {
      setDestination(event.nativeEvent.coordinate);
    }
  };

  const resetMarkers = () => {
    setSource(null);
    setDestination(null);
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} safeArea>
        <VStack space={4} px={4} py={2}>
          <Text fontSize="lg" bold>
            Set Your Source and Destination
          </Text>
          <Input
            placeholder="Source: Tap on the map"
            isReadOnly
            value={source ? `Lat: ${source.latitude}, Lng: ${source.longitude}` : ''}
          />
          <Input
            placeholder="Destination: Tap on the map"
            isReadOnly
            value={destination ? `Lat: ${destination.latitude}, Lng: ${destination.longitude}` : ''}
          />
          <Button colorScheme="primary" onPress={resetMarkers} isDisabled={!source && !destination}>
            Reset
          </Button>
        </VStack>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 27.7172, // Default location (Kathmandu, Nepal)
            longitude: 85.3240,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}>
          {source && (
            <Marker coordinate={source} title="Source" pinColor="green" />
          )}
          {destination && (
            <Marker coordinate={destination} title="Destination" pinColor="red" />
          )}
        </MapView>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
