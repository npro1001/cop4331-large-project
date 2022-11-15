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
        super(AuthAppStart());

  // @override
  // UserAuthState get initialState => AuthAppStart();

  @override
  Stream<UserAuthState> mapEventToState(
    UserAuthState currentState,
    UserAuthEvent event,
  ) async* {
    if (event is AppStartedEvent) {
      final bool hasToken = await userRepo.hasToken();
      if (hasToken) {
        yield AuthTrue();
      } else {
        yield AuthFalse();
      }
    }
    if (event is LoggedInEvent) {
      yield AuthLoading();
      // Do other logic for API
      await userRepo.persistToken(event.token);
      yield AuthTrue();
    }
    if (event is RegisteredEvent) {
      yield AuthLoading();
      // Do other logic for API
      await userRepo.persistToken(event.token);
      yield AuthTrue();
    }
    if (event is LoggedOutEvent) {
      yield AuthLoading();
      // Do other logic for API
      await userRepo.deleteToken();
      yield AuthFalse();
    }
  }
}
