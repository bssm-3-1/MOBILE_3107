import { Image, ImageLoadEventData } from 'expo-image';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_SCALE = 3;

export default function FeedImage({
    image,
    onDoubleTap,
}: {
    image: ImageSourcePropType;
    onDoubleTap?: () => void;
}) {
    const [imageHeight, setImageHeight] = useState(SCREEN_WIDTH);

    // TODO: scale, savedScale 선언 (실습 2-1)
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    // TODO: heartOpacity, heartScale 선언 (실습 3-1)
    const heartOpacity = useSharedValue(0);
    const heartScale = useSharedValue(0.8);

    // TODO: pinchGesture 정의 (실습 2-2)
    const pinchGesture = Gesture.Pinch()
        .onUpdate(e => {
            const nextScale = savedScale.value * e.scale;
            scale.value = Math.max(1, Math.min(nextScale, MAX_SCALE));
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    // TODO: doubleTapGesture 정의 (실습 3-2)
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .runOnJS(true)
        .onStart(() => {
            heartOpacity.value = withSequence(
                withSpring(1, { duration: 500 }),
                withSpring(0, { duration: 500 }),
            );
            heartScale.value = withSequence(
                withSpring(1.5, { duration: 300 }),
                withSpring(1, { duration: 500 }),
            );

            if (onDoubleTap) {
                onDoubleTap();
            }
        });

    // TODO: Gesture.Simultaneous로 합성 (실습 3-3)
    const composedGesture = Gesture.Simultaneous(
        pinchGesture,
        doubleTapGesture,
    );

    // TODO: imageAnimatedStyle 정의 (실습 2-3)
    const imageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // TODO: heartAnimatedStyle 정의 (실습 3-4)
    const heartAnimatedStyle = useAnimatedStyle(() => ({
        opacity: heartOpacity.value,
        transform: [{ scale: heartScale.value }],
    }));

    const handleImageLoad = (e: ImageLoadEventData) => {
        const { width, height } = e.source;
        const ratio = height / width;
        setImageHeight(SCREEN_WIDTH * ratio);
    };

    return (
        // TODO: GestureDetector + Animated.View 감싸기 (실습 2-4)
        // TODO: 하트 오버레이 추가 (실습 3-5)
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={imageAnimatedStyle}>
                <Image
                    source={image}
                    style={{ width: SCREEN_WIDTH, height: imageHeight }}
                    onLoad={handleImageLoad}
                />
                <Animated.View
                    pointerEvents='none'
                    style={[styles.heartOverlay, heartAnimatedStyle]}
                >
                    <Ionicons name='heart' size={88} color='white' />
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    heartOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
