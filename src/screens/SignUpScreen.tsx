import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { saveUser, setLoggedIn } from '../utils/authStorage';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Colors } from '../theme/colors';

interface ScreenProps {
    navigation: StackNavigationProp<any, any>;
    route: RouteProp<any, any>;
}

export const SignUpScreen: React.FC<ScreenProps> = ({navigation}) => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please enter name, email and password');
      return;
    }
    await saveUser(email, password);
    await setLoggedIn(true);
    navigation.replace('Flights');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Full Name" onChangeText={setName} value={name} autoCapitalize="none" style={styles.inputStyle} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} autoCapitalize="none" style={styles.inputStyle} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.inputStyle} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:"center"
  },
  inputStyle:{
    width:'60%',
    borderWidth:1,
    padding:10,
    marginBottom:10,
    borderColor:Colors.border
  }
  
});
