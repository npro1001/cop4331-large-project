// ignore_for_file: public_member_api_docs, sort_constructors_first
part of 'user_auth_bloc.dart';

@immutable
abstract class UserAuthState extends Equatable {
  // String token;
  // const UserAuthState(String token, Object error);
  @override
  List<Object> get props => [];
}

// Waiting to persist or delete a token
class AuthLoading extends UserAuthState {
  // const AuthLoading(super.token, super.error);
}

// Waiting to see if user is authenticated/not upon app start
class AuthAppStart extends UserAuthState {
  // const AuthUninitialized(super.token, super.error);
}

// Successfully authenticated
class AuthTrue extends UserAuthState {
  User user;
  AuthTrue({required this.user});
  // const AuthTrue(super.token, super.error);
}

// Not authenticated
class AuthFalse extends UserAuthState {
  // const AuthFailed(super.token, super.error);
}
