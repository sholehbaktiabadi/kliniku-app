import { Stack } from 'expo-router';
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { PrimaryButton } from '~/components/button';
import { useSession } from '~/middleware/middleware';
import { useQuery } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import { authInfo } from '~/api/auth';

export default function Home() {
  const { session, signOut } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => authInfo({ session }),
  });

  const userData = data?.message || {};

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: 'User' }} />
        <View className="flex-1 items-center justify-center bg-gray-50">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="text-gray-600 mt-3">Memuat profil...</Text>
        </View>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Stack.Screen options={{ title: 'User' }} />
        <View className="flex-1 items-center justify-center bg-gray-50 px-6">
          <Ionicons name="alert-circle" size={48} color="#DC2626" />
          <Text className="text-red-600 text-lg font-medium mt-3">
            Gagal memuat data
          </Text>
          <Text className="text-gray-600 text-center mt-1">
            Silakan coba lagi nanti
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-blue-500 px-6 py-8">
          <View className="flex-row items-center">
            <View className="bg-white w-16 h-16 rounded-full items-center justify-center">
              <Text className="text-2xl font-bold text-blue-500">
                {userData.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-white">
                {userData.name || '-'}
              </Text>
              <Text className="text-blue-100 mt-1">
                {userData.email || '-'}
              </Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pribadi
            </Text>

            <View className="space-y-4">
              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <View className="flex-row items-center">
                  <Ionicons name="logo-whatsapp" size={20} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">Whatsapp</Text>
                </View>
                <Text className="text-gray-800 font-medium">
                  {userData.phone || '-'}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">Usia</Text>
                </View>
                <Text className="text-gray-800 font-medium">
                  {userData.age}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center">
                  <Ionicons name="card-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">KTP</Text>
                </View>
                <Text className="text-gray-800 font-medium">
                  {userData.ktp}
                </Text>
              </View>
            </View>
          </View>

          {/* User ID Section */}
          <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              ID Pengguna
            </Text>
            <Text className="text-gray-500 text-sm break-all">
              {userData.identifier || '-'}
            </Text>
          </View>

          {/* Logout Button */}
          <View className="px-4 items-center">
            <PrimaryButton
              title="Logout"
              onPress={async () => signOut()}
              disabled={false}
            />
          </View>
        </View>
      </View>
    </>
  );
}