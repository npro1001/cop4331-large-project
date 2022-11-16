// ignore_for_file: unnecessary_null_comparison
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/models/user_model.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meta/meta.dart';

part 'signup_event.dart';
part 'signup_state.dart';

class SignupBloc extends Bloc<SignupEvent, SignupState> {
  final UserRepository userRepo;
  final UserAuthBloc userAuthBloc;

  SignupBloc({
    required this.userRepo,
    required this.userAuthBloc,
  })  : assert(userRepo != null),
        assert(userAuthBloc != null),
        super(SignupInitial()) {
    on<SignupButtonPressed>(_onSignupButtonPressed);
  }

  void _onSignupButtonPressed(
    SignupButtonPressed event,
    Emitter<SignupState> emit,
  ) async {
    emit(SignupLoading());
    try {
      // final User user =
      //     await userRepo.authenticate(event.username, event.password);
      userAuthBloc.add(SignedInEvent(
          username: event.username,
          password: event.password)); // add = dispatch
      emit(SignupInitial());
      // Navigator.of(context).pushNamed('/');

    } catch (error) {
      emit(SignupFailure(error: error.toString()));
    }
  }

  @override
  SignupState get initialState => SignupInitial();
}
