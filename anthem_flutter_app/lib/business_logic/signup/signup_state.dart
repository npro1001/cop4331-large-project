part of 'signup_bloc.dart';

@immutable
abstract class SignupState extends Equatable {
  const SignupState();

  @override
  List<Object> get props => [];
}

// Initial state of the SignupForm
class SignupInitial extends SignupState {}

// State of SignupForm when validating credentials
class SignupLoading extends SignupState {}

// State of SignupFrom when Signup attempt has failed
class SignupFailure extends SignupState {
  final String error;
  const SignupFailure({required this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'SignupFailure {error: $error}';
}
