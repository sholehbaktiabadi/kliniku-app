import { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { isValidNumber, PhoneInput } from 'react-native-phone-entry';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from "@tanstack/react-query";
import { sentOtp } from '~/api/auth';

export default function SentOtp() {
    const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
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
            <LinearGradient
                colors={['#2b7fff', '#63a2ffff', '#aaccffff', '#c4dcffff']}
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
                            className="h-48 w-48 rounded-2xl"
                            source={require('../assets/app/kliniku.png')}
                        />
                    </View>
                    <PhoneInput
                        defaultValues={{
                            countryCode: 'ID',
                            callingCode: '+62',
                            phoneNumber: '+62'
                        }}
                        countryPickerProps={{ disableNativeModal: true, countryCode: "ID", onSelect: (() => console.log()) }}
                        isCallingCodeEditable={false}
                        hideDropdownIcon={true}
                        maskInputProps={{
                            mask: phoneMask,
                            editable: true
                        }}
                        onChangeText={(phone) => {
                            console.log(
                                'isValidNumber:',
                                isValidNumber(phone, "ID"),
                                'phone',
                                console.log(phone)
                            )
                            setActiveButton(isValidNumber(phone, "ID"))
                            setPhone(phone)
                        }
                        }
                    />
                    <View className="items-center">
                        {activeButton && (
                            <Pressable
                                className="mt-5 items-center rounded-xl border border-blue-400 bg-blue-400 shadow shadow-slate-700 w-[70%]"
                                onPress={async () => mutation.mutate({ phone })}
                            >
                                <Text className="m-3 font-bold text-white">
                                    {mutation.isPending ? "Mengirim..." : "Kirim Otp"}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </View>
                <View className="absolute bottom-0 w-full py-4">
                    <Text className="text-center text-sm text-white">
                        © 2025 By PT Lara Teknologi Studio - V.1.1.2
                    </Text>
                </View>
            </LinearGradient>
        </>
    );
}