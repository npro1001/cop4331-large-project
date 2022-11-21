part of 'login_bloc.dart';

@immutable
abstract class LoginState extends Equatable {
  const LoginState();

  @override
  List<Object> get props => [];
}

// Initial state of the LoginForm
class LoginInitial extends LoginState {}

// State of LoginForm when validating credentials
class LoginLoading extends LoginState {}

// State of LoginFrom when login attempt has failed
class LoginFailure extends LoginState {
  final String error;
  const LoginFailure({required this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'LoginFailure {error: $error}';
}
