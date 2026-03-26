import { FlatList, StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import { FeedPost } from './post/FeedPost';

function FeedList({ posts }: { posts: Post[] }) {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <FeedPost post={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export { FeedList };
