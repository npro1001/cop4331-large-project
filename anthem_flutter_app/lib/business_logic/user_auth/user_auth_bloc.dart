import 'package:bloc/bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meta/meta.dart';

part 'user_auth_event.dart';
part 'user_auth_state.dart';

class UserAuthBloc extends Bloc<UserAuthEvent, UserAuthState> {
  // UserAuthBloc(super.initialState);
  @override
  UserAuthBloc get initialState => UserAuthBloc();

  // final SecureStorageRepo repository;

  Stream mapEventToState(event) async* {
    if (event is RegisterEvent) {
      yield AuthLoading('', event); //This aint right
      try {
        // Do Shit
      } catch (error) {
        yield AuthFailed("", error);
      }
    }
    if (event is LoginEvent) {
      yield AuthLoading('', event);
      try {
        // Do Shit
      } catch (error) {
        yield AuthFailed("", error);
      }
    }
  }
}
