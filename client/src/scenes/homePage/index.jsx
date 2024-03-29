import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MessageWidget from 'scenes/widgets/MessageWidget';

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    const { userId, picturePath } = useSelector((state) => {
        return state.user;
    });

    const friend = useSelector((state) => state.chatWithFriend);

    return (
        <Box>
            {friend?.friend && <MessageWidget friend={friend} />}
            <Navbar />
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='0.5rem'
                justifyContent='space-between'
            >
                <Box position='relative' flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget
                        values={{ marginTop: '5rem', position: 'fixed', width: '27.5rem' }}
                        userId={userId}
                        picturePath={picturePath}
                    />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={userId} profile={false} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                        <AdvertWidget />
                        <Box m='2rem 0' />
                        <FriendListWidget userId={userId} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
