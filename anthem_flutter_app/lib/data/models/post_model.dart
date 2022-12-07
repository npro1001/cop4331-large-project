import 'dart:collection';
import 'dart:convert';

import 'package:flutter/foundation.dart';

class Post {
  String id;
  String author;
  String caption;
  String picture;

  Post({
    required this.id,
    required this.author,
    required this.caption,
    required this.picture,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    // var followersArray = json['followers'];
    // List<String> followersList = List<String>.from(followersArray);
    // var followingArray = json['following'];
    // List<String> followingList = List<String>.from(followingArray);
    // var pictureArray;
    // bool picValid;
    // Uint8List pictureData;
    // if (json['profilePicture']['data'] != null) {
    //   picValid = true;
    //   pictureArray = json['profilePicture']['data']['data'];
    //   try {
    //     List<int> intList = pictureArray.cast<int>().toList();
    //     pictureData = Uint8List.fromList(intList);
    //   } on Exception catch (_) {
    //     rethrow;
    //   }
    // } else {
    //   picValid = false;
    //   pictureArray = [];
    //   try {
    //     List<int> intList = pictureArray.cast<int>().toList();
    //     pictureData = Uint8List.fromList(intList);
    //   } on Exception catch (_) {
    //     rethrow;
    //   }
    // }

    // print(json[0]['name']);

    return Post(
      id: json[0]['_id'],
      author: json['name'],
      caption: json['caption'],
      picture: json['caption'],
    );
  }

  static Map<String, dynamic> toMap(Post model) => <String, dynamic>{
        '_id': model.id,
        'author': model.author,
        'caption': model.caption,
        'picture': model.picture,
      };

  static String serialize(Post model) => json.encode(Post.toMap(model));
  static Post deserialize(String json) => Post.fromJson(jsonDecode(json));
}
