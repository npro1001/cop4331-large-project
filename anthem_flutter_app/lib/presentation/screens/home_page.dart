import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import '../../business_logic/user_auth/user_auth_bloc.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final UserAuthBloc userAuthBloc = BlocProvider.of<UserAuthBloc>(context);

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/lib/background0.png"),
              fit: BoxFit.fill),
        ),
        child: Center(
            child: Column(
          children: [
            SizedBox(height: 40),
            Image(
              image: AssetImage("assets/lib/logo.png"),
              width: 80,
              height: 80,
            ),
            SizedBox(height: 13),
            Text(
              "Welcome to Anthem",
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            BlocBuilder<UserAuthBloc, UserAuthState>(
              bloc: userAuthBloc,
              builder: (context, state) {
                if (state is AuthTrue) {
                  return Text(state.user.name);
                } else {
                  // Navigator.of(context).pushNamed('/login'); THIS DOESNT WORK
                  return Text(
                    "You have not signed in yet!",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  );
                }
              },
            ),
            SizedBox(height: 80),
            FloatingActionButton.extended(
              heroTag: "Login",
              label: Text('Login'),
              onPressed: () {
                userAuthBloc.add(LoggedOutEvent()); // add = dispatch
                Navigator.of(context).pushNamed('/login');
              },
            ),
            SizedBox(height: 20),
            FloatingActionButton.extended(
              heroTag: "Register",
              label: Text('Register'),
              onPressed: () {
                Navigator.of(context).pushNamed("/register");
              },
            ),
          ],
        )),
      ),
    );
  }
}
