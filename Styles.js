import { StyleSheet } from 'react-native';


export const ratingYellow = "#eedd00"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  formInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  actionButton: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width:150, 
    height: 50,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 2,
    alignSelf: 'center'
  },
  actionButtonActive: {
    backgroundColor: 'green'
  },
});