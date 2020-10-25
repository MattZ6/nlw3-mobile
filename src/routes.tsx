import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/Header';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f8f8f8' } }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanageDetails" options={{ headerShown: true, header: () => <Header title="Orfanato" showCancel={false} /> }} component={OrphanageDetails} />
        <Screen name="SelectMapPosition" options={{ headerShown: true, header: () => <Header title="Selecione no mapa" /> }} component={SelectMapPosition} />
        <Screen name="OrphanageData" options={{ headerShown: true, header: () => <Header title="Informe os dados" /> }} component={OrphanageData} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;