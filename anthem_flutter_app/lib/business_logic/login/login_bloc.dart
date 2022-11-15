// ignore_for_file: unnecessary_null_comparison
import 'package:anthem_flutter_app/business_logic/user_auth/user_auth_bloc.dart';
import 'package:anthem_flutter_app/data/models/user_model.dart';
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
        super(LoginInitial()) {
    on<LoginButtonPressed>(_onLoginButtonPressed);
  }

  void _onLoginButtonPressed(
    LoginButtonPressed event,
    Emitter<LoginState> emit,
  ) async {
    emit(LoginLoading());
    try {
      // To be implemented
      final User user =
          await userRepo.authenticate(event.username, event.password);
      userAuthBloc.add(LoggedInEvent(user: user)); // add = dispatch
      emit(LoginInitial());
    } catch (error) {
      emit(LoginFailure(error: error.toString()));
    }
  }

  @override
  LoginState get initialState => LoginInitial();
}
