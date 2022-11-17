import 'dart:collection';
import 'dart:convert';

class User {
  String id;
  String name;
  String email;
  String username;
  String token; //?
  bool isConfirmed;
  String about;
  List<String> followers;
  List<String> following; //<dynamic>?
  // String profilePicture;
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
    required this.about,
    // required this.profilePicture,
    // required this.likes,
    // required this.password,
    // required this.comments,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    var followersArray = json['followers'];
    List<String> followersList = List<String>.from(followersArray);
    var followingArray = json['following'];
    List<String> followingList = List<String>.from(followingArray);

    return User(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
      username: json['username'],
      token: json['token'],
      isConfirmed: json['isConfirmed'],
      about: json['about'],
      followers:
          followersList, //! Unhandled Exception: type 'Null' is not a subtype of type 'Iterable<dynamic>' or String
      following: followingList,
      // password: json['password'],
      // profilePicture: json['profilePicture'],
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
        'about': model.about,
        // 'password': model.password,
        // 'profilePicture': model.profilePicture,
        // 'likes': model.likes,
        // 'comments': model.comments,
      };

  static String serialize(User model) => json.encode(User.toMap(model));
  static User deserialize(String json) => User.fromJson(jsonDecode(json));
}
