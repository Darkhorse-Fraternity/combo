package com.combo;
//import com.facebook.react.BuildConfig;
import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.PushService;

import com.combo.util.rnappmetadata.RNAppUtilPackage;
import java.lang.reflect.InvocationTargetException;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.microsoft.codepush.react.CodePush;

import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;

import com.facebook.react.PackageList;
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;

import java.util.List;

import androidx.multidex.MultiDexApplication;


public class MainApplication extends MultiDexApplication implements ReactApplication {
    private Intent mIntent;
    public int count = 0;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }


        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add( new RNAppUtilPackage());
            packages.add(new KeyboardInputPackage(getThis()));
            return packages;
        }
    };


    private MainApplication getThis() {
        return this;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this); // Remove this line if you don't want Flipper enabled
        // 初始化参数依次为 this, AppId, AppKey
        String packageName = this.getPackageName();
        PushService.setDefaultChannelId(this, packageName + "android.push");
        AVOSCloud.initialize(this, "cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz",
                "S6wxWnhQfL9rBLo2ngEctK0u");

        // 用于推送判断前后台
//        ActivityLifecycleCallbacks();



        try {
            PackageManager pm = this.getPackageManager();
            ApplicationInfo pInfo = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
            String channelId = pInfo.metaData.getString("TD_CHANNEL_ID");
            UMConfigure.init(this, "5cfe130c570df3f63b0012bc", channelId, UMConfigure.DEVICE_TYPE_PHONE, null);
            MobclickAgent.openActivityDurationTrack(false);
        } catch (PackageManager.NameNotFoundException e) {
            Log.e("[RNAppMetadata]", " name not found");
        }


//        UMConfigure.init(this, '', '', UMConfigure.DEVICE_TYPE_PHONE, null);
//        MobclickAgent.openActivityDurationTrack(false);
    }

    private static void initializeFlipper(Context context) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    private void ActivityLifecycleCallbacks() {
        mIntent = new Intent();
        mIntent.setAction("com.action.isForeground");
        registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle bundle) {
            }

            @Override
            public void onActivityStarted(Activity activity) {
                Log.v("viclee", activity + "onActivityStarted");
                if (count == 0) {
                    Log.e("viclee", ">>>>>>>>>>>>>>>>>>>切到前台  lifecycle");
                    mIntent.putExtra("isForeground", true);
                    mIntent.putExtra("icon", R.mipmap.ic_launcher);
                    sendBroadcast(mIntent);
                }
                count++;
            }

            @Override
            public void onActivityResumed(Activity activity) {
            }

            @Override
            public void onActivityPaused(Activity activity) {
            }

            @Override
            public void onActivityStopped(Activity activity) {
                count--;
                if (count == 0) {
                    Log.e("viclee", ">>>>>>>>>>>>>>>>>>>切到后台  lifecycle");
                    mIntent.putExtra("isForeground", false);
                    sendBroadcast(mIntent);
                }
            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {
            }

            @Override
            public void onActivityDestroyed(Activity activity) {
            }
        });
    }

};
