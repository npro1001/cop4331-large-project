// ignore_for_file: unnecessary_null_comparison

import 'dart:html';

import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meta/meta.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final UserRepository userRepo;
  final UserAuthBloc userAuthBloc;

  LoginBloc({
    required this.userRepo,
    required this.userAuthBloc,
  })  : assert(userRepo != null),
        assert(userAuthBloc != null),
        super(LoginInitial());

  @override
  LoginState get initialState => LoginInitial();

  @override
  Stream<LoginState> mapEventToState(
    LoginState currentState,
    LoginEvent event,
  ) async* {
    if (event is LoginButtonPressed) {
      yield LoginLoading();
      try {
        // To be implemented
        final token =
            await userRepo.authenticate(event.username, event.password);

        userAuthBloc.add(LoggedInEvent(token: token)); // add = dispatch
        yield LoginInitial();
      } catch (error) {
        yield LoginFailure(error: error.toString());
      }
    }
  }
}
