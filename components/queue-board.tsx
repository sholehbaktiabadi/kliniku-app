import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SimpleGrid } from 'react-native-super-grid';
import { QueueColorList } from './queue-color';


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

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View className="flex-1 justify-end">
          <View className="items-center justify-center rounded-xl bg-slate-50 px-16 py-20">
            <Text className="text-center text-sm text-slate-500">
              Apakah anda yakin memilih antrian {sequence}, selalu pantau live antrian untuk
              estimasi kehadiran anda di klinik
            </Text>
            <View className="mt-5 h-20 w-48 items-center justify-center rounded-xl border-2 border-blue-300 ">
              <Text className="text-3xl text-slate-700">{sequence}</Text>
            </View>
            <Pressable
              className="m-3 rounded-xl border border-blue-400 bg-blue-400 p-3 shadow shadow-slate-700"
              onPress={() =>
                router.push({
                  pathname: '/(app)/polyclinic/detail',
                  params: { polyClinicId, sequence },
                })
              }>
              <Text className="font-bold text-slate-100">Booking Antrian</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};