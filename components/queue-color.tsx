import { View, Text } from 'react-native';

enum QueueColor {
  EMPTY = 'border border-slate-300',
  BOOKED = 'bg-blue-200',
  SKIPPED = 'border border-indigo-200',
  ON_GOING = 'bg-emerald-500',
  COMPLETED = 'bg-cyan-600',
}

export const QueueColorList = () => {
  return (
    <>
      <View className="flex flex-row items-center">
        <View className={`mx-5 h-3 w-10 rounded-lg ${QueueColor.ON_GOING}`} />
        <Text className="text-xs text-slate-600">Sedang Berlangsung</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className={`mx-5 h-3 w-10 rounded-lg ${QueueColor.BOOKED}`} />
        <Text className="text-xs text-slate-600">Sedang Menunggu</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className={`mx-5 h-3 w-10 rounded-lg ${QueueColor.EMPTY}`} />
        <Text className="text-xs text-slate-600">Antrian Kosong</Text>
      </View>
      {/* <View className="flex flex-row items-center">
            <View className={`h-3 w-10 mx-5 rounded-lg ${QueueColor.SKIPPED}`}></View>
            <Text className='text-xs text-slate-600'>Dilewati</Text>
      </View> */}
      <View className="flex flex-row items-center">
        <View className={`mx-5 h-3 w-10 rounded-lg ${QueueColor.COMPLETED}`} />
        <Text className="text-xs text-slate-600">Selesai</Text>
      </View>
    </>
  );
};