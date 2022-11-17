// ignore_for_file: unnecessary_null_comparison
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/models/user_model.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meta/meta.dart';

part 'register_event.dart';
part 'register_state.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final UserRepository userRepo;
  final UserAuthBloc userAuthBloc;

  RegisterBloc({
    required this.userRepo,
    required this.userAuthBloc,
  })  : assert(userRepo != null),
        assert(userAuthBloc != null),
        super(RegisterInitial()) {
    on<RegisterButtonPressed>(_onRegisterButtonPressed);
  }

  void _onRegisterButtonPressed(
    RegisterButtonPressed event,
    Emitter<RegisterState> emit,
  ) async {
    emit(RegisterLoading());
    try {
      // final User user =
      //     await userRepo.authenticate(event.username, event.password);
      userAuthBloc.add(RegisteredEvent(
          name: event.name,
          email: event.email,
          username: event.username,
          password: event.password)); // add = dispatch
      emit(RegisterInitial());
      // Navigator.of(context).pushNamed('/');

    } catch (error) {
      emit(RegisterFailure(error: error.toString()));
    }
  }

  @override
  RegisterState get initialState => RegisterInitial();
}
