import * as React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { View, StyleSheet } from 'react-native';

import AccountList from '@/components/Home/AccountList';
import HomeBalance from '@/components/Home/HomeBalance';
import HomeHeader from '@/components/Home/HomeHeader';
import ErrorFallback from '@/components/Shared/ErrorFallback';
import FloatingActionButton from '@/components/Shared/FloatingActionButton';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HomeBalance />
      </ErrorBoundary>
      <View style={styles.divider} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AccountList />
      </ErrorBoundary>
      <FloatingActionButton handlePress={() => {}} icon="+" />
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
