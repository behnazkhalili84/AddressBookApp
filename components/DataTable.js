import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DataTable = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      {/* Render other item properties */}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.id || index.toString()} // Ensure unique key
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DataTable;
