import { useState } from 'react';
import { View, Text, Alert, Pressable,Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { OtpInput } from "react-native-otp-entry";
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '~/middleware/middleware';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession()
  const { phone } = useLocalSearchParams();

  const handleLogin = async (otp: string) => {
    try {
      setLoading(true);
      signIn(phone as string, otp)
      router.replace("/(app)/(tabs)");
    } catch (error) {
      router.replace('/');
      console.log(error)
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = async () => {
    router.replace('/sent-otp');
  };

  return (
    <>
      <LinearGradient
        colors={['#ff792cff', '#ffb387ff', '#ffd5bcff', '#fff5f0ff']}
        locations={[0.1, 0.39, 0.4, 1]}
        className="absolute top-0 left-0 right-0 bottom-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
                    <Text className='text-white mb-1 text-3xl font-sans font-extrabold'>
                        Masukan Kode OTP
                    </Text>
                    <Text className='text-gray-100 mb-5 font-sans font-extrabold'>
                        Anda akan diarahkan ke halaman home
                    </Text>
          <View className='items-center mb-4'>
            <LottieView
              autoPlay
              speed={0.5}
              style={{
                width: 400,
                height: 200
              }}
              source={require("../assets/lottie/otp-verification.json")}
            />
            <View className='mx-[20%]'>
              <OtpInput
                numberOfDigits={4}
                disabled={loading}
                onTextChange={(text) => console.log(text)}
                focusColor="white"
                onFilled={(text) => {
                  handleLogin(text)
                }}
              />
            </View>
            <Text className="text-gray-600 mt-10 text-center text-sm font-extralight">
              Kode sudah dikirim ke whatsapp {phone}
            </Text>
            <Pressable
              // className="mt-8 items-center rounded-xl border border-indigo-400 bg-indigo-400 shadow shadow-slate-700 w-[80%]"
              onPress={async () => await handleChangeNumber()}
            >
              <Text className="text-blue-600 text-center text-sm font-extralight">
                Ubah Nomor telephone
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}