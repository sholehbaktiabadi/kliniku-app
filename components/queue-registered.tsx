import React from 'react';
import { View, Text } from 'react-native';

export const QueueRegistered = ({
  totalRegistrant,
  userCurrentQueue,
}: {
  totalRegistrant: number;
  userCurrentQueue?: number;
}) => {
  return (
    <>
      <View className="flex flex-row rounded-xl bg-blue-50">
        <View className="basis-1/2">
          <View className="flex flex-row">
            <View className="h-16 basis-1/2 items-center justify-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Text className="text-3xl text-slate-500">{totalRegistrant}</Text>
              </View>
            </View>
            <View className="h-18 basis-1/2 justify-center">
              <Text className="text-sm text-slate-500">Total Pasien</Text>
            </View>
          </View>
        </View>
        {userCurrentQueue ? (
          <View className="basis-1/2">
            <View className="flex flex-row">
              <View className="h-16 basis-1/2 items-center justify-center">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <Text className="text-3xl text-slate-500">{userCurrentQueue}</Text>
                </View>
              </View>
              <View className="h-18 basis-1/2 justify-center">
                <Text className="text-sm text-slate-500">Antrian Anda</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};