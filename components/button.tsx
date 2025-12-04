import { Pressable, Text, ActivityIndicator } from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary'
}) => {
    const getButtonStyle = () => {
        const baseStyle = "mt-5 items-center rounded-xl border w-[70%]";
        if (disabled) {
            return `${baseStyle} border-0 bg-white opacity-40`;
        }
        if (variant === 'primary') {
            return `${baseStyle} shadow shadow-slate-700 border-blue-400 bg-blue-400`;
        } else {
            return `${baseStyle} shadow shadow-slate-700 border-blue-500 bg-white`;
        }
    };

    const getTextStyle = () => {
        if (disabled) {
            return "text-gray-400 opacity-80";
        }
        return variant === 'primary' ? "text-white" : "text-blue-500";
    };

    return (
        <Pressable
            className={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? '#ffffff' : '#3b82f6'}
                    className="m-3"
                />
            ) : (
                <Text className={`m-3 font-sm ${getTextStyle()}`}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};