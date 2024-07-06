import { all } from "redux-saga/effects";
import { APISaga } from "./detailAPI";
import { totalAPI } from "./totalAPI";
import { deleteAPI } from "./deleteAPI";
import { updateAPI } from "./updateAPI";
import { uploadAPI } from "./uploadAPI";
import { saveAPI } from "./saveAPI";

export default function* rootSaga() {
    yield all([
        ...APISaga,
        ...totalAPI,
        ...deleteAPI,
        ...updateAPI,
        ...uploadAPI,
        ...saveAPI
    ]);
}
