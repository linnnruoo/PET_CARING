import jwt_decode from 'jwt-decode';
import setAuthToken from './SetAuthToken';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || process.env.CLIENT_URL
  }

  loginUser(token) {
    const decoded = jwt_decode(token);
    this.setToken(token);
    this.setRole(decoded.role);
    this.setID(decoded.id);
    setAuthToken(token);
  }

  isLoggedIn() {
    const token = this.getToken();

    if (token) {
      const decoded = jwt_decode(token);
      this.setRole(decoded.role);
      this.setID(decoded.id);
      // check expiration time
      const currTime = Date.now() / 1000;
      if (decoded.exp < currTime) {
        this.removeToken();
        this.removeRole();
        this.removeID();

        return false;
      }
    }
 
    return !!token;
  }

  logoutUser() {
    this.removeToken();
    this.removeRole();
    this.removeID();
    setAuthToken(false);
  }

  // Token
  setToken(token) {
    localStorage.setItem(process.env.JWT_HEADER, token);
  }

  getToken() {
    return localStorage.getItem(process.env.JWT_HEADER);
  }

  removeToken() {
    localStorage.removeItem(process.env.JWT_HEADER);
  }

  // UserRole
  setRole(role) {
    localStorage.setItem(process.env.USER_ROLE, role);
  }

  getRole() {
    return localStorage.getItem(process.env.USER_ROLE);
  }

  removeRole() {
    localStorage.removeItem(process.env.USER_ROLE);
  }

  // ID
  setID(id) {
    localStorage.setItem(process.env.USER_ID, id);
  } 

  getID() {
    return localStorage.getItem(process.env.USER_ID);
  }

  removeID() {
    localStorage.removeItem(process.env.USER_ID);
  }
}
