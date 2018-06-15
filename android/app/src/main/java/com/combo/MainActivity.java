package com.combo;

import android.os.Bundle;
import android.view.View;

import com.combo.util.LightStatusBarUtil;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    private View mPopupWindowView;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Combo";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if(!BuildConfig.DEBUG){
            SplashScreen.show(this,true);
        }
        super.onCreate(savedInstanceState);
        LightStatusBarUtil.MIUISetStatusBarLightMode(this, true);

//        initView();
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

}
