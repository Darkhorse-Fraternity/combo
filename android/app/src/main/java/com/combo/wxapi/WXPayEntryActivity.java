package com.combo.wxapi;

/**
 * Created by lintong on 2016/11/11.
 */

import android.app.Activity;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}