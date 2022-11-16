part of 'register_bloc.dart';

@immutable
abstract class RegisterEvent extends Equatable {
  const RegisterEvent();
}

class RegisterButtonPressed extends RegisterEvent {
  final String username;
  final String password;

  const RegisterButtonPressed({
    required this.username,
    required this.password,
  });

  @override
  List<Object> get props => [username, password];

  @override
  String toString() =>
      'RegisterButtonPressed {username: $username, password: $password}';
}

// Field X was completed Event... do this. (idk)
