import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screenHeader: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 40,
  },

  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  appButtonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },

  cancelButton: {
    borderWidth: 1,
    width: 100,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: '#F7B602',
  },

  saveButton: {
    width: 200,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F7B602',
  },

  uploadButton: {
    borderWidth: 1,
    marginBottom: 32,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: '#F7B602',
  },

  inputsContainer: {},

  input: {
    width: '100%',
    marginBottom: 32,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
  },

  inputHeader: {fontSize: 18, paddingBottom: 10},
});
