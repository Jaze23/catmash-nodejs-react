import { Action } from "../../../interfaces";
import { GlobalHelper } from "../../../models/global-helper.model";

export function globalHelperReducer(globalHelper: GlobalHelper, action: Action<GlobalHelper>): GlobalHelper {
    switch (action.type) {
        case "SHOW_SPINNER":
            return { ...action.payload, showSpinner: true };
        case "HIDE_SPINNER":
            return { ...action.payload, showSpinner: false };
        default:
            return globalHelper;
    }
}
