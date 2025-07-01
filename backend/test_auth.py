#!/usr/bin/env python3
"""
Simple test script to verify the authentication system is working.
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_signup_and_login():
    """Test user signup and login functionality."""
    print("🧪 Testing Authentication System...")
    
    # Test data
    test_email = "test@example.com"
    test_password = "testpassword123"
    
    try:
        # Test signup
        print("\n1. Testing user signup...")
        signup_data = {
            "email": test_email,
            "password": test_password
        }
        
        signup_response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json=signup_data,
            headers={"Content-Type": "application/json"}
        )
        
        if signup_response.status_code == 201:
            print("✅ Signup successful!")
            user_data = signup_response.json()
            print(f"   User ID: {user_data['id']}")
            print(f"   Email: {user_data['email']}")
        elif signup_response.status_code == 400 and "already registered" in signup_response.text:
            print("ℹ️  User already exists, continuing with login test...")
        else:
            print(f"❌ Signup failed: {signup_response.status_code}")
            print(f"   Response: {signup_response.text}")
            return
        
        # Test login
        print("\n2. Testing user login...")
        login_data = {
            "email": test_email,
            "password": test_password
        }
        
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"}
        )
        
        if login_response.status_code == 200:
            print("✅ Login successful!")
            tokens = login_response.json()
            access_token = tokens['access_token']
            refresh_token = tokens['refresh_token']
            print(f"   Token type: {tokens['token_type']}")
            print(f"   Access token length: {len(access_token)}")
            print(f"   Refresh token length: {len(refresh_token)}")
            
            # Test protected endpoint
            print("\n3. Testing protected endpoint...")
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            user_response = requests.get(
                f"{BASE_URL}/api/users/me",
                headers=headers
            )
            
            if user_response.status_code == 200:
                print("✅ Protected endpoint access successful!")
                user_info = user_response.json()
                print(f"   User: {user_info['email']}")
                print(f"   Active: {user_info['is_active']}")
                print(f"   Created: {user_info['created_at']}")
            else:
                print(f"❌ Protected endpoint failed: {user_response.status_code}")
                print(f"   Response: {user_response.text}")
                
            # Test token refresh
            print("\n4. Testing token refresh...")
            refresh_data = {
                "refresh_token": refresh_token
            }
            
            refresh_response = requests.post(
                f"{BASE_URL}/api/auth/refresh",
                json=refresh_data,
                headers={"Content-Type": "application/json"}
            )
            
            if refresh_response.status_code == 200:
                print("✅ Token refresh successful!")
                new_tokens = refresh_response.json()
                print(f"   New access token length: {len(new_tokens['access_token'])}")
            else:
                print(f"❌ Token refresh failed: {refresh_response.status_code}")
                print(f"   Response: {refresh_response.text}")
                
        else:
            print(f"❌ Login failed: {login_response.status_code}")
            print(f"   Response: {login_response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error: Make sure the backend server is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_signup_and_login()
    print("\n🎉 Authentication system test completed!")
