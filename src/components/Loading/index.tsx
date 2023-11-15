import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingComponent = props => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
  },
});

export default LoadingComponent;
