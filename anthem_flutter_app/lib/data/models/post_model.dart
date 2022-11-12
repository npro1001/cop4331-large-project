class Post {
  String author;
  String caption;
  String picture;
  List<dynamic> likes;
  List<dynamic> comments;
  DateTime createdAt;

  Post(
      {required this.author,
      required this.caption,
      required this.picture,
      required this.likes,
      required this.comments,
      required this.createdAt});
}
