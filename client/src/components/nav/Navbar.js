import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import SVGIconButton from "../buttons/SVGIconButton";
import { PetIcon, AccountIcon, MoreIcon } from "../../constants/icon_list";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      openRegisterModal: false,
      openLoginModal: false
    };
    this._handleProfileMenuOpen = this._handleProfileMenuOpen.bind(this);
    this._handleMenuClose = this._handleMenuClose.bind(this);
    this._handleMobileMenuOpen = this._handleMobileMenuOpen.bind(this);
    this._handleMobileMenuClose = this._handleMobileMenuClose.bind(this);
    this._onModalOpen = this._onModalOpen.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
    this._onLogoutClick = this._onLogoutClick.bind(this);
  }
  _handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  _handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this._handleMobileMenuClose();
  };

  _handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  _handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  _onModalOpen = modalName => e => {
    this.setState({ [modalName]: true });
  };

  _onModalClose = modalName => e => {
    this.setState({ [modalName]: false });
  };
  _onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const {
      anchorEl,
      mobileMoreAnchorEl,
      openLoginModal,
      openRegisterModal
    } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { isAuthenticated } = this.props.auth;

    const renderAuthMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this._handleMenuClose}
      >
        <MenuItem href="/profile">Profile</MenuItem>
        <MenuItem href="/dashboard">Dashboard</MenuItem>
        <MenuItem onClick={this._onLogoutClick}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = isAuthenticated => (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this._handleMenuClose}
      >
        {isAuthenticated ? (
          <MenuItem onClick={this._handleProfileMenuOpen}>
            <SVGIconButton pathName={AccountIcon} color="#000" />
            <p>Profile</p>
          </MenuItem>
        ) : (
          // TODO: remove div but react fragment is not accepted?
          <div>
            <MenuItem onClick={this._onModalOpen("openRegisterModal")}>
              <p>Sign Up</p>
            </MenuItem>
            <MenuItem onClick={this._onModalOpen("openLoginModal")}>
              <p>Login</p>
            </MenuItem>
          </div>
        )}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <SVGIconButton pathName={PetIcon} href="/" />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuthenticated ? (
                <SVGIconButton
                  aria-owns={isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this._handleProfileMenuOpen}
                  pathName={AccountIcon}
                />
              ) : (
                // open modal
                <>
                  <Button onClick={this._onModalOpen("openRegisterModal")}>
                    Sign Up
                  </Button>
                  <Button onClick={this._onModalOpen("openLoginModal")}>
                    Login
                  </Button>
                </>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <SVGIconButton
                aria-haspopup="true"
                onClick={this._handleMobileMenuOpen}
                pathName={MoreIcon}
              />
            </div>
          </Toolbar>
        </AppBar>
        {isAuthenticated ? renderAuthMenu : null}
        {renderMobileMenu(isAuthenticated)}
        {openRegisterModal && (
          <RegisterModal
            open={openRegisterModal}
            onClose={this._onModalClose("openRegisterModal")}
          />
        )}
        {openLoginModal && (
          <LoginModal
            open={openLoginModal}
            onClose={this._onModalClose("openLoginModal")}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Navbar));
