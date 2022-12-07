import 'package:anthem_flutter_app/business_logic/login/login_bloc.dart';
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

class LoginForm extends StatefulWidget {
  final LoginBloc loginBloc;
  final UserAuthBloc userAuthBloc;

  LoginForm({
    Key? key,
    required this.loginBloc,
    required this.userAuthBloc,
  }) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  LoginBloc get _loginBloc => widget.loginBloc;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      // loginbloc not loginevent
      bloc: _loginBloc,
      builder: (
        BuildContext context,
        LoginState state,
      ) {
        if (state is LoginFailure) {
          _onWidgetDidBuild(() {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('${state.error}'),
                backgroundColor: Colors.red,
              ),
            );
          });
        }

        return Form(
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(
                  border: InputBorder.none,
                  prefixIcon: Icon(Icons.mail, size: 30),
                  labelText: "Username",
                  labelStyle: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                controller: _usernameController,
              ),
              TextFormField(
                decoration: InputDecoration(
                  border: InputBorder.none,
                  prefixIcon: Icon(Icons.lock, size: 30),
                  labelText: "Password",
                  labelStyle: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                controller: _passwordController,
                obscureText: true,
              ),
              FloatingActionButton.extended(
                //! Deal with error here after login button response
                onPressed:
                    state is! LoginLoading ? _onLoginButtonPressed : null,
                backgroundColor: Theme.of(context).primaryColor,
                label: Text('Login'),
              ),
              Container(
                child:
                    state is LoginLoading ? CircularProgressIndicator() : null,
              ),
            ],
          ),
        );
      },
    );
  }

  void _onWidgetDidBuild(Function callback) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      callback();
    });
  }

  _onLoginButtonPressed() {
    _loginBloc.add(LoginButtonPressed(
      username: _usernameController.text,
      password: _passwordController.text,
    ));
    Navigator.of(context)
        .pushNamed('/feed'); // This needs to be moved or conditionalized
  }
}
