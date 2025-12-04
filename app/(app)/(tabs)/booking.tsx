import { View, Text, Pressable, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from '~/api/transaction';
import { useSession } from '~/middleware/middleware';
import { router } from 'expo-router';
import { useState, useCallback } from 'react';

export default function Book() {
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  
  const initialData = {
    message: [],
  };

  const { 
    data, 
    isLoading, 
    isError, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['transactionHistory'],
    queryFn: () => getTransactionHistory({ session }),
    initialData: initialData,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WAITING':
        return { text: 'Menunggu Pembayaran' , textColor: 'text-blue-800', border: 'border-blue-300 bg-blue-200' };
      case 'PAID':
        return { text: 'Sudah Dibayar' , textColor: 'text-green-900', border: 'border-green-300 bg-green-200' };
      default:
        return { text: '' , textColor: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Untuk infinite scroll (jika API mendukung pagination)
  const loadMore = useCallback(() => {
    // Implementasi load more jika API mendukung pagination
    // Biasanya dengan menambahkan page parameter di queryFn
  }, []);

  if (isLoading && !isRefetching) {
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
        <Pressable
          onPress={() => refetch()}
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Coba Lagi</Text>
        </Pressable>
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
        <Pressable
          onPress={() => refetch()}
          className="mt-4 flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Ionicons name="refresh" size={16} color="white" />
          <Text className="text-white ml-2">Refresh</Text>
        </Pressable>
      </View>
    );
  }

  // Render item untuk FlatList
  const renderItem = ({ item: transaction }: { item: any }) => {
    const status = getStatusColor(transaction.payment_status);

    return (
      <Pressable
        className={`mb-4 rounded-2xl border-2 border-blue-200 bg-white p-5 shadow-sm`}
        onPress={() =>
          router.push({
            pathname: '/(app)/polyclinic/detail',
            params: { id: transaction?.polyClinic?.id },
          })
        }
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Header - Invoice & Status */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-xs text-gray-500 mb-1">{transaction.dateLabel}</Text>
            <Text className="text-sm font-bold text-gray-800">{transaction.invoice}</Text>
          </View>
          <View className={`px-5 py-1 rounded-full border ${status.border}`}>
            <Text className={`text-xs font-semibold ${status.textColor}`}>
              {status.text}
            </Text>
          </View>
        </View>

        {/* User & Clinic Info */}
        <View className="mb-2">
          <View className="flex-row items-center mb-2">
            <Ionicons name="home" size={16} color="#3B82F6" />
            <Text className="text-gray-700 font-medium ml-2">{transaction?.polyClinic?.clinic?.name}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="medical" size={16} color="#3B82F6" />
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
  };

  // Footer untuk loading indicator saat refresh/load more
  const ListFooterComponent = () => {
    if (isRefetching && !refreshing) {
      return (
        <View className="py-4">
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={data.message}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName="px-4 py-4 bg-gray-50"
      showsVerticalScrollIndicator={false}
      // Pull to Refresh
      refreshControl={
        <RefreshControl
          refreshing={refreshing || isRefetching}
          onRefresh={onRefresh}
          colors={['#3B82F6']}
          tintColor="#3B82F6"
          title="Menyegarkan..."
          titleColor="#6B7280"
        />
      }
      // Infinite Scroll (jika ada)
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center py-10">
          <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg font-medium mt-2">
            Belum ada transaksi
          </Text>
        </View>
      }
    />
  );
}