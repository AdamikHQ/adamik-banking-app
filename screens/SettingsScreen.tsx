import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../components/Button';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Change Password"
        onPress={() => console.log('Change Password pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SettingsScreen;
