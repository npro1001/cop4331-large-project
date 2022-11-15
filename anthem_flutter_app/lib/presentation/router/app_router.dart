import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../screens/login_page.dart';
import '../screens/register_page.dart';

class AppRouter {
  // final someBloc _someBloc = SomeBloc();

  Route? onGenerateRoute(RouteSettings routeSettings) {
    switch (routeSettings.name) {
      case '/register':
        return MaterialPageRoute(builder: (_) => RegisterPage());
      case '/login':
        return MaterialPageRoute(builder: (_) => LoginPage());
      // case '/':
      //   return MaterialPageRoute(
      //       builder: (_) => HomeScreen(
      //             title: 'HomeScreen',
      //             color: Colors.blueAccent,
      //           ));
      default:
        return null;
    }
  }
}
