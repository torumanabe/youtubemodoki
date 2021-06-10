const express = require('express');
const { google } = require('googleapis');

/* 先ほど取得したAPIキーを設定する */
const YOUTUBE_API_KEY = 'AIzaSyBeSh376y-3j1g-5TmUFbm1QDRXT68Hq_o';

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});

const router = express.Router();

router.get('/videos/search/:keyword', (req, res, next) => {
  const { keyword } = req.params;
  const { pageToken } = req.query;
  (async () => {
    const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
      part: 'id',
      q: keyword,
      type: 'video',
      maxResults: 20,
      pageToken,
    });
    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(','),
    });
    res.json({ items, nextPageToken });
  })().catch(next);
});

router.get('/videos/:videoId', (req, res, next) => {
  const{ videoId } = req.params;
  (async() => {
  const{ data: {items} } = await youtube.videos.list({
  part:'statistics,snippet',
  id:videoId,
  });
res.json(items[0]);
})().cacth(next);
});

router.get('/videos/:videoId/related',(req, res, next) => {
  const { videoId:relatedToVideoId } = req.params;
  const { pageToken } = req.query;
  (async() => {
    const { data: {items: idItems, nextPageToken} } = await youtube.search.list({
      part:'id',
      relatesToVideoID,
      type:'video',
      maxResults:20,
      pageToken,
    });
    const ids = idItems.map({id:{ videoId }});
    const {data: {items} } = await youtube.videos.list({
      part:'statistics,snippet',
      id:ids.join(','),
    });
  res.json({items, nextPageToken});
  })().catch(next);
});
module.exports = router;