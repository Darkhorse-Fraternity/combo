export const createPropsGetter = <DP extends object>(_: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;
    type RecomposeProps = DP & PropsExcludingDefaults;

    return (props as never) as RecomposeProps;
  };
};
