package com.zulipmobile.notifications;

import android.os.Bundle;
import com.facebook.react.bridge.*;

public class NotificationsModule extends ReactContextBaseJavaModule {

    static Bundle initialNotification = null;

    /** TODO store this in a more reasonable way. */
    static ReactContext reactContext = null;

    NotificationsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        NotificationsModule.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Notifications";
    }

    @ReactMethod
    public void getInitialNotification(Promise promise) {
        if (null == initialNotification) {
            promise.resolve(null);
        } else {
            promise.resolve(Arguments.fromBundle(initialNotification));
        }
    }
}
