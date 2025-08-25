import { TextInput, View, Text, ScrollView } from "react-native"
import { Card } from "~/components/card";
import { ImageCarousel } from "~/components/carousel";
import { MainMenu } from "~/components/menu";
import { CardProps } from '~/interface/card';

const cardData: CardProps[] = [
    {
        title: "Beautiful Landscape",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        tags: ["Nature", "Travel", "Photography"]
    },
    {
        title: "Modern Architecture",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
        tags: ["Design", "Urban", "Modern"]
    },
    {
        title: "Delicious Food",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
        tags: ["Cuisine", "Recipe", "Healthy"]
    }
];

export const HomeScreen = () => {
    return (
        <>
            <Text className={styles.userName}>
                Hi, Thomas !
            </Text>
            <TextInput className={styles.searchInput} placeholder="search klinik" />
            <View className={styles.carouselBox}>
                <ImageCarousel
                    images={carouselImage}
                />
            </View>
            <View className="mt-5 p-5 justify-center">
                <MainMenu />
            </View>
            <ScrollView horizontal>
                {cardData.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            image={item.image}
                            tags={item.tags}
                        />
                ))}
            </ScrollView>
        </>
    )
}

const styles = {
    userName: "mt-5 text-2xl text-gray-100 font-semibold",
    searchInput: "mt-5 px-3 bg-white rounded-xl border-1 border-violet-500 text-gray-500 placeholder:text-gray-300 focus:border-violet-500 focus:shadow focus:shadow-slate-200 focus:outline-violet-500",
    carouselBox: "mt-5 shadow shadow-xl"
};
const carouselImage = [
    'https://dummyimage.com/600x400/ffffff/4f4f4e',
    'https://dummyimage.com/600x400/ffffff/4f4f4e',
] 