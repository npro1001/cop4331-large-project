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
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: LoginForm(
        userAuthBloc: _userAuthBloc,
        loginBloc: _loginBloc,
      ),
    );
  }

  @override
  void dispose() {
    _loginBloc.close();
    super.dispose();
  }
}
