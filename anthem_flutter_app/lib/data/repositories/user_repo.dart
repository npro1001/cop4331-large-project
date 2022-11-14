import '../dataproviders/secure_storage.dart';
import '../models/user_model.dart';

class UserRepository {
  final SecureStorage storage = SecureStorage();
  // HTTP CLIENT TO TALK TO API

  Future<String?> getUserToken() async {
    return await storage.getToken();
  }

  Future persistToken(String token) async {
    await storage.setToken(token);
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
}
