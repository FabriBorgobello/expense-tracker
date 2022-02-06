import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const OperationCardMenu = ({
  isOpen,
  onClose,
  handleEdit,
  handleDelete,
}: Props) => {
  return (
    <View style={styles.container}>
      <Menu opened={isOpen} onBackdropPress={onClose}>
        <MenuTrigger onPress={onClose} />
        <MenuOptions>
          <MenuOption onSelect={handleEdit}>
            <Text style={[styles.menuOption]}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={handleDelete}>
            <Text style={[styles.deleteText, styles.menuOption]}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default OperationCardMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  menuOption: { padding: 8 },
  deleteText: {
    color: 'red',
  },
});
