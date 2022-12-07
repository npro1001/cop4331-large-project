// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get/get_connect/http/src/response/response.dart';
import 'package:http/http.dart' as http;
import '../../business_logic/user_auth/user_auth_bloc.dart';
import '../../data/models/post_model.dart';

late List container = [];
var i = 0;

class Feed extends StatelessWidget {
  Widget _buildPost(
      int index, pfp, String author, String caption, imageIn, int likes) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
      child: Container(
        width: double.infinity,
        height: 560.0,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(25.0),
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: EdgeInsets.symmetric(vertical: 10),
              child: Column(
                children: <Widget>[
                  ListTile(
                    leading: Container(
                      width: 50,
                      height: 50,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black45,
                            offset: Offset(0, 2),
                            blurRadius: 6.0,
                          ),
                        ],
                      ),
                      child: CircleAvatar(
                        child: ClipOval(
                            child: Image(
                          height: 50,
                          width: 50,
                          image: pfp, //USER PFP
                          fit: BoxFit.cover,
                        )),
                      ),
                    ),
                    title: Text(
                      author,
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text(caption),
                    trailing: IconButton(
                      icon: Icon(Icons.more_horiz),
                      color: Colors.black,
                      onPressed: () => print("More Options"),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.all(10),
                    width: double.infinity,
                    height: 400,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black45,
                          offset: Offset(0, 5),
                          blurRadius: 8.0,
                        ),
                      ],
                      image: DecorationImage(
                        image: imageIn,
                        // image: if(imageFlag){
                        //     return MemoryImage(image)
                        //     }
                        //     else{
                        //     return AssetImage("inevitable_shitpost.png")},
                        fit: BoxFit.fitWidth,
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            IconButton(
                              icon: Icon(Icons.favorite_border),
                              iconSize: 30.0,
                              onPressed: () => print("Like Post"),
                            ),
                            Text(
                              '$likes',
                              style: TextStyle(
                                fontSize: 14.0,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final UserAuthBloc userAuthBloc = BlocProvider.of<UserAuthBloc>(context);
    return Scaffold(
      backgroundColor: Color(0xFFEDF0F0F6), //Instagram color WHAAA???
      body: ListView(
        physics: AlwaysScrollableScrollPhysics(),
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(
                  "Anthem",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 32.0,
                  ),
                ),
                Row(
                  children: <Widget>[
                    IconButton(
                        icon: Icon(Icons.queue_music_sharp),
                        iconSize: 30.0,
                        onPressed: () => print("AnthemTV")),
                    SizedBox(width: 16.0),
                    Container(
                      width: 35.0,
                      child: IconButton(
                        icon: Icon(Icons.portrait_sharp),
                        iconSize: 30.0,
                        onPressed: () {
                          Navigator.of(context).pushNamed('/profile');
                        },
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
          BlocBuilder<UserAuthBloc, UserAuthState>(
            bloc: userAuthBloc,
            builder: (context, state) {
              if (state is AuthTrue) {
                getPosts(state.user.id, state.user.token);
                // for (var j = 0; j < i; j++) {
                //   masterClass
                //       .add(_buildPost(j, container[j][2], container[j][3]));
                //   print(container[j][2]);
                // }
                return Text("");
              } else {
                // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
                return Text('Something went very wrong!');
              }
            },
          ),
          for (var j = 0; j < i; j++)
            _buildPost(
                j,
                container[j][2].length != 0
                    ? MemoryImage(Uint8List.fromList(
                        container[j][2]['data']['data'].cast<int>().toList()))
                    : AssetImage("assets/lib/dogpfp.png"),
                container[j][3],
                container[j][4],
                container[j][5]['data'] != null
                    ? MemoryImage(Uint8List.fromList(
                        container[j][5]['data']['data'].cast<int>().toList()))
                    : AssetImage("assets/lib/postpic1.jpg"),
                container[j][6]),
        ],
      ),
    );
  }
}

void getPosts(String id, String token) async {
  final response = await http.get(
      Uri.parse('https://anthem-cop4331.herokuapp.com/api/users/' +
          id +
          '/getFollowingPosts'),
      headers: <String, String>{
        'Authorization': 'Bearer ' + token,
      });
  // print(response.body);
  if (response.statusCode == 201) {
    var test = jsonDecode(response.body);
    List<dynamic> results = test;
    i = 0;
    results.forEach((entry) {
      // print(entry['profileImage']);
      List<dynamic> post = [
        i,
        entry['id'],
        entry['profileImage'],
        entry['name'],
        entry['caption'],
        entry['img'],
        entry['likes']
      ];
      container.add(post);
      // print(i);
      i++;
    });
  } else {
    throw Exception('Failed to load posts');
  }
}
