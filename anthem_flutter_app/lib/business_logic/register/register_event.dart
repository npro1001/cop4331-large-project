part of 'register_bloc.dart';

@immutable
abstract class RegisterEvent extends Equatable {
  const RegisterEvent();
}

class RegisterButtonPressed extends RegisterEvent {
  final String name;
  final String email;
  final String username;
  final String password;

  const RegisterButtonPressed({
    required this.name,
    required this.email,
    required this.username,
    required this.password,
  });

  @override
  List<Object> get props => [name, email, username, password];

  @override
  String toString() =>
      'RegisterButtonPressed {name: $name, email: $email, username: $username, password: $password}';
}

// Field X was completed Event... do this. (idk)
