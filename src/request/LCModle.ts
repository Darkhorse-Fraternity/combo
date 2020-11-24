export function point(className: string, objectId: string) {
  return {
    __type: 'Pointer',
    className: className,
    objectId: objectId,
  };
}

export function pointModel(name: string, objectId: string, className?: string) {
  return {
    [name]: point(className || name, objectId),
  };
}

export function selfUser() {
  return (dispatch) =>
    dispatch((dispatch, getState) => {
      const id = getState().user.data.objectId;
      return user(id);
    });
}

export function userPoint(objectId: string) {
  return point('_User', objectId);
}

export function iCardPoint(id: string) {
  return point('iCard', id);
}

export function iUsePoint(id: string) {
  return point('iUse', id);
}

export function iDoPoint(id: string) {
  return point('iDo', id);
}

export function FlagPoint(id: string) {
  return point('Flag', id);
}

export function FlagRecordPoint(id: string) {
  return pointModel('FlagRecord', id);
}

export function ISODate(iso: string) {
  return {
    __type: 'Date',
    iso,
  };
}
