import { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
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
            const response = await fetch('http://192.168.49.1:3009/auth/sent-otp', {
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
                    maskInputProps={{ mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }}
                    onChangeText={(text) => {
                        console.log(
                            'isValidNumber:',
                            isValidNumber(text, countryCode),
                        )
                        setPhone(text)
                    }
                    }
                    onChangeCountry={(country) => {
                        console.log('Country:', country);
                        console.log('countryCode:', countryCode);
                        setCountryCode(country.cca2);
                    }}
                />

                <Button
                    title={loading ? "Sending..." : "Send Otp"}
                    onPress={handleLogin}
                    disabled={loading}
                />

            </View>
        </>
    );
}