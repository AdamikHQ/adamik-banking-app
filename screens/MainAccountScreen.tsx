import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Button from '../components/Button';

// Add expanded fake transaction data with dates
const transactions = [
  {
    id: '1',
    description: 'Grocery Store',
    amount: -50,
    date: new Date('2023-04-15'),
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 2000,
    date: new Date('2023-04-01'),
  },
  {
    id: '3',
    description: 'Restaurant Bill',
    amount: -75,
    date: new Date('2023-04-10'),
  },
  {
    id: '4',
    description: 'Online Shopping',
    amount: -120,
    date: new Date('2023-04-05'),
  },
  {
    id: '5',
    description: 'Utility Bill',
    amount: -100,
    date: new Date('2023-04-20'),
  },
  {
    id: '6',
    description: 'Freelance Payment',
    amount: 500,
    date: new Date('2023-04-18'),
  },
  {
    id: '7',
    description: 'Coffee Shop',
    amount: -5,
    date: new Date('2023-04-22'),
  },
  {
    id: '8',
    description: 'Gas Station',
    amount: -40,
    date: new Date('2023-04-12'),
  },
  {
    id: '9',
    description: 'Movie Tickets',
    amount: -30,
    date: new Date('2023-04-16'),
  },
  {
    id: '10',
    description: 'Book Purchase',
    amount: -25,
    date: new Date('2023-04-08'),
  },
];

const MainAccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: $1000</Text>
      <Text style={styles.transactionsTitle}>Recent Transactions:</Text>
      <ScrollView style={styles.transactionList}>
        {transactions.map(item => (
          <View key={item.id} style={styles.transactionItem}>
            <Text>{item.description}</Text>
            <Text style={{color: item.amount > 0 ? 'green' : 'red'}}>
              ${Math.abs(item.amount)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Deposit"
            onPress={() => console.log('Deposit pressed')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Withdraw"
            onPress={() => console.log('Withdraw pressed')}
          />
        </View>
      </View>
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
  transactionsTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default MainAccountScreen;
