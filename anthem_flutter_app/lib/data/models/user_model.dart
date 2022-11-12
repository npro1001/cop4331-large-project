import 'dart:collection';

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
      required this.comments});
}
