import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => navigation.goBack()} >
        <MaterialIcons name="arrow-back" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      { showCancel ? (
        <BorderlessButton enabled={showCancel} onPress={() => navigation.navigate('OrphanagesMap')} >
          <MaterialIcons name="close" size={24} color="#ff969d" />
        </BorderlessButton>
      ) : (
        <View /> 
      ) }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },
})

export default Header;