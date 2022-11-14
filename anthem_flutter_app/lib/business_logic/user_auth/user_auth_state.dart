// ignore_for_file: public_member_api_docs, sort_constructors_first
part of 'user_auth_bloc.dart';

@immutable
abstract class UserAuthState {
  // String token;
  const UserAuthState(String token, Object error);
}

class AuthLoading extends UserAuthState {
  const AuthLoading(super.token, super.error);
}

class AuthTrue extends UserAuthState {
  const AuthTrue(super.token, super.error);
}

class AuthFailed extends UserAuthState {
  const AuthFailed(super.token, super.error);
}

// class UserAuthInitial extends UserAuthState {}


// final bool isLoading;
//   final bool isAuthorized;
//   final bool isFailed;

//   UserAuthState(this.isLoading, this.isAuthorized, this.isFailed);

//   @override
//   List<Object> get props => [isLoading, isAuthorized, isFailed];