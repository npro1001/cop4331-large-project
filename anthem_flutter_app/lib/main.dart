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
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //   //! This will goes somewhere linked to a Bloc
  final UserRepository userRepo = UserRepository();

  final AppRouter _appRouter = AppRouter();

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UserAuthBloc>(create: (BuildContext context) {
          return UserAuthBloc(userRepo: userRepo);
        }),
        // BlocProvider<SomeGlobalBloc2>(create: (BuildContext context) {
        //   return SomeGlobalBloc2();
        // }),
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
}
