import { TextInput, View } from "react-native"
import { ImageCarousel } from "~/components/carousel";
import { MainMenu } from "~/components/menu";

export const Home = () => {
    return (
        <>
            <TextInput className={styles.searchInput} placeholder="search klinik" />
            <View className={styles.carouselBox}>
                <ImageCarousel
                    images={carouselImage}
                />
            </View>
            <MainMenu />
        </>
    )
}

const styles = {
    searchInput: "mt-5 px-3 rounded-xl border border-indigo-200 text-gray-500 placeholder:text-gray-300 focus:border-indigo-500 focus:shadow focus:shadow-slate-200 focus:outline-indigo-500",
    carouselBox: "mt-5 shadow shadow-xl"
};
const carouselImage = [
    'https://dummyimage.com/600x400/4f4f4e/ffffff',
    'https://dummyimage.com/600x400/4f4f4e/ffffff',
] 