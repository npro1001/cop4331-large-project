import 'package:anthem_flutter_app/data/models/user_model.dart';
import 'package:anthem_flutter_app/data/repositories/user_repo.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meta/meta.dart';

part 'user_auth_event.dart';
part 'user_auth_state.dart';

class UserAuthBloc extends Bloc<UserAuthEvent, UserAuthState> {
  final UserRepository userRepo;

  UserAuthBloc({required this.userRepo})
      : assert(userRepo != null),
        super(AuthAppStart()) {
    on<AppStartedEvent>(_onAppStartedEvent);
    on<RegisteredEvent>(_onRegisteredEvent);
    on<LoggedOutEvent>(_onLoggedOutEvent);
    on<LoggedInEvent>(_onLoggedInEvent);
  }

  void _onAppStartedEvent(
    AppStartedEvent event,
    Emitter<UserAuthState> emit,
  ) async {
    final bool hasToken = await userRepo.hasToken();
    if (hasToken) {
      User user = await userRepo.getUser();
      emit(AuthTrue(user: user));
    } else {
      emit(AuthFalse());
    }
  }

  void _onLoggedInEvent(
    LoggedInEvent event,
    Emitter<UserAuthState> emit,
  ) async {
    emit(AuthLoading());
    // Do other logic for API
    User user = await userRepo.authenticate(event.username, event.password);
    await userRepo.persistToken(user.token);
    emit(AuthTrue(user: user));
  }

  void _onLoggedOutEvent(
    LoggedOutEvent event,
    Emitter<UserAuthState> emit,
  ) async {
    emit(AuthLoading());
    // Do other logic for API
    await userRepo.deleteToken();
    emit(AuthFalse());
  }

  void _onRegisteredEvent(
    RegisteredEvent event,
    Emitter<UserAuthState> emit,
  ) async {
    //! Need to be fixed
    emit(AuthFalse());
  }
}

  // @override
  // UserAuthState get initialState => AuthAppStart();


