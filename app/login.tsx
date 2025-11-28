import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { OtpInput } from "react-native-otp-entry";
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '~/middleware/middleware';
import { useMutation } from '@tanstack/react-query';
import { login } from '~/api/auth';
import { Response } from '~/interface/response';
import { AxiosError } from 'axios';

export default function Login() {
  const { signIn } = useSession()
  const { phone } = useLocalSearchParams();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: Response) => {
      signIn(data.message.token, data.message.refreshToken)
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        console.log(error.response)
        const { message }: Response = error.response?.data
        console.log("Backend error:", error.response?.data);
        showToast(message);
      } else {
        showToast('an unexpected error occurred');
      }
    }
  })

  const showToast = (err: string) => {
    Toast.show({
      type: "error",
      text1: 'Error',
      text2: err,
    });
  };

  const handleChangeNumber = async () => {
    router.replace('/sent-otp');
  };

  return (
    <>
      <LinearGradient
        colors={['#2b7fff', '#63a2ffff', '#aaccffff', '#c4dcffff']}
        locations={[0.1, 0.39, 0.4, 1]}
        className="absolute top-0 left-0 right-0 bottom-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
            <Text className='text-center text-white mb-1 text-3xl font-sans font-extrabold'>
              Masukan Kode OTP
            </Text>
            <Text className='text-center text-gray-100 mb-5 font-sans font-extrabold'>
              Anda akan diarahkan ke halaman home
            </Text>
            <View className='items-center mb-4'>
              {/* <LottieView
              autoPlay
              speed={0.5}
              style={{
                width: 400,
                height: 200
              }}
              source={require("../assets/lottie/otp-verification.json")}
            /> */}
              <View className='mx-[20%]'>
                <OtpInput
                  numberOfDigits={4}
                  disabled={mutation.isPending}
                  focusColor="white"
                  onFilled={(text) => {
                    mutation.mutate({ phone: phone as string, otp: text })
                  }}
                />
              </View>
              <Text className="text-white mt-10 text-center text-sm font-extralight">
                Kode sudah dikirim ke whatsapp {phone}
              </Text>
              <Pressable
                onPress={async () => await handleChangeNumber()}
              >
                <Text className="text-blue-600 text-center text-sm font-extralight">
                  Ubah Nomor telephone
                </Text>
              </Pressable>
            </View>
          </View>
          <Toast />
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}