import React from 'react';
import { VideoInfoPresenter as VideoInfo } from '.';

export default {title: 'organisms/VideoInfo'};

const props = {
  title:'猫と学ぶ宇宙のこと１００',
  description:'動画説明サンプルです。動画説明サンプルです。動画説明サンプルです。\n'.repeat(10),
  publishedAt:'2021/06/08',
  viewCount:'10000',
};

export const videoInfo = () => <VideoInfo {...props} />;