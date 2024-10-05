import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';

const SavingsAccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Savings Balance: $5000</Text>
      <Button
        title="Transfer Funds"
        onPress={() => console.log('Transfer pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SavingsAccountScreen;
