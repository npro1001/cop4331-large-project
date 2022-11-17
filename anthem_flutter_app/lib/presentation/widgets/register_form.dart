import 'package:anthem_flutter_app/business_logic/login/login_bloc.dart';
import 'package:anthem_flutter_app/business_logic/register/register_bloc.dart';
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

class RegisterForm extends StatefulWidget {
  final RegisterBloc registerBloc;
  final UserAuthBloc userAuthBloc;

  RegisterForm({
    Key? key,
    required this.registerBloc,
    required this.userAuthBloc,
  }) : super(key: key);

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();

  RegisterBloc get _registerBloc => widget.registerBloc;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<RegisterBloc, RegisterState>(
      // loginbloc not loginevent
      bloc: _registerBloc,
      builder: (
        BuildContext context,
        RegisterState state,
      ) {
        if (state is RegisterFailure) {
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
                decoration: InputDecoration(labelText: 'name'),
                controller: _nameController,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'email'),
                controller: _emailController,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'username'),
                controller: _usernameController,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'password'),
                controller: _passwordController,
                obscureText: true,
              ),
              MaterialButton(
                onPressed:
                    state is! RegisterLoading ? _onRegisterButtonPressed : null,
                child: Text('Register'),
              ),
              Container(
                child: state is RegisterLoading
                    ? CircularProgressIndicator()
                    : null,
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

  _onRegisterButtonPressed() {
    _registerBloc.add(RegisterButtonPressed(
      name: _nameController.text,
      email: _emailController.text,
      username: _usernameController.text,
      password: _passwordController.text,
    ));
    Navigator.of(context)
        .pushNamed('/'); // This needs to be moved or conditionalized
  }
}
