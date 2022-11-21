// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:anthem_flutter_app/business_logic/login/login_bloc.dart';
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:anthem_flutter_app/presentation/widgets/login_form.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginPage extends StatefulWidget {
  final UserRepository userRepo;

  const LoginPage({Key? key, required this.userRepo}) // Key?, const?
      : assert(userRepo != null),
        super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late LoginBloc _loginBloc;
  late UserAuthBloc _userAuthBloc; // late?

  UserRepository get _userRepo => widget.userRepo;

  @override
  void initState() {
    _userAuthBloc = BlocProvider.of<UserAuthBloc>(context);
    _loginBloc = LoginBloc(
      userRepo: _userRepo,
      userAuthBloc: _userAuthBloc,
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/lib/background0.png"),
              fit: BoxFit.fill),
        ),
        child: Padding(
          padding: EdgeInsets.all(25),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  SizedBox(height: 40),
                  Image(
                    image: AssetImage("assets/lib/logo.png"),
                    width: 40,
                    height: 40,
                  ),
                  SizedBox(height: 13),
                  Text(
                    "Welcome Back",
                    style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    "Sign in to continue",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                      color: Colors.grey[400],
                    ),
                  ),
                  SizedBox(height: 30),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    child: TextFormField(
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 22,
                      ),
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        prefixIcon: Icon(Icons.mail, size: 30),
                        labelText: "Username",
                        labelStyle: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    child: TextFormField(
                      obscureText: true,
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 22,
                      ),
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        prefixIcon: Icon(Icons.lock, size: 30),
                        labelText: "Password",
                        labelStyle: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: Text(
                          "Forgot Passw0rd",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).primaryColor,
                          ),
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 10),
                  SizedBox(
                    height: 55,
                    width: double.infinity,
                    child: FloatingActionButton.extended(
                        backgroundColor: Theme.of(context).primaryColor,
                        label: Text('Login'),
                        onPressed: () {}),
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Don't have an account?",
                        style: TextStyle(
                          fontSize: 18,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.of(context).pushNamed('/register');
                        },
                        child: Text(
                          " Register",
                          style: TextStyle(
                            color: Color.fromARGB(255, 255, 255,
                                255), // Theme.of(context).primaryColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  /*
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: LoginForm(
        userAuthBloc: _userAuthBloc,
        loginBloc: _loginBloc,
      ),
    );
  }
  */

  @override
  void dispose() {
    _loginBloc.close();
    super.dispose();
  }
}
