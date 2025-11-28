import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text, View, Animated, Easing, Alert, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { getBookOrderSummary } from '~/api/book';
import { UserSession } from '~/interface/user';
import { useSession } from '~/middleware/middleware';
import { Ionicons } from '@expo/vector-icons';
import { createPayment } from '~/api/transaction';
import { GradientBackground } from '~/components/background';

// Tipe untuk metode pembayaran
type PaymentMethod = 'gopay' | 'ovo' | 'dana' | 'linkaja';

export default function BookingSummary() {
    const { session } = useSession();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("gopay");
    const { polyClinicId, sequence } = useLocalSearchParams();
    const user = jwtDecode<UserSession>(session);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const initialSummary = {
        statusCode: 200,
        message: {}
    };

    // Query dengan payment method di queryKey
    const { data: { message: data }, refetch, isFetching } = useQuery({
        queryKey: ['bookingSummary', selectedPayment], // Tambahkan selectedPayment ke queryKey
        queryFn: () => getBookOrderSummary({ 
            session, 
            sequence: sequence as string, 
            polyClinicId: polyClinicId as string,
            paymentMethod: selectedPayment // Kirim payment method ke API
        }),
        initialData: initialSummary,
        enabled: true, // Selalu enabled, akan refetch ketika queryKey berubah
    });

    const mutation = useMutation({
        mutationFn: createPayment,
        onSuccess: (data) => {
            router.push({
                pathname: '/(app)/payment/webview',
                params: {
                    redirect_url: data.message
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

    // Effect untuk handle refetch ketika payment method berubah
    useEffect(() => {
        // Query akan otomatis refetch ketika selectedPayment berubah
        // karena queryKey berubah
    }, [selectedPayment]);

    // Handler untuk mengganti payment method
    const handlePaymentMethodChange = (method: PaymentMethod) => {
        setSelectedPayment(method);
        // Tidak perlu manual refetch di sini karena React Query akan otomatis
        // melakukan refetch ketika queryKey berubah
    };

    // Data metode pembayaran
    const paymentMethods = [

        {
            id: 'gopay' as PaymentMethod,
            name: 'GoPay',
            icon: 'phone-portrait-outline',
            description: 'Bayar dengan GoPay',
            color: '#00aa13'
        },
        {
            id: 'ovo' as PaymentMethod,
            name: 'OVO',
            icon: 'card-outline',
            description: 'Bayar dengan OVO',
            color: '#4f46e5'
        },
        {
            id: 'dana' as PaymentMethod,
            name: 'Dana',
            icon: 'qr-code-outline',
            description: 'Bayar dengan Dana',
            color: '#0488e0ff'
        },
        {
            id: 'linkaja' as PaymentMethod,
            name: 'Linkaja',
            icon: 'bag-outline',
            description: 'Bayar dengan Linkaja',
            color: '#b82e2eff'
        }
    ];

    const getPaymentIcon = (method: PaymentMethod) => {
        switch (method) {
            case 'gopay': return 'phone-portrait-outline';
            case 'ovo': return 'card-outline';
            case 'dana': return 'bag-outline';
            case 'linkaja': return 'qr-code-outline';
            default: return 'card-outline';
        }
    };

    return (
        <ScrollView>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <GradientBackground>
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

                    {/* Payment Method Selection */}
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
                        <Text className="text-lg font-semibold text-gray-800 mb-4">Metode Pembayaran</Text>

                        <View className="space-y-3">
                            {paymentMethods.map((method) => (
                                <Pressable
                                    key={method.id}
                                    className={`flex-row items-center p-4 rounded-xl border-2 ${
                                        selectedPayment === method.id 
                                            ? 'border-indigo-500 bg-indigo-50' 
                                            : 'border-gray-100 bg-white'
                                    } ${isFetching ? 'opacity-50' : ''}`}
                                    onPress={() => !isFetching && handlePaymentMethodChange(method.id)}
                                    disabled={isFetching}
                                    style={({ pressed }) => ({
                                        transform: [{ scale: pressed && !isFetching ? 0.98 : 1 }],
                                    })}
                                >
                                    <View 
                                        className="w-10 h-10 rounded-lg justify-center items-center mr-3"
                                        style={{ backgroundColor: method.color }}
                                    >
                                        <Ionicons name={method.icon as any} size={20} color="white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-800 font-medium">{method.name}</Text>
                                        <Text className="text-gray-500 text-xs">{method.description}</Text>
                                    </View>
                                    <View className={`w-5 h-5 rounded-full border-2 ${
                                        selectedPayment === method.id 
                                            ? 'bg-indigo-500 border-indigo-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedPayment === method.id && (
                                            <Ionicons name="checkmark" size={14} color="white" />
                                        )}
                                    </View>
                                </Pressable>
                            ))}
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
                                <Text className="text-gray-800">
                                    {isFetching ? 'Loading...' : data.bookingFee}
                                </Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-600">Biaya Platform</Text>
                                <Text className="text-gray-800">
                                    {isFetching ? 'Loading...' : data.platformFee}
                                </Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-600">PPN</Text>
                                <Text className="text-gray-800">
                                    {isFetching ? 'Loading...' : data.pg_fee}
                                </Text>
                            </View>                            
                        </View>

                        <View className="h-px bg-gray-200 my-2" />

                        <View className="flex-row justify-between">
                            <Text className="text-lg font-bold text-gray-800">Total</Text>
                            <Text className="text-lg font-bold text-indigo-600">
                                {isFetching ? 'Loading...' : `Rp ${data.grandTotal}`}
                            </Text>
                        </View>
                    </View>

                    {/* Payment Button */}
                    <Pressable
                        className={`mt-8 mb-20 rounded-2xl py-4 ${
                            isFetching ? 'bg-gray-400' : 'bg-indigo-600'
                        }`}
                        onPress={() => !isFetching && setModalVisible(true)}
                        disabled={isFetching}
                        style={({ pressed }) => ({
                            transform: [{ scale: pressed && !isFetching ? 0.95 : 1 }],
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: isFetching ? 0 : 0.3,
                            shadowRadius: 12,
                            elevation: isFetching ? 0 : 8,
                        })}>
                        <View className="flex-row justify-center items-center">
                            <Text className="text-white font-bold text-lg mr-2">
                                {isFetching ? 'Memperbarui...' : 'Lanjut Bayar'}
                            </Text>
                            {!isFetching && <Ionicons name="arrow-forward" size={20} color="white" />}
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
                            <Ionicons name={getPaymentIcon(selectedPayment) as any} size={48} color="#6366f1" />
                        </View>

                        <Text className="text-xl font-bold text-center text-gray-800 mb-3">
                            Konfirmasi Pembayaran
                        </Text>

                        <View className="bg-gray-50 rounded-xl p-4 mb-6">
                            <Text className="text-center text-gray-600 text-sm mb-2">
                                Metode Pembayaran
                            </Text>
                            <Text className="text-center text-gray-800 font-semibold text-lg">
                                {paymentMethods.find(m => m.id === selectedPayment)?.name}
                            </Text>
                        </View>

                        <Text className="text-center text-gray-600 text-base leading-6 mb-8">
                            Anda akan diarahkan ke halaman pembayaran {paymentMethods.find(m => m.id === selectedPayment)?.name} untuk menyelesaikan transaksi
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
                                onPress={async () => mutation.mutate({ 
                                    session, 
                                    sequence: sequence as string, 
                                    polyClinicId: polyClinicId as string,
                                    paymentMethod: selectedPayment,
                                    grandTotal: data.total
                                })}
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
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </GradientBackground>
        </Animated.View>
        </ScrollView>
    );
}