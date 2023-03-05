import React from 'react';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { Box } from '@mui/system';
import { IconButton, InputBase, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { setChatWithFriend } from 'state';

const MessageWidget = ({ friend }) => {
    const { palette } = useTheme();
    const { picturePath, firstName, lastName, location } = friend;
    const dispatch = useDispatch();
    const styles = {
        position: 'fixed',
        bottom: '0',
        right: '8rem',
        width: '22rem',
        height: '28rem',
        zIndex: '4',
        padding: '0.5rem 0 0.75rem 0rem',
    };

    let outStyling = {
        padding: '0.25rem 0.7rem',
        backgroundColor: '#00353F !important',
        textAlign: 'right',
        borderRadius: '15px',
        margin: '3px 0',
        width: 'fit-content',
        maxWidth: '60%',
    };

    let theirStyling = {
        padding: '0.25rem 0.7rem',
        backgroundColor: '#3e4042 !important',
        textAlign: 'left',
        borderRadius: '15px',
        margin: '3px 0',
        width: 'fit-content',
        maxWidth: '60%',
    };

    let theirMessages = {
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
    };

    let ourMessages = {
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
    };
    return (
        <WidgetWrapper sx={styles}>
            <FlexBetween sx={{ width: '100%', p: '0 0.5rem' }}>
                <FlexBetween>
                    <UserImage image={picturePath} size={'35px'} />
                    <Box sx={{ ml: '0.5rem' }}>
                        <Typography
                            variant='h5'
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography>Active Now</Typography>
                    </Box>
                </FlexBetween>
                <CloseIcon
                    sx={{
                        '&:hover': {
                            cursor: 'pointer',
                            color: palette.primary.light,
                        },
                        mr: '0.5rem',
                    }}
                    fontSize='large'
                    onClick={() => {
                        dispatch(setChatWithFriend(null));
                    }}
                />
            </FlexBetween>
            <hr style={{ width: '100%' }} />
            <Box sx={{ overflowY: 'scroll' }}>
                <Box display='flex' flexDirection='column' alignItems='center' mt='2rem'>
                    <UserImage image={picturePath} />
                    <Typography
                        variant='h4'
                        fontWeight='500'
                        mt='0.5rem'
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        fontWeight='500'
                        sx={{
                            color: palette.primary.main,
                        }}
                    >
                        Lives in {location}
                    </Typography>
                </Box>
                <FlexBetween
                    sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        width: '100%',
                        height: '10rem',
                        padding: '0 1rem',
                    }}
                >
                    <List
                        sx={{
                            mt: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'flex-end',
                        }}
                    >
                        <div style={theirMessages}>
                            <ListItem sx={theirStyling}>
                                <ListItemText
                                    sx={{ width: 'auto' }}
                                    primary='Hey How is it going man?'
                                />
                            </ListItem>
                        </div>
                        <div style={ourMessages}>
                            <ListItem sx={outStyling}>
                                <ListItemText sx={{ width: 'auto' }} primary='Good man wby?' />
                            </ListItem>
                        </div>
                        <div style={theirMessages}>
                            <ListItem sx={theirStyling}>
                                <ListItemText
                                    sx={{ width: '100%' }}
                                    primary='Fine thanks! I see you got back from your Vacation, how was it?'
                                />
                            </ListItem>
                        </div>
                        <div style={ourMessages}>
                            <ListItem sx={outStyling}>
                                <ListItemText
                                    sx={{ width: '100%' }}
                                    primary='Yeah, it was great!'
                                />
                            </ListItem>
                        </div>
                    </List>
                </FlexBetween>
                <FlexBetween position='fixed' bottom='0' mb='1rem'>
                    <IconButton
                        sx={{
                            bgcolor: palette.primary.light,
                            m: '0 0.7rem 0 1rem',
                            width: '1.8rem',
                            height: '1.8rem',
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    <FlexBetween
                        position='relative'
                        backgroundColor={palette.neutral.light}
                        borderRadius='9px'
                        gap='1rem'
                        padding='0.1rem 0.3rem 0.1rem 0.5rem'
                    >
                        <InputBase placeholder='Aa' />
                        <IconButton>
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </FlexBetween>
                    <IconButton sx={{ ml: '0.3rem' }}>
                        <SendIcon />
                    </IconButton>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default MessageWidget;
