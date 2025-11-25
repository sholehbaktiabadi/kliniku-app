import { useMutation, useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text, View, Animated, Easing, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { bookQueue, getBookOrderSummary } from '~/api/book';
import { UserSession } from '~/interface/user';
import { useSession } from '~/middleware/middleware';
import { Ionicons } from '@expo/vector-icons';

export default function BookingSummary() {
    const { session } = useSession();
    const [isModalVisible, setModalVisible] = useState(false);
    const { polyClinicId, sequence } = useLocalSearchParams();
    const user = jwtDecode<UserSession>(session);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const initialSummary = {
        statusCode: 200,
        message: {}
    };

    const { data: { message: data } } = useQuery({
        queryKey: ['bookingSummary'],
        queryFn: () => getBookOrderSummary({ session, sequence: sequence as string, polyClinicId: polyClinicId as string }),
        initialData: initialSummary,
    });

    const mutation = useMutation({
        mutationFn: bookQueue,
        onSuccess: (_data) => {
            router.push({
                pathname: '/(app)/polyclinic/detail',
                params: {
                    id: polyClinicId
                },
            });
        },
        onError: (_error) => {
            Alert.alert('Error', 'Booking failed');
        },
    });

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <LinearGradient
                colors={['#2b7fff', '#63a2ffff', '#f8f8f8ff', '#ffffffff']}
                locations={[0.05, 0.29, 0.3, 1]}
                style={{ minHeight: '100%' }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View className="flex-1 px-6 pt-16">
                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-white mb-2">Checkout Payment</Text>
                        <Text className="text-blue-100 text-base">Review your booking details</Text>
                    </View>

                    {/* Clinic Card */}
                    <View
                        className="bg-white rounded-2xl mb-6 overflow-hidden"
                        style={{
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 12,
                            elevation: 8,
                        }}
                    >
                        <View className="flex-row">
                            <View className="p-4 justify-center items-center bg-indigo-50">
                                <ImageBackground
                                    className="overflow-hidden rounded-xl"
                                    source={{ uri: 'https://dummyimage.com/600x400/4f4f4e/ffffff' }}
                                    resizeMode="cover">
                                    <View className="w-20 h-20 rounded-xl" />
                                </ImageBackground>
                            </View>
                            <View className="flex-1 p-4 justify-center">
                                <Text className="text-lg font-bold text-gray-800 mb-1">
                                    {data.clinic?.name}
                                </Text>
                                <View className="flex-row items-center">
                                    <Ionicons name="location-outline" size={14} color="#6b7280" />
                                    <Text className="text-xs text-gray-500 ml-1 flex-1">
                                        {data.clinic?.adress}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Booking Details */}
                    <View
                        className="bg-white rounded-2xl p-5 mb-6"
                        style={{
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text className="text-lg font-semibold text-gray-800 mb-4">Booking Details</Text>

                        <View className="space-y-4">
                            <View className="flex-row items-center justify-between py-2">
                                <View className="flex-row items-center">
                                    <Ionicons name="medical-outline" size={18} color="#6366f1" />
                                    <Text className="text-gray-600 ml-3">Poli</Text>
                                </View>
                                <Text className="text-gray-800 font-medium">{data.poly?.name}</Text>
                            </View>

                            <View className="h-px bg-gray-100" />

                            <View className="flex-row items-center justify-between py-2">
                                <View className="flex-row items-center">
                                    <Ionicons name="person-outline" size={18} color="#6366f1" />
                                    <Text className="text-gray-600 ml-3">Nama Anda</Text>
                                </View>
                                <Text className="text-gray-800 font-medium">{user.name}</Text>
                            </View>

                            <View className="h-px bg-gray-100" />

                            <View className="flex-row items-center justify-between py-2">
                                <View className="flex-row items-center">
                                    <Ionicons name="receipt-outline" size={18} color="#6366f1" />
                                    <Text className="text-gray-600 ml-3">Antrian</Text>
                                </View>
                                <View className="bg-indigo-100 px-3 py-1 rounded-full">
                                    <Text className="text-indigo-700 font-bold text-sm">#{sequence}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Price Breakdown */}
                    <View
                        className="bg-white rounded-2xl p-5"
                        style={{
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text className="text-lg font-semibold text-gray-800 mb-4">Price Breakdown</Text>

                        <View className="space-y-3 mb-4">
                            <View className="flex-row justify-between">
                                <Text className="text-gray-600">Biaya Pendaftaran</Text>
                                <Text className="text-gray-800">Rp {data.bookingFee}</Text>
                            </View>

                            <View className="flex-row justify-between">
                                <Text className="text-gray-600">Biaya Platform</Text>
                                <Text className="text-gray-800">Rp {data.platformFee}</Text>
                            </View>
                        </View>

                        <View className="h-px bg-gray-200 my-2" />

                        <View className="flex-row justify-between">
                            <Text className="text-lg font-bold text-gray-800">Total</Text>
                            <Text className="text-lg font-bold text-indigo-600">Rp {data.grandTotal}</Text>
                        </View>
                    </View>

                    {/* Payment Button */}
                    <Pressable
                        className="mt-8 bg-indigo-600 rounded-2xl py-4"
                        onPress={() => setModalVisible(true)}
                        style={({ pressed }) => ({
                            transform: [{ scale: pressed ? 0.95 : 1 }],
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 12,
                            elevation: 8,
                        })}>
                        <View className="flex-row justify-center items-center">
                            <Text className="text-white font-bold text-lg mr-2">Lanjut Bayar</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </View>
                    </Pressable>
                </View>

                {/* Confirmation Modal */}
                <Modal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    isVisible={isModalVisible}
                    onBackButtonPress={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    backdropOpacity={0.6}
                    style={{ margin: 0, justifyContent: 'flex-end' }}>
                    <View className="bg-white rounded-t-3xl pt-6 px-6 pb-8">
                        <View className="items-center mb-6">
                            <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
                            <Ionicons name="card-outline" size={48} color="#6366f1" />
                        </View>

                        <Text className="text-xl font-bold text-center text-gray-800 mb-3">
                            Konfirmasi Pembayaran
                        </Text>

                        <Text className="text-center text-gray-600 text-base leading-6 mb-8">
                            Anda akan diarahkan ke halaman pembayaran untuk menyelesaikan transaksi
                        </Text>

                        <View className="flex-row space-x-4">
                            <Pressable
                                className="flex-1 border-2 border-gray-300 rounded-2xl py-4"
                                onPress={() => setModalVisible(false)}
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? '#f9fafb' : 'white',
                                })}>
                                <Text className="text-center text-gray-600 font-semibold text-base">Batal</Text>
                            </Pressable>

                            <Pressable
                                className="flex-1 bg-indigo-600 rounded-2xl py-4"
                                onPress={async () => mutation.mutate({ session, sequence: sequence as string, polyClinicId: polyClinicId as string })}
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? '#4338ca' : '#4f46e5',
                                    shadowColor: '#6366f1',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: pressed ? 0.2 : 0.3,
                                    shadowRadius: 8,
                                    elevation: 6,
                                })}>
                                <Text className="text-center text-white font-semibold text-base">
                                    {mutation.isPending ? "Processing" : "Bayar Sekarang"}
                                </Text>
                                {/* <Text className="text-center text-white font-semibold text-base">Bayar Sekarang</Text> */}
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </LinearGradient>
        </Animated.View>
    );
}