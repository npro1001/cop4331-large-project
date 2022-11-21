import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'storage_event.dart';
part 'storage_state.dart';

class StorageBloc extends Bloc<StorageEvent, StorageState> {
  StorageBloc() : super(StorageInitial()) {
    on<StorageEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
