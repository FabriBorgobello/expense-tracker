import * as React from 'react';

import { View, StyleSheet } from 'react-native';

import AccountList from '@/components/Home/AccountList';
import HomeBalance from '@/components/Home/HomeBalance';
import HomeHeader from '@/components/Home/HomeHeader';

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
