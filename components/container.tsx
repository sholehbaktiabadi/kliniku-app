import { ImageBackground, SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className="flex flex-1 m-6">{children}</SafeAreaView>;
};

export const ContainerImg = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ImageBackground
      className="fixed h-[40%]"
      source={require('../assets/app/background.png')}
      resizeMode="stretch">
      <SafeAreaView className={`flex flex-1 ${className}`}>{children}</SafeAreaView>
    </ImageBackground>
  );
};
