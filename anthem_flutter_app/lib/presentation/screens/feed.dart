// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

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
            color: Colors.grey,
          ),
          Padding(
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
                                image: AssetImage(
                                    "assets/lib/dogpfp.png"), //USER PFP
                                fit: BoxFit.cover,
                              )),
                            ),
                          ),
                          title: Text(
                            "KINGSLAYER69",
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          subtitle: Text("At Your Mom's House"),
                          trailing: IconButton(
                            icon: Icon(Icons.more_horiz),
                            color: Colors.black,
                            onPressed: () => print("More Options"),
                          ),
                        ),
                      ],
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
