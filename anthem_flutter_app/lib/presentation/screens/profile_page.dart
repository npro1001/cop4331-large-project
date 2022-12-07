import 'package:anthem_flutter_app/data/models/user_model.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../business_logic/user_auth/user_auth_bloc.dart';

class ProfilePage extends StatelessWidget {
  // final UserAuthBloc _userAuthBloc;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF2F2F7),
      appBar: _appBar(context),
      body: _profilePage(context),
    );
  }

  PreferredSizeWidget _appBar(context) {
    final UserAuthBloc userAuthBloc = BlocProvider.of<UserAuthBloc>(context);
    return AppBar(
      title: Text('Profile'),
      actions: [
        IconButton(
            onPressed: () {
              userAuthBloc.add(LoggedOutEvent()); // add = dispatch
              Navigator.of(context).pushNamed('/login');
            },
            icon: Icon(Icons.logout))
      ],
    );
  }

  Widget _profilePage(context) {
    final UserAuthBloc userAuthBloc = BlocProvider.of<UserAuthBloc>(context);
    return SafeArea(
      child: Center(
        child: Column(
          children: [
            SizedBox(height: 30),
            _avatar(userAuthBloc, context),
            // _changeAvatarButton(userAuthBloc, context),
            SizedBox(height: 30),
            _usernameTile(userAuthBloc, context),
            _emailTile(userAuthBloc, context),
            _descriptionTile(userAuthBloc, context),
            // _saveProfileChangesButton(userAuthBloc, context),
          ],
        ),
      ),
    );
  }

  Widget _avatar(userAuthBloc, context) {
    return CircleAvatar(
        radius: 50,
        child: ClipOval(
          // borderRadius: BorderRadius.circular(20), // Image border
          child: SizedBox.fromSize(
            size: Size.fromRadius(48), // Image radius
            child: BlocBuilder<UserAuthBloc, UserAuthState>(
              bloc: userAuthBloc,
              builder: (context, state) {
                if (state is AuthTrue && state.user.profilePictureValid) {
                  return Image.memory(
                    state.user.profilePicture,
                    fit: BoxFit.cover,
                  );
                } else {
                  return Image.asset("assets/lib/dogpfp.png");
                }
              },
            ),
          ),
        ));
  }

  Widget _changeAvatarButton(userAuthBloc, context) {
    return TextButton(
      onPressed: () {},
      child: Text('Change Avatar'),
    );
  }

  Widget _usernameTile(userAuthBloc, context) {
    // UserRepository userRepo;
    // User user = userRepo.getUser() as User;
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.person),
      title: BlocBuilder<UserAuthBloc, UserAuthState>(
        bloc: userAuthBloc,
        builder: (context, state) {
          if (state is AuthTrue) {
            return Text(state.user.username);
          } else {
            // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
            return Text('My Username');
          }
        },
      ),
    );
  }

  Widget _emailTile(userAuthBloc, context) {
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.mail),
      title: BlocBuilder<UserAuthBloc, UserAuthState>(
        bloc: userAuthBloc,
        builder: (context, state) {
          if (state is AuthTrue) {
            return Text(state.user.email);
          } else {
            // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
            return Text('My Email');
          }
        },
      ),
    );
  }

  Widget _descriptionTile(userAuthBloc, context) {
    return ListTile(
      tileColor: Colors.white,
      leading: Icon(Icons.library_music),
      title: BlocBuilder<UserAuthBloc, UserAuthState>(
        bloc: userAuthBloc,
        builder: (context, state) {
          if (state is AuthTrue) {
            return Text(state.user.anthem);
          } else {
            // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
            return Text('My Anthem');
          }
        },
      ),
    );
  }

  Widget _saveProfileChangesButton(userAuthBloc, context) {
    //update name and username
    return ElevatedButton(
      onPressed: () {},
      child: Text('Save Changes'),
    );
  }
}
