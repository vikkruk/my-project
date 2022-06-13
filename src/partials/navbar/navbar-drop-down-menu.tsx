import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import ListIcon from '@mui/icons-material/List';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Box } from '@mui/material';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';

const NavbarDropDownMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const admin = 'placeholder';

  const logout = () => dispatch(authLogoutAction);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (

    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Button
        sx={(theme) => ({
          color: theme.palette.secondary.main,

        })}
        ref={anchorRef}
        onClick={handleToggle}
      >
        <ListIcon sx={{ fontSize: 55 }} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 50 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper sx={(theme) => ({ backgroundColor: theme.palette.common.white })}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                >
                  {admin && (
                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    navigate('/admin');
                  }}
                  >
                    Admin
                  </MenuItem>
                  )}
                  {loggedIn && (
                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    navigate('/profile');
                  }}
                  >
                    Profile
                  </MenuItem>
                  )}

                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    navigate('/actors');
                  }}
                  >
                    Actors
                  </MenuItem>
                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    navigate('/directors');
                  }}
                  >
                    Directors

                  </MenuItem>
                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    navigate('/movies');
                  }}
                  >
                    Movies

                  </MenuItem>
                  <MenuItem onClick={(e) => {
                    handleClose(e);
                    logout();
                  }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default NavbarDropDownMenu;
