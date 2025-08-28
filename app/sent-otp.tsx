import { useState } from 'react';
import { View, Text, Alert, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { isValidNumber, PhoneInput } from 'react-native-phone-entry';
import { LinearGradient } from 'expo-linear-gradient';
import { env } from '~/config/env';

export default function SentOtp() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(env.baseUrl.klinikuApi + '/auth/sent-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });
            if (response.ok) {
                router.push({
                    pathname: '/login',
                    params: { phone },
                });
            } else {
                Alert.alert('Error', 'Bad Request');
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
            <LinearGradient
                colors={['#ff792cff', '#ffb387ff', '#ffcaabff', '#ffeee5ff']}
                locations={[0.1, 0.39, 0.4, 1]}
                className="absolute top-0 left-0 right-0 bottom-0"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
                    <Text className='text-white mb-1 text-3xl font-sans font-extrabold'>
                        Kirim Kode OTP
                    </Text>
                    <Text className='text-gray-100 mb-10 font-sans font-extrabold'>
                        Masukan nomor whatsapp
                    </Text>
                    <View className='mb-10 mx-auto'>
                        <Image
                            className="h-32 w-32 rounded-2xl"
                            source={require('../assets/app/kliniku.png')}
                        />
                    </View>
                    <PhoneInput
                        defaultValues={{
                            countryCode: 'ID',
                            callingCode: '+62',
                            phoneNumber: '+62',
                        }}
                        countryPickerProps={{ disableNativeModal: true, countryCode: "ID", onSelect: (() => console.log()) }}
                        isCallingCodeEditable={true}
                        hideDropdownIcon={true}
                        maskInputProps={{ mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }}
                        onChangeText={(text) => {
                            console.log(
                                'isValidNumber:',
                                isValidNumber(text, "ID"),
                            )
                            setPhone(text)
                        }
                        }
                    />
                    <View className="items-center">
                        <Pressable
                            className="mt-5 items-center rounded-xl border border-orange-400 bg-orange-400 shadow shadow-slate-700 w-[70%]"
                            onPress={async () => await handleLogin()}>
                            <Text className="m-3 font-bold text-white">{loading ? "Mengirim..." : "Kirim Otp"}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </>
    );
}