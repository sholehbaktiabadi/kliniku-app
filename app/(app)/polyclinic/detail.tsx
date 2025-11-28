import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { socketService } from '~/service/socket.io';
import { getPolyclinicDetails } from '~/api/polyclinic';
import { useSession } from '~/middleware/middleware';
import { polyEvent } from '~/const/event';
import { QueueBoard } from '~/components/queue-board';
import { QueueRegistered } from '~/components/queue-registered';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GradientBackground } from '~/components/background';

export default function QueueScreen() {
    const [eventData, setEventData] = useState<any>({ queues: [] });
    const { session } = useSession();
    const { id } = useLocalSearchParams<{ id: string }>();

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
                    <View className="flex flex-1 mt-10 p-6">
                        <View className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <View className="mb-3 flex flex-row flex-wrap items-center border-b border-blue-200 pb-3">
                                <Image className="h-16 w-16 rounded-full" source={{ uri: data?.clinic?.imageProfile }} />
                                <Text className="mr-2 ms-4 text-slate-600">{data.clinic?.name}</Text>
                                <MaterialIcons name="verified" size={24} color="blue" />
                            </View>
                            <View className="flex flex-row flex-wrap">
                                <View className="mr-2 h-24 basis-3/12 items-center justify-center overflow-hidden rounded-xl border border-blue-300">
                                    <View className="flex flex-row flex-wrap">
                                        <Text className="ms-1 mt-1 text-sm text-slate-500">Rating</Text>
                                    </View>
                                    <View className="flex flex-row flex-wrap items-center">
                                        <FontAwesome name="star" size={18} color="gold" />
                                        <Text className="ms-1 mt-1 text-slate-500">{data.clinic?.rating}</Text>
                                    </View>
                                </View>
                                <View className="h-24 flex-auto rounded-xl border border-blue-200 bg-blue-100 p-1">
                                    <View className="m-auto text-center">
                                        <Text className="text-xs text-slate-700">Alamat:</Text>
                                        <Text className="text-xs text-slate-700">{data.clinic?.adress}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="mx-5 mt-10">
                            <Text className="mt-3 text-sm text-slate-700">Live Antrian</Text>
                            <QueueBoard polyClinicId={id} queues={eventData.queues} />
                        </View>
                        <View className="my-5">
                            <QueueRegistered
                                totalRegistrant={data.totalRegistrant}
                                userCurrentQueue={data.userQueue?.sequence}
                            />
                        </View>
                    </View>
                </ScrollView>
            </GradientBackground>
        </>
    );
}