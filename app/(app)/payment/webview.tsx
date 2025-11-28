import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

// ...
export default function PaymentWebView() {
    const { redirect_url } = useLocalSearchParams<{ redirect_url: string }>();
    return <WebView source={{ uri: redirect_url }} style={{ flex: 1 }} />;
}