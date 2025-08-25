import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '~/context/auth-context';
import LottieView from 'lottie-react-native';
import { OtpInput } from "react-native-otp-entry";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()
  const { phone } = useLocalSearchParams();

  const handleLogin = async (otp: string) => {
    setLoading(true);
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_KLINIKU_API_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.message.token)
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
          Masukan Kode Otp
        </Text>
        <View style={{ alignItems: "center" }}>
          <LottieView
            autoPlay
            speed={0.5}
            style={{
              width: 400,
              height: 200
            }}
            source={require("../assets/lottie/otp-verification.json")}
          />
          <View className='mx-[10%]'>
          <OtpInput
            numberOfDigits={4}
            disabled={loading}
            onTextChange={(text) => console.log(text)}
            focusColor="gray"
            onFilled={(text) => {
              handleLogin(text)
            }}

          />
          </View>
        </View>
      </View>
    </>
  );
}