import 'package:anthem_flutter_app/business_logic/login/login_bloc.dart';
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:anthem_flutter_app/presentation/router/app_router.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'business_logic/user_auth/user_auth_bloc.dart';
import 'data/dataproviders/secure_storage.dart';

void main() async {
  runApp(App(userRepo: UserRepository()));
}

class App extends StatefulWidget {
  final UserRepository userRepo;
  // final AppRouter _appRouter = AppRouter();

  App({Key? key, required this.userRepo}) : super(key: key);

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  // UserAuthBloc userAuthBloc;
  UserRepository get userRepo => widget.userRepo;

  final AppRouter _appRouter = AppRouter(userRepo: UserRepository());

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UserAuthBloc>(create: (BuildContext context) {
          return UserAuthBloc(userRepo: userRepo);
        }),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        onGenerateRoute: _appRouter.onGenerateRoute,
      ),
    );
  }

  // @override
  // void initState() {
  //   userAuthBloc = UserAuthBloc(userRepo: userRepo);
  //   userAuthBloc.close(AppStarted());
  //   super.initState();
  // }

  // @override
  // void dispose() {
  //   _appRouter.dispose();
  //   super.dispose();
  // }
}
