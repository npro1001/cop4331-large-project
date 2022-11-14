import 'package:flutter/foundation.dart';
import 'dart:ui';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  final storage = const FlutterSecureStorage();

  // Might need to add more?
  // Should these be initialized as null?
  final String _keyIsLoggedIn = 'false';
  final String _keyUsername = 'username';
  final String _keyPassword = 'password';
  final String _keyEmail = 'email';
  final String _keyToken = 'token';
  final String _keySpotifyAccessToken = 'accessToken';
  final String _keySpotifyRefreshToken = 'refreshToken';
  final String _keySpotifyExpireTime = 'expireTime';
  final String _keySpotifyTimestamp = 'timestamp';

  //! isLoggedIn
  Future setIsLoggedIn(String status) async {
    await storage.write(key: _keyIsLoggedIn, value: status);
  }

  Future<String?> getIsLoggedIn() async {
    return await storage.read(key: _keyIsLoggedIn);
  }

  //! Username
  Future setUsername(String username) async {
    await storage.write(key: _keyUsername, value: username);
  }

  Future<String?> getUsername() async {
    return await storage.read(key: _keyUsername);
  }

  //! Password
  Future setPassword(String password) async {
    await storage.write(key: _keyPassword, value: password);
  }

  Future<String?> getPassword() async {
    return await storage.read(key: _keyPassword);
  }

  //! Email
  Future setEmail(String email) async {
    await storage.write(key: _keyEmail, value: email);
  }

  Future<String?> getEmail() async {
    return await storage.read(key: _keyEmail);
  }

  //! Token
  Future setToken(String token) async {
    await storage.write(key: _keyToken, value: token);
  }

  Future<String?> getToken() async {
    return await storage.read(key: _keyToken);
  }

  //! Spotify Access Token
  Future setSpotifyAccessToken(String accessToken) async {
    await storage.write(key: _keySpotifyAccessToken, value: accessToken);
  }

  Future<String?> getSpotifyAccessToken() async {
    return await storage.read(key: _keySpotifyAccessToken);
  }

  //! Spotify Refresh Token
  Future setSpotifyRefreshToken(String refreshToken) async {
    await storage.write(key: _keySpotifyRefreshToken, value: refreshToken);
  }

  Future<String?> getSpotifyRefreshToken() async {
    return await storage.read(key: _keySpotifyRefreshToken);
  }

  //! Spotify Expire Time
  Future setSpotifyExpireTime(String expireTime) async {
    await storage.write(key: _keySpotifyExpireTime, value: expireTime);
  }

  Future<String?> getSpotifyExpireTime() async {
    return await storage.read(key: _keySpotifyExpireTime);
  }

  //! Spotify Timestamp
  Future setSpotifyTimestamp(String timestamp) async {
    await storage.write(key: _keySpotifyTimestamp, value: timestamp);
  }

  Future<String?> getSpotifyTimestamp() async {
    return await storage.read(key: _keySpotifyTimestamp);
  }
}
