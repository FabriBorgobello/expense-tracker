import HomeHeader from '../components/Home/HomeHeader';
import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import AccountList from '../components/Home/AccountList';
import HomeBalance from '../components/Home/HomeBalance';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <HomeBalance />
      <View style={styles.divider} />
      <AccountList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
  divider: {
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    marginBottom: 24,
  },
});

export default HomeScreen;
