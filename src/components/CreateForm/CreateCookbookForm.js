import React, {useReducer} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createCookbook} from '../../store/actions/cookbooks';
import {styles} from './CreateCookbook.styles';

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

const CreateCookbookForm = ({onCancel}) => {
  const dispatch = useDispatch();

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
    } else {
      onCancel();
      dispatch(createCookbook(formState.inputValues));
    }
  };

  return (
    <ScrollView
      style={{paddingTop: 30, marginBottom: 20, backgroundColor: '#FCFAF8'}}
      contentContainerStyle={styles.contentContainer}>
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

        <TouchableOpacity style={styles.uploadButton} onPress={onCancel}>
          <Text style={styles.appButtonText}>Upload title picture</Text>
        </TouchableOpacity>

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
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.appButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={submitHandler}>
          <Text style={styles.appButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export {CreateCookbookForm};
