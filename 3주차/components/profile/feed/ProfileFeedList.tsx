import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import { Image } from 'expo-image';
import { resolveImageSource } from '@/utils/image';
import { Grid } from '@/constants/theme';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / Grid.profileColumnCount;

export default function ProfileFeedList({
    posts,
    header,
}: {
    posts: Post[];
    header: React.ReactElement;
}) {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => (
                <Image
                    style={styles.image}
                    contentFit={'cover'}
                    source={resolveImageSource(item.images[0])}
                />
            )}
            ListHeaderComponent={header}
            numColumns={Grid.profileColumnCount}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: ITEM_SIZE * Grid.profileImageRatio,
        width: ITEM_SIZE - Grid.gap,
        marginRight: 1.5 * Grid.gap,
        marginBottom: 1.5 * Grid.gap,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
    },
});
