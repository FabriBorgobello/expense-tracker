import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Operation } from '../../types';
import { OPERATION_IMAGES } from '../../assets/images';

interface Props {
  operation: Operation;
}

const OperationCard = ({ operation }: Props) => {
  const isExpense = operation.type === 'expense';

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={OPERATION_IMAGES[operation.type]} />
        <View style={styles.leftText}>
          <Text style={styles.date}>{operation.date}</Text>
          <Text style={styles.description}>{operation.description}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text
          style={[styles.amount, isExpense ? styles.expense : styles.income]}>
          {isExpense ? '-' : '+'} $ {operation.amount}
        </Text>
      </View>
    </View>
  );
};

export default OperationCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  image: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 24,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {},
  rightContainer: {},
  date: {
    color: '#828282',
    marginBottom: 4,
    fontWeight: '300',
    fontSize: 12,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  expense: {
    color: '#f44336',
  },
  income: {
    color: '#00a680',
  },
});
