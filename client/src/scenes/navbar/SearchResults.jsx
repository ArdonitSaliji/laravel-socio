import React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemButton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
        button: true,
        transform: 'translateY(100%)',
        left: '0',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        bottom: '0',
    },
}));

function SearchResults(props) {
    const classes = useStyles();
    const { users } = props;
    if (users) {
        return (
            <List sx={{ position: 'absolute' }} className={classes.root}>
                {users.length > 0 &&
                    users?.map((user) => (
                        <ListItemButton
                            href={'/profile/' + user.userId}
                            sx={{ height: '4rem' }}
                            key={user.userId}
                        >
                            <Avatar
                                src={'http://localhost:8000/assets/' + user.picturePath}
                                sx={{ marginRight: '1rem' }}
                            />
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                        </ListItemButton>
                    ))}
            </List>
        );
    }
}

export default SearchResults;
