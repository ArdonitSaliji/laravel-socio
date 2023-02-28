import React from 'react';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { Box } from '@mui/system';
import { IconButton, InputBase, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

const MessageWidget = ({ friendPicture }) => {
    const styles = {
        position: 'fixed',
        bottom: '0',
        right: '8rem',
        width: '22rem',
        height: '28rem',
        zIndex: '4',
        padding: '0.5rem 0 0.75rem 0rem',
    };
    const { palette } = useTheme();

    return (
        <WidgetWrapper sx={styles}>
            <FlexBetween sx={{ width: '100%', p: '0 0.5rem' }}>
                <FlexBetween>
                    <UserImage image={'ardonit.jpg'} size={'35px'} />
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
                            Ardonit Saliji
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
                />
            </FlexBetween>
            <hr style={{ width: '100%' }} />

            <Box display='flex' flexDirection='column' alignItems='center' mt='2rem'>
                <UserImage image={'ardonit.jpg'} />
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
                    Ardonit Saliji
                </Typography>
                <Typography
                    variant='subtitle1'
                    fontWeight='500'
                    sx={{
                        color: palette.primary.main,
                    }}
                >
                    Lives in Tearce, Tearce, Macedonia
                </Typography>
            </Box>
            <FlexBetween position='absolute' bottom='0' mb='1rem'>
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
        </WidgetWrapper>
    );
};

export default MessageWidget;
