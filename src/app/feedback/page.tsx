import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
import { SlActionRedo } from 'react-icons/sl';
const Feedback = (): JSX.Element => {
  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link key="feedback" href="/feedback" className={styles.box}>
                <SlActionRedo />
          </Link>,
          <Link key="about" href="/about" className={styles.box}>
                <SlActionRedo />
          </Link>,
        ]}
      />
      <main>여기는 피드백입니다.</main>
    </>
  );
};

export default Feedback;
