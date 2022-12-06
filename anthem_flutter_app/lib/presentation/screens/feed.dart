import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import '../../business_logic/user_auth/user_auth_bloc.dart';

class Feed extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
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
                Row(children: <Widget>[
                  IconButton(
                      icon: Icon(Icons.queue_music_sharp),
                      iconSize: 30.0,
                      onPressed: () => print("AnthemTV")),
                  SizedBox(width: 16.0),
                  Container(
                    width: 35.0,
                    child: IconButton(
                        icon: Icon(Icons.send),
                        iconSize: 30.0,
                        onPressed: () => print("DMs")),
                  )
                ])
              ],
            ),
          ),
          Container(
            width: double.infinity,
            height: 100,
            color: Colors.red,
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
            child: Container(
              width: double.infinity,
              height: 560.0,
              decoration: BoxDecoration(
                color: Colors.purple,
                borderRadius: BorderRadius.circular(25.0),
              ),
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 10),
                    child: Column(
                      children: <Widget>[],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
