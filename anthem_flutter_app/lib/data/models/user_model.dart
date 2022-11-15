import 'dart:collection';
import 'dart:convert';

class User {
  String id;
  String username;
  String email;
  String password;
  bool isConfirmed;
  String about;
  String profilePicture;
  List<dynamic> likes;
  List<dynamic> followers;
  List<dynamic> following;
  List<dynamic> comments;
  String token; //?
  // final DateTime createdAt;
  // final String anthem; // favorite song

  User(
      {required this.id,
      required this.username,
      required this.email,
      required this.password,
      required this.isConfirmed,
      required this.about,
      required this.profilePicture,
      required this.likes,
      required this.followers,
      required this.following,
      required this.comments,
      required this.token});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      username: json['username'],
      email: json['email'],
      password: json['password'],
      isConfirmed: json['isConfirmed'],
      about: json['about'],
      profilePicture: json['profilePicture'],
      likes: json['likes'],
      followers: json['followers'],
      following: json['following'],
      comments: json['comments'],
      token: json['comments'],
    );
  }

  static Map<String, dynamic> toMap(User model) => <String, dynamic>{
        'id': model.id,
        'username': model.username,
        'email': model.email,
        'password': model.password,
        'isConfirmed': model.isConfirmed,
        'about': model.about,
        'profilePicture': model.profilePicture,
        'likes': model.likes,
        'followers': model.followers,
        'following': model.following,
        'comments': model.comments,
        'token': model.token,
      };

  static String serialize(User model) => json.encode(User.toMap(model));
  static User deserialize(String json) => User.fromJson(jsonDecode(json));
}
