import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { PROVIDER_DEFAULT, Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../../assets/images/marker.png';
import api from '../../services/api';

interface IOrphanage {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback((id: number) => {
    navigation.navigate('OrphanageDetails', { id });
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  const orphanagesCountLabel = useMemo(() => {
    if(!orphanages.length){
      return 'Nenhum orfanato encontrado'
    }

    if(orphanages.length === 1) {
      return '1 orfanato encontrado';
    }

    return `${orphanages.length} orfanatos encontrados`;
  }, [orphanages]);

  useFocusEffect(() => {
    async function getOrphanages() {
      try {
       const { data } =  await api.get<IOrphanage[]>('v1/orphanages');

       setOrphanages(data);
      } catch (error) {
        alert('Falha ao carregar os dados');
      }
    }

    getOrphanages();
  });

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
        { orphanages.map(orphanage => (
          <Marker 
            key={orphanage.id}
            icon={mapMarker} 
            calloutAnchor={{ x: 2.8, y: 0.8 }}
            coordinate={{
              latitude: orphanage.latitude, 
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle} numberOfLines={1}>{orphanage.title}</Text>
              </View>
            </Callout>
          </Marker>
        )) }
        </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanagesCountLabel}</Text>

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
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
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
    borderRadius: 12,
    height: 48,
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
    borderRadius: 16,
    backgroundColor: '#15c3d6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
});


export default OrphanagesMap;