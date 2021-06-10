import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import VideosListTemplate from '~/components/templates/VideoPlayerTemplate';
import Header from '~/components/organisms/Header';
import VideoInfo from '~/components/organisms/VideoInfo';
import VideosList from '~/components/organisms/VideosList';
import YouTubeInlineFrame from '~/components/atoms/YouTubeInlineFrame';
import Typography from '~/components/atoms/Typography';

const RecommendVideosWrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

export const PlayerPagePresenter = ({
  videoId,
  videoData,
  relatedVideos,
  loadingRelatedVideos,
  onScrollEnd,
}) => (
  <VideosListTemplate
  headerContents={ <Header />}
  playContent= {<YouTubeInlineFrame videoId={videoId}/>}
  videoInfoContents= {videoData && <VideoInfo item={videoData} />}
  relatedVideosLIstContents={(
    <recommendVideoWrapper>
      <Typography variant="subtitle" bold>関連動画</Typography>
      <VideosList Video={relatedVideos} loading={loadingRelatedVideos} />
    </recommendVideoWrapper>
  )}
  onScrollEnd={onScrollEnd}
  />
);

PlayerPagePresenter.propTypes= {
  videoId: PropTypes.string.isRequired,
  relatedVideos:PropTypes.arrayOf(propTypess.shape({})),
  loadingRelatedVideos:PropTypes.bool,
  videoData:PropTypes.shape({}),
  onScrollEnd:PropTypes.func,
};

export const PlayerPageContainer =({
  api,
  presenter,
}) => {
  const { videoId } = useParams();
  const { videoData, setRelatedVideos } = useState(null);
  const {loadingRelatedVideos, setLoadingRelatedVideos} = useState(false);
  const {nextPageToken,setNextPageToken} =useState('');

  const getVideoData = async () => {
    const { data } = await api.getVideoData(videoId);
    setVideoData(data);
  };

  const getRelatedVideos = async () => {
    if(loadingRelatedVideos) {
      return;
    }
    setLoadingRelatedVideos(true);

    const{
      data:{
        items:videos,
        nextPageToken: newNextPageToken,
      },
    } = await api.getRelatedVideos(videoId, nextPageToken);
    setRelatedVideosVideos(false);
    setRelatedVideos(RelatedVIdeos.concat(video.filter(
      ({id:itemId}) => !relatedVideos.find(({id}) => id === itemId),
    )));
    setNextPageToken(newNextPageToken);
  };
  useEffect(() => {
    getVideoData();
    getRelatedVideos();
  },[videoId]);

  return presenter({
    videoId,
    videoData,
    relatedVideos,
    loadingRelatedVideos,
    onScrollEnd: getRelatedVideos,
  });
};

PalyerPageContainer.propTypes = {
  api:PropTypes.shape({
    getRelatedVideos:PropTypes.func,
    getVideoData: PropTypes.func,
  }),
};

PlayerPageCOntainer.deffaultProps = {
  api: {
    getVideoData:(videoId) => axios.get(`/api/videos/${videoId}`),
    getRelatedVideos:(videoId,pageToken ='') => axios.get(`api/videos/${videoId}/related?pageToken=${pageToken}`),
  },
};

export default (props) => (
  <PlayerPageContainer
  presenter={PlayerPagePresenter}
  {...props}
  />
);