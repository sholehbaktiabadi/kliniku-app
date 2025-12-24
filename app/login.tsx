import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { OtpInput } from "react-native-otp-entry";
import { useSession } from '~/middleware/middleware';
import { useMutation } from '@tanstack/react-query';
import { login } from '~/api/auth';
import { Response } from '~/interface/response';
import { AxiosError } from 'axios';
import { AuthBackground } from '~/components/background';

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
      <AuthBackground>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
                        <Text className='text-white mb-1 text-2xl font-bold'>
                            Masukan Kode OTP
                        </Text>
                        <Text className='text-white font-light'>
                            Anda akan di arahkan ke ahalaman home
                        </Text>
            <View className='items-center'>
              <View className='mb-8'>
                <LottieView
                  autoPlay
                  speed={0.6}
                  style={{
                    width: 250,
                    height: 250
                  }}
                  source={require("../assets/lottie/otp-verification-v2.json")}
                />
              </View>
              <View className='mx-10'>
                <OtpInput
                  numberOfDigits={4}
                  disabled={mutation.isPending}
                  focusColor="#2b7fff"
                  textProps={{ style : { color: "white" } }}
                  onFilled={(text) => {
                    mutation.mutate({ phone: phone as string, otp: text })
                  }}
                />
              </View>
              <Text className="text-white mt-10 text-center text-sm font-light">
                Kode otp sudah dikirim ke whatsapp {phone}
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
      </AuthBackground>
    </>
  );
}