/**
 * Created by lintong on 2017/2/25.
 * @flow
 */
'use strict';

import React from 'react';
import topView from 'rn-topview';
import PopContainer from './PopContainer';
import store from '../../redux/store'
import { Platform, StatusBar } from 'react-native'

let popupInstance;
let mContent;
export default {
    show(content, {
        animationType = 'fade',
        maskClosable = true,
        wrapStyle = {},
        maskStyle,
        onMaskClose = () => {
        },
    } = {}) {
        if (!content && mContent === content) return
         Platform.OS !== 'ios' && StatusBar.setBackgroundColor('rgb(130,130,130)', true);

        mContent = content
        topView.set(
            <PopContainer
                maskStyle={maskStyle}
                store={store}
                ref={i => popupInstance = i}
                animationType={animationType}
                maskClosable={maskClosable}
                onMaskClose={() => {
                     Platform.OS !== 'ios' && StatusBar.setBackgroundColor('white', true);
                    onMaskClose()
                }}
                wrapStyle={wrapStyle}
                onAnimationEnd={visible => {
                    if (!visible) {
                        topView.remove();
                    }
                }}
                visible
            >
                {content}
            </PopContainer>,
        );
    },
    hide() {
        if (popupInstance) {
            Platform.OS !== 'ios' && StatusBar.setBackgroundColor('white', true);
            popupInstance.hide();
            mContent = null;
        }
    },
};