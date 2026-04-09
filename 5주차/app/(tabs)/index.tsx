import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import NavigationTop from '@components/navigation/NavigationTop';
import ContentContainer from '@components/container';
import { FeedList } from '@components/feed/FeedList';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@components/themed-view';
import { useFeedStore } from '@/store/feed-store';

const HEADER_ANIMATION_DISTANCE = 100;
const HEADER_HIDE_OFFSET = 72;

export default function HomeScreen() {
    const { posts, loading, fetchFeed, loadMore } = useFeedStore();

    // TODO: scrollY 선언 (실습 6-4)
    const scrollY = useSharedValue(0);

    // TODO: headerAnimatedStyle 정의 (실습 6-5)
    const headerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            scrollY.value,
            [0, HEADER_ANIMATION_DISTANCE],
            [1, 0],
            Extrapolate.CLAMP,
        ),
        marginBottom: interpolate(
            scrollY.value,
            [0, HEADER_ANIMATION_DISTANCE],
            [0, -HEADER_HIDE_OFFSET],
            Extrapolate.CLAMP,
        ),
        transform: [
            {
                translateY: interpolate(
                    scrollY.value,
                    [0, HEADER_ANIMATION_DISTANCE],
                    [0, -HEADER_HIDE_OFFSET],
                    Extrapolate.CLAMP,
                ),
            },
        ],
    }));

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <ThemedView style={{ flex: 1, overflow: 'hidden' }}>
            {/* TODO: Animated.View + headerAnimatedStyle (실습 6-6) */}
            <Animated.View style={headerAnimatedStyle}>
                <ContentContainer isTopElement={true}>
                    <NavigationTop
                        title='MyFeed'
                        icon={'layers'}
                        rightButtons={
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 15,
                                }}
                            >
                                <Ionicons
                                    name='add-outline'
                                    size={24}
                                    color='#262626'
                                />
                            </View>
                        }
                    />
                </ContentContainer>
            </Animated.View>

            <View style={{ flex: 1 }}>
                {loading && posts.length === 0 ? (
                    <ActivityIndicator style={{ flex: 1 }} />
                ) : (
                    // TODO: scrollY 전달 (실습 6-7)
                    <FeedList posts={posts} onEndReached={loadMore} scrollY={scrollY} />
                )}
            </View>
        </ThemedView>
    );
}
