import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { PROVIDER_DEFAULT, Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../../assets/images/marker.png';

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails');
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_DEFAULT}
        initialRegion={{ 
          latitude: -25.3972744, 
          longitude: -51.4678696,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        <Marker 
          icon={mapMarker} 
          calloutAnchor={{ x: 2.8, y: 0.8 }}
          coordinate={{
            latitude: -25.3972744, 
            longitude: -51.4678696,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <MaterialIcons name="add" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutTitle: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    left: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15c3d6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
});


export default OrphanagesMap;