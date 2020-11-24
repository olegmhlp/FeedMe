import React, {useReducer} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  Alert,
} from 'react-native';

const REDUCER_CREATE = 'CREATE';

const formReducer = (state, action) => {
  if (action.type === REDUCER_CREATE) {
    const createdValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: createdValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const CreateCookbookForm = (props) => {
  const [formState, dispatchReducer] = useReducer(formReducer, {
    inputValues: {
      title: '',
      description: '',
      recipes: '',
    },
    inputValidities: {
      title: false,
      description: false,
      recipes: false,
    },
    formIsValid: false,
  });

  const titleChangeHandler = (inputId, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchReducer({
      type: REDUCER_CREATE,
      value: text,
      isValid: isValid,
      input: inputId,
    });
  };

  const submitHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Damn, you so stupid!', [{text: 'Okay('}]);
    } else props.onCancel()
  };

  return (
    <ScrollView
      style={{marginTop: 30, marginBottom: 20, backgroundColor: '#FCFAF8'}}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: 1,
        justifyContent: 'flex-start',
      }}>
      <Text style={styles.screenHeader}>Create a new cookbook</Text>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputHeader}>Cookbook title</Text>
        <TextInput
          placeholder="Title"
          value={formState.inputValues.title}
          style={styles.input}
          autoCapitalize="sentences"
          onChangeText={titleChangeHandler.bind(this, 'title')}
        />

        {/* <Text style={styles.inputHeader}>Cookbook picture</Text>
        <Button title="Upload" color="green" onPress={props.onCancel} /> */}

        <Text style={styles.inputHeader}>Description</Text>
        <TextInput
          placeholder="Description"
          value={formState.inputValues.description}
          style={styles.input}
          numberOfLines={5}
          autoCapitalize="sentences"
          onChangeText={titleChangeHandler.bind(this, 'description')}
        />

        <Text style={styles.inputHeader}>Recipes</Text>
        <TextInput
          placeholder="Recipes"
          style={styles.input}
          onChangeText={titleChangeHandler.bind(this, 'recipes')}
        />
        {/* {formState.inputValues.recipes &&
          formState.inputValues.recipes !== 0 &&
          formState.inputValues.recipes.map((i) => i.title)} */}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="CANCEL" color="red" onPress={props.onCancel} />
        </View>
        <View style={styles.button}>
          <Button title="ADD" onPress={submitHandler} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 40,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    width: '25%',
  },

  inputsContainer: {},

  input: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
  },

  inputHeader: {fontSize: 18, paddingBottom: 10},
});

export default CreateCookbookForm;
