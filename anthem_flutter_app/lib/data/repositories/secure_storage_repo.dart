import '../dataproviders/secure_storage.dart';
import '../models/user_model.dart';

class SecureStorageRepo {
  final SecureStorage storage = SecureStorage();

  Future<String?> getUserToken() async {
    return await storage.getToken();
    // ...
  }
}
