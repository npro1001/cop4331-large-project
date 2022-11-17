import '../dataproviders/secure_storage.dart';
import '../models/user_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class UserRepository {
  final SecureStorage storage = SecureStorage();
  // HTTP CLIENT TO TALK TO API

  //! Local storage shit
  Future<String?> getUserToken() async {
    return await storage.getToken();
  }

  Future persistToken(String token) async {
    await storage.setToken(token);
  }

  Future deleteToken() async {
    await storage.deleteToken();
  }

  Future<bool> hasToken() async {
    String? token = null;
    token = await storage.getToken();
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  Future<User> getUser() async {
    String? userJson = null;
    userJson = await storage.getUser();
    User user = User.deserialize(userJson!); //! ! is not-null force
    return user;
  }

  //! API shit
  // Future authenticate(String username, String password) async {
  //   // talk to express
  // }

  Future<User> authenticate(String username, String password) async {
    final response = await http.post(
        Uri.parse('https://anthem-cop4331.herokuapp.com/api/users/login'),
        headers: <String, String>{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: <String, String>{
          'username': username,
          'password': password,
        });

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      print("Request sent and 200 response");
      print("asdasdasd");
      User user = User.fromJson(jsonDecode(response.body));
      print(user.username);
      persistToken(user.token);
      return user;
    } else {
      print("Request failed");

      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load user');
    }
  }

  Future<User> register(
      String name, String email, String username, String password) async {
    final response = await http.post(
        Uri.parse('https://anthem-cop4331.herokuapp.com/api/users/'),
        headers: <String, String>{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: <String, String>{
          'name': name,
          'email': email,
          'username': username,
          'password': password,
        });

    if (response.statusCode == 201) {
      User user = User.fromJson(jsonDecode(response.body));
      print("Request sent and 201 response");
      print("asdasdasd");
      print(user.username);
      final confirm = await http.post(
          Uri.parse('https://anthem-cop4331.herokuapp.com/api/users/confirm'),
          headers: <String, String>{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: <String, String>{
            'email': user.email,
          });

      if (confirm.statusCode == 201) {
        return user;
      } else {
        print("email verification request failed");
        throw Exception("Failed to send email");
      }

      // If the server did return a 201 OK response,
      // then parse the JSON.
    } else {
      print("Register request failed");

      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load user');
    }
  }
}
