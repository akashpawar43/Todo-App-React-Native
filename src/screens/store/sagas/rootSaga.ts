import { all } from "redux-saga/effects";
import { todoSaga } from "./todoSagas/todoSaga";

export function* rootSaga() {
    yield all([
        todoSaga(),
    ])
}