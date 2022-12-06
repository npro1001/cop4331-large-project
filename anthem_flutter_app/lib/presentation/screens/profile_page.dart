import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../business_logic/user_auth/user_auth_bloc.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF2F2F7),
      appBar: _appBar(),
      body: _profilePage(),
    );
  }

  PreferredSizeWidget _appBar() {
    return AppBar(
      title: Text('Profile'),
      actions: [IconButton(onPressed: () {}, icon: Icon(Icons.logout))],
    );
  }

  Widget _profilePage() {
    return SafeArea(
      child: Center(
        child: Column(
          children: [
            SizedBox(height: 30),
            _avatar(),
            _changeAvatarButton(),
            SizedBox(height: 30),
            _usernameTile(),
            _emailTile(),
            _descriptionTile(),
            _saveProfileChangesButton(),
          ],
        ),
      ),
    );
  }

  Widget _avatar() {
    return CircleAvatar(
      radius: 50,
      child: Icon(Icons.person),
    );
  }

  Widget _changeAvatarButton() {
    return TextButton(
      onPressed: () {},
      child: Text('Change Avatar'),
    );
  }

  Widget _usernameTile() {
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.person),
      title: Text('My Username'),
    );
  }

  Widget _emailTile() {
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.mail),
      title: Text('My Email'),
    );
  }

  Widget _descriptionTile() {
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.edit),
      title: TextFormField(
        decoration: InputDecoration.collapsed(hintText: 'Enter a Description'),
        maxLines: null,
      ),
    );
  }

  Widget _saveProfileChangesButton() {
    return ElevatedButton(
      onPressed: () {},
      child: Text('Save Changes'),
    );
  }
}
