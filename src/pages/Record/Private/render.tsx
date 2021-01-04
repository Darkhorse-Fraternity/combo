/*
 * @Author: tonyYo
 * @Date: 2020-12-24 11:21:53
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-04 13:47:32
 * @FilePath: /Combo/src/pages/Record/Private/render.tsx
 */

import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { Privacy } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
import { StykedContent, StyledText } from './style';
// import Dialog from '@components/Dialog';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { ButtonOpacity } from '@components/Button';
import { putClassesIUseId } from 'src/hooks/interface';
import PrivatePickerModal from '@components/modal/private-picker-modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

// const pickPrivacy = async (privacy: number, isSelf: boolean) => {
//   const items = isSelf
//     ? [
//         { label: '不对外开放', id: '0' },
//         { label: '对外开放', id: '2' },
//       ]
//     : [
//         { label: '不对外开放', id: '0' },
//         { label: '仅对卡片拥有者开放', id: '1' },
//         { label: '对外开放', id: '2' },
//       ];

//   const selectedId = privacy === 1 && isSelf ? 0 : privacy;

//   return Dialog.showPicker('隐私设置', null, {
//     negativeText: '取消',
//     type: Dialog.listRadio,
//     selectedId: `${selectedId}`,
//     items,
//   });
// };

export const Private: FC<{}> = () => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.recordPrivate>();
  const { data: iUse } = useGetIuseData(iUseId);
  const iCard = iUse?.iCard;
  const { update } = useMutateIuseData();
  const { user } = useGetInfoOfMe();
  const text =
    iUse?.privacy === Privacy.openToCoach
      ? '只对你和该习惯管理者展示'
      : '对除你之外的所有人隐藏';

  const userId = user!.objectId;
  const beUserId = iCard?.user.objectId;
  const isSelf = userId === beUserId;
  const selectedId = iUse?.privacy === 1 && isSelf ? 0 : iUse?.privacy;
  const [selectId, setselectId] = useState(selectedId + '');
  useEffect(() => {
    setselectId(selectedId + '');
  }, [selectedId]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const items = isSelf
    ? [
        { label: '不对外开放', id: '0' },
        { label: '对外开放', id: '2' },
      ]
    : [
        { label: '不对外开放', id: '0' },
        { label: '仅对卡片拥有者开放', id: '1' },
        { label: '对外开放', id: '2' },
      ];

  // const onPress = async () => {
  //   // const userId = user!.objectId;
  //   // const beUserId = iCard?.user.objectId;
  //   // const isSelf = userId === beUserId;
  //   const { selectedItem } = await pickPrivacy(iUse?.privacy || 0, isSelf);

  //   if (selectedItem) {
  //     const { id } = selectedItem;
  //     // iUse.privacy !== Number(id) &&
  //     //   updatePrivacy(iUse, Number(id));
  //     if (iUse?.privacy !== Number(id)) {
  //       const { objectId } = await putClassesIUseId({
  //         id: iUse?.objectId || '0',
  //         privacy: Number(id),
  //       });
  //       if (objectId) {
  //         update({ objectId, privacy: Number(id) });
  //       }
  //     }
  //   }
  // };

  return (
    <StykedContent>
      <StyledText>• 该打卡{text}。</StyledText>
      <ButtonOpacity onPress={handlePresentModalPress}>
        <StyledText color="#548afc">• 点击修改隐私规则</StyledText>
      </ButtonOpacity>
      <PrivatePickerModal
        ref={bottomSheetModalRef}
        items={items}
        selectId={selectId}
        onChange={async (id) => {
          // setselectId(id);
          bottomSheetModalRef.current?.close();
          if (iUse?.privacy !== Number(id)) {
            const { objectId } = await putClassesIUseId({
              id: iUse?.objectId || '',
              privacy: Number(id),
            });
            if (objectId) {
              update({ objectId, privacy: Number(id) });
            }
          }
        }}
      />
    </StykedContent>
  );
};

export default Private;
