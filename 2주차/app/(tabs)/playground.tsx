import { Image } from 'expo-image';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AvatarSizes, Colors, FeedColors, FontSizes, Spacing} from '@/constants/theme';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlaygroundScreen() {
    const inset = useSafeAreaInsets();

  return (
    <View style={[styles.contentContainer, {paddingTop: inset.top + 20}]}>
        <View style={styles.contentPadding}>
            <Text style={[styles.title, {
                borderColor: Colors.light.text
            }]}>Playground 1</Text>
        </View>
        <View style={styles.playgroundGap}>
            <View style={[styles.contentPadding, styles.flexDirectionRow, styles.gap10]}>
                <Image source={require("../../assets/images/raccoon.jpeg")} contentFit="fill" style={styles.avatar}/>
                <Text style={styles.username}>sseunyang</Text>
            </View>
            <Image
                source={require("../../assets/images/mao.jpeg")}
                style={styles.postImage}
            />
            <View style={[styles.contentPadding, styles.gap10]}>
                <View style={[styles.flexDirectionRow, styles.justifyBetween]}>
                    <View style={[styles.flexDirectionRow, styles.gap10]}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.row]}
                        >
                            <Ionicons
                                name={"heart-outline"}
                                size={26}
                                color={FeedColors.primaryText}
                            />
                            <Text style={styles.countText}>
                                {parseInt("2341").toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.row]}
                        >
                            <Ionicons
                                name={"chatbubble-outline"}
                                size={26}
                                color={FeedColors.primaryText}
                            />
                            <Text style={styles.countText}>
                                {parseInt("324").toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                        >
                            <Ionicons
                                name={"paper-plane-outline"}
                                size={26}
                                color={FeedColors.primaryText}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name={"bookmark-outline"}
                            size={26}
                            color={FeedColors.primaryText}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.caption} numberOfLines={2}>
                    <Text style={styles.bold}>sseunyang</Text>
                    {'  '}
                    마오
                </Text>
                <Text style={styles.timestamp}>3시간 전</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contentPadding: {
        paddingHorizontal: 16
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    playgroundGap: {
        marginTop: Spacing.xxl,
        gap: Spacing.xxl
    },
    title: {
        fontSize: 24,
        paddingBottom: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
    avatar: {
        width: AvatarSizes.md,
        height: AvatarSizes.md,
        borderRadius: AvatarSizes.md / 2,
    },
    username: {
        fontWeight: '600',
        fontSize: FontSizes.md,
    },
    postImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 1.2,
    },
    actionButton: {
        padding: 2,
    },
    row: {
        flexDirection: 'row',
        gap: Spacing.xs,
        alignItems: 'center',
    },
    countText: {
        fontWeight: '600',
    },
    bold: {
        fontWeight: '600',
    },
    caption: {
        fontSize: FontSizes.sm,
        color: FeedColors.primaryText,
        lineHeight: 19,
        marginBottom: Spacing.xs,
    },
    timestamp: {
        fontSize: FontSizes.xs,
        color: '#8E8E8E',
    },
    flexDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    gap10: {
        gap: 10,
    }
});