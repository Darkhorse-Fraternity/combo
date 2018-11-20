
package com.combo.util.rnappmetadata;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class RNAppUtilModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private String packageName = null;

    public RNAppUtilModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        packageName = reactContext.getPackageName();
    }

    @Override
    public String getName() {
        return "RNAppUtil";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
//        constants.put("Version", versionCode);
//        constants.put("ShortVersion", version);
//        constants.put("BundleIdentifier", packageName);
//        constants.put("BundleName", packageName);
        return constants;
    }

    @ReactMethod
    public void getAppMetadataBy(String key, Promise promise) {
        PackageManager pm = this.reactContext.getPackageManager();
        String value = null;
        try {
            ApplicationInfo pInfo = pm.getApplicationInfo(this.packageName, PackageManager.GET_META_DATA);
            value = pInfo.metaData.getString(key);
            promise.resolve(value);
        } catch (PackageManager.NameNotFoundException e) {
            //e.printStackTrace();
            Log.e("[RNAppMetadata]", " name not found");
            promise.resolve(e);
        }
    }
}
