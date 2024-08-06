import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Table, Row } from 'react-native-table-component';
import { Teacher, Student } from './models/Person';
import data from './assets/data.json';

const App = () => {
  const [selectedType, setSelectedType] = useState('Teacher');
  const [inputFields, setInputFields] = useState({});
  const [entries, setEntries] = useState({
    teachers: data.teachers.map(
      (teacher) =>
        new Teacher(teacher.name, teacher.address, teacher.phone, teacher.department)
    ),
    students: data.students.map(
      (student) =>
        new Student(student.name, student.address, student.phone, student.program)
    ),
  });

  // State for selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Clear selectedItem when selectedType changes
  useEffect(() => {
    setSelectedItem(null);
  }, [selectedType]);

  const handleInputChange = (key, value) => {
    setInputFields({ ...inputFields, [key]: value });
  };

  const handleAddEntry = () => {
    if (selectedType === 'Teacher') {
      const newTeacher = new Teacher(
        inputFields.name,
        inputFields.address,
        inputFields.phone,
        inputFields.department
      );
      setEntries({ ...entries, teachers: [...entries.teachers, newTeacher] });
    } else {
      const newStudent = new Student(
        inputFields.name,
        inputFields.address,
        inputFields.phone,
        inputFields.program
      );
      setEntries({ ...entries, students: [...entries.students, newStudent] });
    }
    setInputFields({});
    setSelectedItem(null); // Clear selectedItem when a new entry is added
  };

  const renderForm = () => {
    const commonFields = (
      <>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={inputFields.name || ''}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={inputFields.address || ''}
          onChangeText={(value) => handleInputChange('address', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={inputFields.phone || ''}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
      </>
    );

    if (selectedType === 'Teacher') {
      return (
        <>
          {commonFields}
          <TextInput
            style={styles.input}
            placeholder="Department"
            value={inputFields.department || ''}
            onChangeText={(value) => handleInputChange('department', value)}
          />
        </>
      );
    } else {
      return (
        <>
          {commonFields}
          <TextInput
            style={styles.input}
            placeholder="Program"
            value={inputFields.program || ''}
            onChangeText={(value) => handleInputChange('program', value)}
          />
        </>
      );
    }
  };

  const renderTable = () => {
    if (!selectedItem) return null; // If no item is selected, return null

    const tableHead =
      selectedType === 'Teacher'
        ? ['Name', 'Address', 'Phone', 'Department']
        : ['Name', 'Address', 'Phone', 'Program'];

    const tableData =
      selectedType === 'Teacher'
        ? [[selectedItem.name, selectedItem.address, selectedItem.phone, selectedItem.department]]
        : [[selectedItem.name, selectedItem.address, selectedItem.phone, selectedItem.program]];

    return (
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableHeadText} />
        {tableData.map((rowData, index) => (
          <Row key={index} data={rowData} textStyle={styles.tableText} />
        ))}
      </Table>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Address Book</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setSelectedType(value)}
        items={[
          { label: 'Teacher', value: 'Teacher' },
          { label: 'Student', value: 'Student' },
        ]}
        value={selectedType}
      />
      {renderForm()}
      <Button title={`Add ${selectedType}`} onPress={handleAddEntry} />

      {/* Move the table above the list */}
      {renderTable()}

      <Text style={styles.subtitle}>{selectedType} List</Text>
      <FlatList
        data={selectedType === 'Teacher' ? entries.teachers : entries.students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setSelectedItem(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  listItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16, // Add margin to separate from the list
  },
  tableHead: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  tableHeadText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableText: {
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default App;
