import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getLoggedInUser, getUser, setLoggedIn } from '../utils/authStorage';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Colors } from '../theme/colors';

interface ScreenProps {
    navigation: StackNavigationProp<any, any>;
    route: RouteProp<any, any>;
}

export const LoginScreen: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getLoggedInUser().then((isLoggedIn)=>{
      if(isLoggedIn){
        navigation.replace('Flights');
      }  
    });
  },[])

  const handleLogin = async () => {
    const stored = await getUser();
    if (stored && stored.email === email && stored.password === password) {
      await setLoggedIn(true);
      navigation.replace('Flights');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} autoCapitalize="none" style={styles.inputStyle} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.inputStyle} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

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


