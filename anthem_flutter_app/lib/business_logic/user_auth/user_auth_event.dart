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
class LoginEvent extends UserAuthEvent {
  final String token;
  LoginEvent({required this.token}) : super([token]);

  @override
  String toString() => 'LoginEvent {token: $token}';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

// Dispatched on successful logout
class LogoutEvent extends UserAuthEvent {
  @override
  String toString() => 'LogoutEvent';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

// Dispatched on successful register
class RegisterEvent extends UserAuthEvent {
  final String token;
  RegisterEvent({required this.token}) : super([token]);

  @override
  String toString() => 'RegisterEvent {token: $token}';

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
