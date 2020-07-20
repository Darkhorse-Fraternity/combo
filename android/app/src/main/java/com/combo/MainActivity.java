package com.combo;

import android.content.Intent;
import android.os.Bundle;

import com.calendarevents.CalendarEventsPackage;
import com.combo.util.LightStatusBarUtil;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.ineva.gdt.SplashActivity;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.umeng.analytics.MobclickAgent;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
       if (!BuildConfig.DEBUG) {
//            SplashScreen.show(this, true);
       }
//        super.onCreate(savedInstanceState);
        LightStatusBarUtil.setTranslucent(this);
        LightStatusBarUtil.setStatusTextColor(true,this);
        startActivity(getSplashActivityIntent());
//        initView();
    }

    private Intent getSplashActivityIntent() {
        Intent intent = new Intent(MainActivity.this, SplashActivity.class);
        intent.putExtra("pos_id", "9021211577543167");
//        intent.putExtra("need_logo", needLogo());
        intent.putExtra("need_start_demo_list", false);
//        intent.putExtra("custom_skip_btn", customSkipBtn());
        return intent;
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Combo";
    }


    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }



    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
//    private void initView() {
//        mPopupWindowView = getLayoutInflater().inflate(R.layout.launch_screen, null, false);
//        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
//                FrameLayout.LayoutParams.MATCH_PARENT,
//                FrameLayout.LayoutParams.MATCH_PARENT);
//        // 设置view出现的位置(悬浮于顶部)
//        params.topMargin = 0;
//        params.gravity = Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL;
//        addContentView(mPopupWindowView, params);
//        new Handler().postDelayed(new Runnable() {  //设置3秒消失
//            @Override
//            public void run() {
//                mPopupWindowView.setVisibility(View.GONE);
//            }
//        }, 3000);
//    }
    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

}
