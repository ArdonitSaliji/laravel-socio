import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChatWithFriend, setFriends, setMessageFriend } from 'state';
import MessageIcon from '@mui/icons-material/Message';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isFriend =
        friends && friends.length > 0 && friends?.find((friend) => friend.id === friendId);

    const patchFriend = async () => {
        const res = await fetch(`http://localhost:8000/api/users/${id}/${friendId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        dispatch(setFriends({ friends: data }));
    };

    const getFriend = async () => {
        const res = await fetch(`http://localhost:8000/api/users/id`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friendId: friendId,
            }),
        });

        let json = await res.json();
        dispatch(setChatWithFriend(json));
    };

    return (
        <FlexBetween>
            <FlexBetween gap='1rem'>
                <UserImage image={userPicturePath} size='55px' />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontWeight='500'
                        sx={{
                            '&:hover': {
                                color: palette.primary.light,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.75rem'>
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            {/* Add or remove friend button */}

            {isFriend ? (
                <div>
                    <IconButton
                        onClick={() => patchFriend()}
                        sx={{ backgroundColor: primaryLight, p: '0.6rem', mr: '0.5rem' }}
                    >
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    </IconButton>
                    <IconButton
                        onClick={() => getFriend()}
                        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
                    >
                        <MessageIcon sx={{ color: primaryDark }} />
                    </IconButton>
                </div>
            ) : (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
                >
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                </IconButton>
            )}
        </FlexBetween>
    );
};

export default Friend;
