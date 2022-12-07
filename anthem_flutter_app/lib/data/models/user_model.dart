import 'dart:collection';
import 'dart:convert';

import 'package:flutter/foundation.dart';

class User {
  String id;
  String name;
  String email;
  String username;
  String token; //?
  bool isConfirmed;
  // String about;
  List<String> followers;
  List<String> following; //<dynamic>?
  Uint8List profilePicture;
  bool profilePictureValid;
  // List<dynamic> likes;
  // String password;
  // List<dynamic> comments;
  // final DateTime createdAt;
  // final String anthem; // favorite song

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.username,
    required this.token,
    required this.isConfirmed,
    required this.followers,
    required this.following,
    // required this.about,
    required this.profilePicture,
    required this.profilePictureValid,
    // required this.likes,
    // required this.password,
    // required this.comments,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    var followersArray = json['followers'];
    List<String> followersList = List<String>.from(followersArray);
    var followingArray = json['following'];
    List<String> followingList = List<String>.from(followingArray);
    var pictureArray;
    bool picValid;
    Uint8List pictureData;
    if (json['profilePicture']['data'] != null) {
      picValid = true;
      pictureArray = json['profilePicture']['data']['data'];
      try {
        List<int> intList = pictureArray.cast<int>().toList();
        pictureData = Uint8List.fromList(intList);
      } on Exception catch (_) {
        rethrow;
      }
    } else {
      picValid = false;
      pictureArray = [];
      try {
        List<int> intList = pictureArray.cast<int>().toList();
        pictureData = Uint8List.fromList(intList);
      } on Exception catch (_) {
        rethrow;
      }
    }
    // Map<String, dynamic> map = jsonDecode(pictureArray);
    // List<dynamic> data = map['data'];
    // List<String> pictureList = List<String>.from(pictureArray);
    // final Uint8List bytes = pictureArray.asUint8List();

    print(picValid);
    // const base64String = btoa(new Uint8Array(user.profilePicture.data.data).reduce(function (data, byte) {
    //                         return data + String.fromCharCode(byte);
    //                     }, ''));

    return User(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
      username: json['username'],
      token: json['token'],
      isConfirmed: json['isConfirmed'],
      // about: json['about'],
      followers:
          followersList, //! Unhandled Exception: type 'Null' is not a subtype of type 'Iterable<dynamic>' or String
      following: followingList,
      // password: json['password'],
      profilePicture: pictureData,
      profilePictureValid: picValid,
      // likes: json['likes'],
      // comments: json['comments'],
    );
  }

  static Map<String, dynamic> toMap(User model) => <String, dynamic>{
        '_id': model.id,
        'name': model.name,
        'email': model.email,
        'username': model.username,
        'token': model.token,
        'isConfirmed': model.isConfirmed,
        'followers': model.followers,
        'following': model.following,
        // 'about': model.about,
        // 'password': model.password,
        'profilePicture': model.profilePicture,
        'profilePictureValid': model.profilePictureValid,
        // 'likes': model.likes,
        // 'comments': model.comments,
      };

  static String serialize(User model) => json.encode(User.toMap(model));
  static User deserialize(String json) => User.fromJson(jsonDecode(json));
}
