// Token management utilities using HTTP-only cookies approach
import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export class TokenManager {
  static setTokens(accessToken: string, refreshToken: string) {
    // Store access token for 15 minutes (same as backend expiry)
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { 
      expires: 1/96, // 15 minutes in days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    // Store refresh token for 7 days (same as backend expiry)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  static getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  }

  static setAccessToken(accessToken: string) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { 
      expires: 1/96, // 15 minutes in days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  static clearTokens() {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  }

  static hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Decode JWT to check expiration (basic check without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  static hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  }
}
