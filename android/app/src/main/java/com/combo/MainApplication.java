package com.combo;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.PushService;
import com.banli17.RNUpdateAppPackage;
import com.calendarevents.CalendarEventsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.combo.util.rnappmetadata.RNAppUtilPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.example.umenganaticlys.UmengAnalyticsPackage;
import com.facebook.react.ReactApplication;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.keychain.KeychainPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.AlipayPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.rnfs.RNFSPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.theweflex.react.WeChatPackage;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import androidx.multidex.MultiDexApplication;
import cn.reactnative.modules.qq.QQPackage;
import io.liaoyuan.reactnative.leancloudpush.LeanCloudPushPackage;

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
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new UmengAnalyticsPackage (),
                    new NetInfoPackage(),
                    new RNCViewPagerPackage(),
                    new AsyncStoragePackage(),
                    new FastImageViewPackage(),
                    new RNScreensPackage(),
                    new RNGestureHandlerPackage(),
                    new ReactNativeRestartPackage(),
                    new ReactNativeExceptionHandlerPackage(),
                    new RNAppUtilPackage(),
                    new CalendarEventsPackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
                    new RNI18nPackage(),
                    new AlipayPackage(),
                    new AutoGrowTextInputPackage(),
                    new LinearGradientPackage(),
                    new KeychainPackage(),
                    new RNFSPackage(),
                    new SplashScreenReactPackage(),
                    new QQPackage(),
                    new KeyboardInputPackage(MainApplication.this), // (this = Android application object)
                    new OrientationPackage(),
                    new BlurViewPackage(),
                    new WeChatPackage(),
                    new LeanCloudPushPackage(),
                    new ReactNativePushNotificationPackage(),
                    new VectorIconsPackage(),
                    new ImagePickerPackage(),
                    new ReactNativeDialogsPackage(),
                    new RNDeviceInfo(),
                    new RNUpdateAppPackage()
            );
        }
    };


    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // 初始化参数依次为 this, AppId, AppKey
        String packageName = this.getPackageName();
        PushService.setDefaultChannelId(this, packageName + "android.push");
        AVOSCloud.initialize(this, "cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz",
                "S6wxWnhQfL9rBLo2ngEctK0u");

        // 用于推送判断前后台
        ActivityLifecycleCallbacks();



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
