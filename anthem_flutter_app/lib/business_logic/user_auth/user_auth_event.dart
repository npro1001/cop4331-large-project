part of 'user_auth_bloc.dart';

@immutable
abstract class UserAuthEvent extends Equatable {
  const UserAuthEvent([List props = const []]); // super(props);
}

// Dispatched when app first loads - notifies bloc that it needs
// to determine whether or not there is an existing user
class AppStartedEvent extends UserAuthEvent {
  @override
  String toString() => 'AppStarted';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

// Dispatched on successfuly login
class LoggedInEvent extends UserAuthEvent {
  // final User user;
  final String username;
  final String password;
  LoggedInEvent({required this.username, required this.password})
      : super([username, password]);

  @override
  String toString() =>
      'LoggedInEvent {Username: $username , Password: $password}';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

// Dispatched on successful logout
class LoggedOutEvent extends UserAuthEvent {
  @override
  String toString() => 'LoggedOutEvent';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

// Dispatched on successful register
class RegisteredEvent extends UserAuthEvent {
  final String token;
  RegisteredEvent({required this.token}) : super([token]);

  @override
  String toString() => 'RegisteredEvent {token: $token}';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
