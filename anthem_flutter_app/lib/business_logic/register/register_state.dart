part of 'register_bloc.dart';

@immutable
abstract class RegisterState extends Equatable {
  const RegisterState();

  @override
  List<Object> get props => [];
}

// Initial state of the RegisterForm
class RegisterInitial extends RegisterState {}

// State of RegisterForm when validating credentials
class RegisterLoading extends RegisterState {}

// State of RegisterFrom when Register attempt has failed
class RegisterFailure extends RegisterState {
  final String error;
  const RegisterFailure({required this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => 'RegisterFailure {error: $error}';
}
