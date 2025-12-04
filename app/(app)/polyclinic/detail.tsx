import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Linking, Alert, Pressable } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { socketService } from '~/service/socket.io';
import { getPolyclinicDetails } from '~/api/polyclinic';
import { useSession } from '~/middleware/middleware';
import { polyEvent } from '~/const/event';
import { QueueBoard } from '~/components/queue-board';
import { QueueRegistered } from '~/components/queue-registered';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GradientBackground } from '~/components/background';
import { Ionicons } from '@expo/vector-icons';

export default function QueueScreen() {
    const [eventData, setEventData] = useState<any>({ queues: [] });
    const { session } = useSession();
    const { id } = useLocalSearchParams<{ id: string }>();

    const openDirections = async (latitude: number, longitude: number, clinicName: string) => {
        try {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&dir_action=navigate`;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                const browserUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
                await Linking.openURL(browserUrl);
            }
        } catch (error) {
            Alert.alert('Error', 'Tidak dapat membuka aplikasi maps');
        }
    };

    const initialPolyclinic = {
        statusCode: 200,
        message: {}
    }
    const { data: { message: data } } = useQuery({
        queryKey: ['polyclinicDetail'],
        queryFn: () => getPolyclinicDetails({ session, id: +id }),
        initialData: initialPolyclinic,
    });

    useEffect(() => {
        setEventData(data)
        socketService.connect(() => {
            socketService.onEvent(polyEvent(id), (res) => {
                setEventData(res);
            });
        });
        return () => socketService.disconnect();
    }, [id, data]);

    return (
        <>
            <Stack.Screen options={{ title: 'QueueDetail', headerShown: false }} />
            <GradientBackground>
                <ScrollView>
                    <View className="flex flex-1 mt-10 p-3">


                        <View className="mt-10 rounded-xl border border-blue-50 bg-white shadow shadow-xs shadow-blue-200 p-4">
                            <View className="flex-row items-start mb-5">
                                {/* Left - Image & Rating */}
                                <View className="relative">
                                    <Image
                                        className="h-28 w-28 rounded-2xl border-4 border-white shadow-md"
                                        source={{ uri: data?.clinic?.imageProfile }}
                                    />
                                    <View className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                                        <MaterialIcons name="verified" size={16} color="white" />
                                    </View>
                                </View>

                                {/* Right - Content */}
                                <View className="flex-1 ms-2">
                                    <View className="flex-row items-center mb-2">
                                        <Text className="text-lg font-bold text-gray-800 mr-2">{data.clinic?.name}</Text>
                                    </View>

                                    <View className="flex-row space-x-2 mb-2">
                                        <View className="border border-blue-200 rounded-lg px-5 py-1">
                                            <Text className="text-blue-600">{data.poly?.name}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row space-x-2 mb-2">
                                        <View className="bg-green-100 rounded-lg px-3 py-1">
                                            <Text className="text-gray-600 text-sm font-light">{data.doctor}</Text>
                                        </View>
                                    </View>                                    
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="my-2 ms-1 text-xs text-slate-700">
                                    Alamat:
                                </Text>

                                {/* Tombol Get Directions */}
                                <Pressable
                                    onPress={() => openDirections(
                                        data.clinic?.lat,
                                        data.clinic?.lon,
                                        data.clinic?.name
                                    )}
                                    className="flex-row items-center bg-blue-500 rounded-lg px-8 py-2"
                                >
                                    <Ionicons name="navigate" size={16} color="white" />
                                    <Text className="text-white text-sm font-medium ml-2">Buka Maps</Text>
                                </Pressable>
                            </View>

                            <View className="flex-row items-start">
                                <Ionicons name="location" size={16} color="#b6b6b6ff" />
                                <Text className="text-gray-600 text-sm font-light ml-2 flex-1">{data.clinic?.adress}</Text>
                            </View>
                        </View>


                        <View className="mt-5 px-3">
                            <Text className="text-lg font-bold text-gray-600 mb-4">
                                Realtime Antrian
                            </Text>
                            <QueueBoard polyClinicId={id} queues={eventData.queues} />
                            <View className="my-5">
                                <QueueRegistered
                                    totalRegistrant={data.totalRegistrant}
                                    userCurrentQueue={data.userQueue?.sequence}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </GradientBackground>
        </>
    );
}