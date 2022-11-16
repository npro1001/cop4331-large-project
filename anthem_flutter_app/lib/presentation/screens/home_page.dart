import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import '../../business_logic/user_auth/user_auth_bloc.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final UserAuthBloc userAuthBloc = BlocProvider.of<UserAuthBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Container(
        child: Center(
            child: Column(
          children: [
            BlocBuilder<UserAuthBloc, UserAuthState>(
              bloc: userAuthBloc,
              builder: (context, state) {
                if (state is AuthTrue) {
                  return Text(state.user.name);
                } else {
                  // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
                  return Text("no user");
                }
              },
            ),
            MaterialButton(
              child: Text('logout'),
              onPressed: () {
                userAuthBloc.add(LoggedOutEvent()); // add = dispatch
                Navigator.of(context).pushNamed('/login');
              },
            ),
          ],
        )),
      ),
    );
  }
}
