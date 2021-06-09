import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// 追加する
import useOnScrollEnd from '~/utils/useOnScrollEnd';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  max-width: 720px;
  margin: auto;
  border-bottom: 1px solid #ccc;
`;

const SearchFormWrapper = styled.div`
  max-width: 720px;
  margin: auto;
`;

const VideosListWrapper = styled.div`
  max-width: 720px;
  margin: auto;
`;

const VideosListTemplate = ({
  headerContents,
  searchFormContents,
  videosListContents,
  onScrollEnd,
}) => {
  // 修正する
  useOnScrollEnd(onScrollEnd);
  return (
    <Root>
      <HeaderWrapper>
        {headerContents}
      </HeaderWrapper>
      <SearchFormWrapper>
        {searchFormContents}
      </SearchFormWrapper>
      <VideosListWrapper>
        {videosListContents}
      </VideosListWrapper>
    </Root>
  );
};

VideosListTemplate.propTypes = {
  headerContents: PropTypes.node,
  searchFormContents: PropTypes.node,
  videosListContents: PropTypes.node.isRequired,
  onScrollEnd: PropTypes.func,
};

VideosListTemplate.defaultProps = {
  headerContents: null,
  searchFormContents: null,
  onScrollEnd: null,
};

export default VideosListTemplate;