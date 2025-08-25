import { useState } from 'react';
import { View, Text, Button, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { isValidNumber, MASK_PER_COUNTRY, PhoneInput } from 'react-native-phone-entry';

export default function SentOtp() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_KLINIKU_API_URL + '/auth/sent-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });
            console.log(response.json())
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
            <View
                style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
                    Sent Otp
                </Text>
                <View style={{ alignItems: "center" }}>
                    <LottieView
                        autoPlay
                        speed={2}
                        style={{
                            width: 400,
                            height: 200
                        }}
                        source={require("../assets/lottie/verification.json")}
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
                            isValidNumber(text, countryCode),
                        )
                        setPhone(text)
                    }
                    }
                />
                <Pressable
                    className="mt-5 items-center rounded-xl border border-indigo-400 bg-indigo-400 shadow shadow-slate-700"
                    onPress={async () => await handleLogin()}>
                    <Text className="m-3 font-bold text-white">{loading ? "Mengirim..." : "Kirim Otp"}</Text>
                </Pressable>

            </View>
        </>
    );
}