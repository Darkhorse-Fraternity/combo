/* @flow */
'use strict';

import DialogAndroid from 'react-native-dialogs';

export function showSelector(items:Array<string>,callBack:Function,title:string =''){

    const data =   {
        items,
        title,
        itemsCallback: callBack,
        negativeText: "取消",
    }
    // const DialogAndroid = require('react-native-dialogs')
    const dialog = new DialogAndroid();
    dialog.set(data);
    dialog.show();
}
