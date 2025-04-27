import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Fernando'));
  });
  const isDark =
    useSelector((state: IRootState) => state.themeConfig.theme) === 'dark'
      ? true
      : false;
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl'
      ? true
      : false;

  return (
    <div>

    </div>
  );
};

export default Index;
