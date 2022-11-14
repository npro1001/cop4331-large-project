part of 'user_auth_bloc.dart';

@immutable
abstract class UserAuthEvent {
  const UserAuthEvent();
}

class RegisterEvent extends UserAuthEvent {}

class LoginEvent extends UserAuthEvent {}
