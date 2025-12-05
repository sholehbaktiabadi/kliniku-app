import { useState } from 'react';
import { View, Text, Pressable, Image, Alert, KeyboardAvoidingView, Platform, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import { isValidNumber, PhoneInput } from 'react-native-phone-entry';
import { useMutation } from "@tanstack/react-query";
import { sentOtp } from '~/api/auth';
import { AuthBackground } from '~/components/background';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PrimaryButton } from '~/components/button';

export default function SentOtp() {
    const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    const [phone, setPhone] = useState('');
    const [ktp, setKtp] = useState('');
    const [name, setName] = useState('');
    const [activeButton, setActiveButton] = useState(false);

    const mutation = useMutation({
        mutationFn: sentOtp,
        onSuccess: (_data) => {
            router.push({
                pathname: '/verify-user',
                params: { phone, ktp, name },
            });
        },
        onError: (_error) => {
            Alert.alert('Error', 'Login failed');
        },
    });

    const [date, setDate] = useState<Date>();
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    console.log(phone, ktp, name)

    return (
        <>
            <AuthBackground>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <View style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
                        <View className='my-5 mx-auto'>
                            <Image
                                className="h-32 w-32 rounded-2xl"
                                source={require('../assets/app/kliniku.png')}
                            />
                        </View>
                        <Text className='text-white text-2xl font-bold'>
                            Register Via Whatsapp
                        </Text>
                        <Text className='mb-5 text-white font-light'>
                            Masukan data valid agar memepermudah klinik
                        </Text>


                        <View className="my-2 flex-row items-center bg-white rounded-xl border border-blue-500 px-3">
                            <Ionicons name="person-outline" size={18} color="#63a2ffff" />
                            <TextInput
                                className="flex-1 py-3 ml-2 text-gray-500 placeholder:text-gray-300 focus:outline-none"
                                placeholder="Nama Lengkap"
                                onChangeText={(name) => {
                                    setName(name)
                                }}
                            />
                        </View>

                        <View className="my-2 flex-row items-center bg-white rounded-xl border border-blue-500 px-3">
                            <Ionicons name="card-outline" size={20} color="#63a2ffff" />
                            <TextInput
                                className="flex-1 py-3 ml-2 text-gray-500 placeholder:text-gray-300 focus:outline-none"
                                placeholder="no KTP"
                                onChangeText={(ktp) => {
                                    setKtp(ktp)
                                }}
                            />
                        </View>

                        <View className="mt-2 mb-4 flex-row items-center bg-white rounded-xl border border-blue-500 px-3">
                            <Ionicons name="calendar-outline" size={20} color="#63a2ffff" />
                            <TextInput
                                className="flex-1 py-3 ml-2 text-gray-500 placeholder:text-gray-300 focus:outline-none"
                                placeholder="Tanggal Lahir"
                                onFocus={showDatepicker}
                                value={date ? date.toLocaleDateString() : ''}
                            />
                        </View>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date}
                                mode={"date"}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}

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

                        <View className={`items-center ${activeButton ? "" : "hidden"}`}>
                            <PrimaryButton
                                title={mutation.isPending ? "Mengirim..." : "Daftar"}
                                onPress={() => mutation.mutate({ phone, opt: "REGISTER" })}
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