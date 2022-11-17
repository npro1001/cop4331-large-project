import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:anthem_flutter_app/presentation/screens/home_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../screens/login_page.dart';
import '../screens/register_page.dart';

class AppRouter {
  // final someBloc _someBloc = SomeBloc();
  final UserRepository userRepo;

  AppRouter({required this.userRepo});

  Route? onGenerateRoute(RouteSettings routeSettings) {
    switch (routeSettings.name) {
      case '/register':
        return MaterialPageRoute(builder: (_) => RegisterPage(userRepo: userRepo));
      case '/login':
        return MaterialPageRoute(builder: (_) => LoginPage(userRepo: userRepo));
      case '/':
        return MaterialPageRoute(builder: (_) => HomePage());
      default:
        return null;
    }
  }
}
