import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from '~/api/transaction';
import { useSession } from '~/middleware/middleware';
import { router } from 'expo-router';

export default function Book() {
  const { session } = useSession()
  const initialData = {
    message: [],
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactionHistory'],
    queryFn: () => getTransactionHistory({ session }),
    initialData: initialData,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WAITING':
        return { text: 'text-blue-800', border: 'border-blue-200' };
      case 'PAID':
        return { text: 'text-green-800', border: 'border-green-200' };
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-2">Memuat transaksi...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text className="text-red-600 text-lg font-medium mt-2">Error</Text>
        <Text className="text-gray-600 text-center mt-1">
          Gagal memuat data transaksi
        </Text>
      </View>
    );
  }

  if (!data?.message || data.message.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
        <Text className="text-gray-500 text-lg font-medium mt-2">
          Belum ada transaksi
        </Text>
        <Text className="text-gray-400 text-center mt-1">
          Transaksi Anda akan muncul di sini
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4 py-2 bg-gray-50">

      {data.message.map((transaction) => {
        const status = getStatusColor(transaction.payment_status);

        return (
          <Pressable
            key={transaction.id}
            className={`mb-4 rounded-2xl border-2 ${status.border} bg-white p-5 shadow-sm`}
            onPress={() =>
              router.push({
                pathname: '/(app)/polyclinic/detail',
                params: { id: transaction?.polyClinic?.id },
              })
            }
          >
            {/* Header - Invoice & Status */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">No. Invoice</Text>
                <Text className="text-sm font-bold text-gray-800">{transaction.invoice}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full border ${status.border}`}>
                <Text className={`text-xs font-semibold ${status.text}`}>
                  {transaction.payment_status}
                </Text>
              </View>
            </View>

            {/* User & Clinic Info */}
            <View className="mb-2">
              <View className="flex-row items-center mb-2">
                <Ionicons name="home" size={16} color="#63a2ffff" />
                <Text className="text-gray-700 font-medium ml-2">{transaction?.polyClinic?.clinic?.name}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="medical" size={16} color="#63a2ffff" />
                <Text className="text-gray-600 text-sm ml-2">
                  {transaction.polyClinic.poly.name} - {transaction?.polyClinic?.doctor}
                </Text>
              </View>
            </View>

            {/* Footer - Payment & Queue Info */}
            <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-sm ml-2 capitalize">
                  {transaction.paymentMethod}
                </Text>
              </View>

              <View className="bg-blue-50 rounded-lg px-3 py-1">
                <Text className="text-blue-700 text-sm font-bold">
                  Antrian #{transaction.sequence}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}