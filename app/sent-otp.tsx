import { useState } from 'react';
import { View, Text, Pressable, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { isValidNumber, PhoneInput } from 'react-native-phone-entry';
import { useMutation } from "@tanstack/react-query";
import { sentOtp } from '~/api/auth';
import { PrimaryButton } from '~/components/button';
import { AuthBackground } from '~/components/background';

export default function SentOtp() {
    const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    const [phone, setPhone] = useState('');
    const [activeButton, setActiveButton] = useState(false);
    const mutation = useMutation({
        mutationFn: sentOtp,
        onSuccess: (_data) => {
            router.push({
                pathname: '/login',
                params: { phone },
            });
        },
        onError: (_error) => {
            Alert.alert('Error', 'Login failed');
        },
    });

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
                            Login Melaui Whatsapp
                        </Text>
                        <Text className='text-white mb-10 font-light'>
                            Kode otp akan di kirim ke nomor anda
                        </Text>
                        <View className='mb-10 mx-auto'>
                            <Image
                                className="h-48 w-48 rounded-2xl"
                                source={require('../assets/app/kliniku.png')}
                            />
                        </View>
                        <PhoneInput
                            defaultValues={{
                                countryCode: 'ID',
                                callingCode: '62',
                                phoneNumber: '62'
                            }}
                            countryPickerProps={{ disableNativeModal: true, countryCode: "ID", onSelect: (() => console.log()) }}
                            isCallingCodeEditable={false}
                            hideDropdownIcon={true}
                            maskInputProps={{
                                mask: phoneMask,
                                editable: true
                            }}
                            onChangeText={(phone) => {
                                setActiveButton(isValidNumber(phone, "ID"))
                                setPhone(phone)
                            }
                            }
                        />
                        <View className="items-center">
                            <PrimaryButton
                                title={mutation.isPending ? "Mengirim..." : "Sent OTP code"}
                                onPress={() => mutation.mutate({ phone })}
                                disabled={!activeButton}
                                loading={mutation.isPending}
                                variant={"secondary"}
                            />
                        </View>
                    </View>
                    <View className="absolute bottom-0 w-full">
                        <Text className="text-center text-sm font-light text-white">
                            © 2025 by PT Lara Teknologi Studio - V 1.0.2
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </AuthBackground>
        </>
    );
}