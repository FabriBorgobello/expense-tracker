import * as React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Operation } from '../../types';
import { OPERATION_IMAGES } from '../../assets/images';
import OperationCardMenu from './OperationCardMenu';
import { useNavigation } from '@react-navigation/native';
import useEndpoint from '../../hooks/useEndpoint';

interface Props {
  operation: Operation;
  refetch: () => Promise<void>;
}

const OperationCard = ({ operation, refetch }: Props) => {
  const { execute } = useEndpoint(
    'delete',
    `/operations/${operation.id}`,
    undefined,
    false,
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigation = useNavigation<any>();
  const isExpense = operation.type === 'expense';

  const handleDelete = async () => {
    setIsMenuOpen(false);
    return Alert.alert(
      'Delete',
      'Are you sure you want to delete this operation?',
      [
        {
          text: 'Delete',
          onPress: async () => {
            await execute();
            refetch();
          },
        },
        { text: 'Cancel' },
      ],
    );
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    navigation.push('Operation form', {
      action: 'edit',
      operationId: operation.id,
    });
  };

  return (
    <TouchableNativeFeedback onLongPress={() => setIsMenuOpen(true)}>
      <View style={styles.container}>
        <OperationCardMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <View style={styles.leftContainer}>
          <Image
            style={styles.image}
            source={OPERATION_IMAGES[operation.type]}
          />
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
    </TouchableNativeFeedback>
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
    position: 'relative',
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
