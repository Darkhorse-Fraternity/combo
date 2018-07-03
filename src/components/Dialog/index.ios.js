/* @flow */
'use strict';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    PickerIOS,
    Dimensions,
    ActionSheetIOS
} from 'react-native'
import Pop from '../Pop'


function processColors(nativeConfig: {}) {
    for (const prop of Object.keys(nativeConfig)) {
        if (prop.endsWith('Color')) {
            nativeConfig[prop] = processColor(nativeConfig[prop]);
        }
    }
}

export default class DialogIOS {

    static listPlain = 'listPlain'
    static listRadio = 'listRadio'
    static listCheckbox = 'listCheckbox'
    static actionDismiss = 'actionDismiss'
    static actionNegative = 'actionNegative'
    static actionNeutral = 'actionNeutral'
    static actionPositive = 'actionPositive'
    static actionSelect = 'actionSelect'
    static progressHorizontal = 'progressHorizontal'


    static defaults = {
        positiveText: '完成'
    }

    static dismiss(): void {
        Pop.hide();
    }

    static assignDefaults(defaults: { title?: Title, content?: Content, ...Options }): void {
        Object.assign(DialogIOS.defaults, defaults);
    }

    static showPicker(title: Title, content: Content, options: OptionsPicker): Promise {
        return new Promise((resolve, reject) => {
            const {
                idKey = 'id',
                items,
                labelKey = 'label',
                type,
                neutralIsClear,
                selectedId,
                selectedIds,
                ...filteredOptions
            } = options;

            const nativeConfig: NativeConfig = {
                ...DialogIOS.defaults,
                ...filteredOptions,
                onAny: true,
                dismissListener: true
            };
            if (title) nativeConfig.title = title;
            if (content) nativeConfig.content = content;

            if (items) {
                nativeConfig.items = items.map(item => item[labelKey]);
                switch (type) {
                    case DialogIOS.listCheckbox: {
                        nativeConfig.itemsCallbackMultiChoice = true;
                        if (selectedIds) {
                            nativeConfig.selectedIndices = selectedIds.map(id => items.findIndex(item => item[idKey] === id));
                        }
                        break;
                    }
                    case DialogIOS.listRadio: {
                        nativeConfig.itemsCallbackSingleChoice = true;
                        if (selectedId !== undefined) {
                            nativeConfig.selectedIndex = items.findIndex(item => item[idKey] === selectedId);
                        }
                        break;
                    }
                    default:
                        nativeConfig.itemsCallback = true;
                }
            }

            if (neutralIsClear) nativeConfig.multiChoiceClearButton = true;

            processColors(nativeConfig);

            show(nativeConfig, (kind: string, ...rest) => {
                switch (kind) {
                    case 'error': {
                        const [error, nativeConfig] = rest;
                        return reject(`DialogIOS ${error}. nativeConfig: ${nativeConfig}`);
                    }
                    case 'itemsCallbackMultiChoice': {
                        const [selectedIndicesString, checked] = rest; // blank string when nothing selected
                        const selectedItems = selectedIndicesString === '' ? [] : selectedIndicesString.split(',').map(index => items[index]);

                        return resolve({
                            action: DialogIOS.actionPositive,
                            selectedItems, ...getChecked(nativeConfig, checked)
                        });
                    }
                    case 'itemsCallback':
                    case 'itemsCallbackSingleChoice': {
                        const [selectedIndex, checked] = rest;
                        const selectedItem = items[selectedIndex];
                        return resolve({
                            action: DialogIOS.actionSelect,
                            selectedItem, ...getChecked(nativeConfig, checked)
                        });
                    }
                    case 'onAny': {
                        const [dialogAction, checked] = rest;
                        switch (dialogAction) {
                            case 0:
                                return resolve({ action: DialogIOS.actionPositive, ...getChecked(nativeConfig, checked) });
                            case 1:
                                return resolve({ action: DialogIOS.actionNeutral, ...getChecked(nativeConfig, checked) });
                            case 2:
                                return resolve({ action: DialogIOS.actionNegative, ...getChecked(nativeConfig, checked) });
                        }
                    }
                    case 'dismissListener': {
                        return resolve({ action: DialogIOS.actionDismiss });
                    }
                    default: {
                        return reject(`Unknown callback kind: "${kind}"`);
                    }
                }
            })


        })
    }


}

function getChecked(nativeConfig, checked) {
    return nativeConfig.checkboxLabel ? { checked } : {};
}


const show = (nativeConfig, callback) => {
    const { type, items } = nativeConfig
    // console.log('nativeConfig:', nativeConfig);
    switch (type) {
        case DialogIOS.listCheckbox: {

            break;
        }
        case DialogIOS.listRadio: {

            break;
        }
        default:
            showActionSheetWithOptions(items, (index) => {
                callback('itemsCallback', index, false)
            })
            break;
    }
}


function showActionSheetWithOptions(items: Array<string>,
                                    callBack: Function) {

    const BUTTONS = items.concat('取消')
    ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        // title: '标题',
        cancelButtonIndex: BUTTONS.length - 1,
        //message:'',
    }, (index) => index !== BUTTONS.length - 1 && callBack(index));


}

