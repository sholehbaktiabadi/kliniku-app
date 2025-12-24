import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SimpleGrid } from 'react-native-super-grid';
import { QueueColorList } from './queue-color';
import { Ionicons } from '@expo/vector-icons';


enum QueueStatus {
  EMPTY = 'EMPTY',
  BOOKED = 'BOOKED',
  SKIPPED = 'SKIPPED',
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

enum QueueColor {
  EMPTY = 'border border-slate-300',
  BOOKED = 'bg-blue-100',
  SKIPPED = 'bg-blue-100 border-2 border-blue-400',
  ON_GOING = 'bg-emerald-500 shadow shadow-xl shadow-emerald-900 border border-white',
  COMPLETED = 'bg-cyan-600',
}
const colorDecission = (status: string) => {
  switch (status) {
    case QueueStatus.EMPTY:
      return QueueColor.EMPTY;
    case QueueStatus.BOOKED:
      return QueueColor.BOOKED;
    case QueueStatus.SKIPPED:
      return QueueColor.SKIPPED;
    case QueueStatus.ON_GOING:
      return QueueColor.ON_GOING;
    case QueueStatus.COMPLETED:
      return QueueColor.COMPLETED;
    default:
      return QueueColor.SKIPPED;
  }
};

const textDecission = (status: string, sequence: string) => {
  switch (status) {
    case QueueStatus.ON_GOING:
      return 'ongoing';
    case QueueStatus.EMPTY:
    case QueueStatus.BOOKED:
      return sequence;
    case QueueStatus.SKIPPED:
      return 'skip';
    case QueueStatus.COMPLETED:
      return 'done';
    default:
      return sequence;
  }
};

const textColorDecission = (status: string) => {
  switch (status) {
    case QueueStatus.EMPTY:
      return 'text-blue-100';
    case QueueStatus.ON_GOING:
      return 'text-white';
    case QueueStatus.BOOKED:
    case QueueStatus.SKIPPED:
      return 'text-blue-400';
    case QueueStatus.COMPLETED:
      return 'text-white';
  }
};

interface QueueData {
  id: string;
  sequence: string;
  status: string;
}

export const QueueBoard = ({
  polyClinicId,
  queues,
}: {
  polyClinicId: string;
  queues: QueueData[];
}) => {
  const [sequence, setSequence] = useState('0');
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className='bg-white rounded-xl shadow shadow-md'>
        <SimpleGrid
          data={queues}
          listKey=""
          spacing={15}
          itemDimension={60}
          renderItem={({ item }) => (
            <View className="items-center justify-center">
              <Pressable
                onPress={() => {
                  setSequence(item.sequence);
                  setModalVisible(true);
                }}
                disabled={item.status != 'EMPTY'}
                className={`h-14 w-20 items-center justify-center rounded-lg ${colorDecission(item.status)}`}>
                <Text className={textColorDecission(item.status)}>
                  {textDecission(item.status, item.sequence)}
                </Text>
              </Pressable>
            </View>
          )}
        />
        <View className="mb-10">
          <QueueColorList />
        </View>
      </View>

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
            Konfirmasi Antrian
          </Text>

          <Text className="text-center text-gray-600 text-base leading-6 mb-8">
            Apakah anda yakin memilih antrian {sequence}, selalu pantau live antrian untuk
            estimasi kehadiran anda di klinik
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
              onPress={() =>
                router.push({
                  pathname: '/(app)/book/summary',
                  params: { polyClinicId, sequence },
                })
              }
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#4338ca' : '#4f46e5',
                shadowColor: '#6366f1',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: pressed ? 0.2 : 0.3,
                shadowRadius: 8,
                elevation: 6,
              })}>
              <Text className="text-center text-white font-semibold text-base">Pilih Antrian</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};