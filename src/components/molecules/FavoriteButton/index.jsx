import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FavoriteContext from '~/contexts/FavoriteContext';
import StarIcon from '~/components/atoms/StarIcon';
import Button from '~/components/atoms/Button';

export const FavoriteButtonPresenter = ({
  className,
  isFavorite,
  onClick,
}) => (
  <Button
    className={className}
    onClick={onClick}
    size="s"
  >
    <StarIcon on={isFavorite} />
    お気に入り
  </Button>
);

FavoriteButtonPresenter.propTyeps = {
  className: PropTypes.string,
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
};

FavoriteButtonPresenter.defaultProps = {
  className: '',
  isFavorite: false,
  onClick: null,
};

const FavoriteButtonContainer = ({
  className,
  videoId,
  api,
  presenter,
}) => {
  const { state: { ids: favoriteIds }, dispatch } = useContext(FavoriteContext);
  if (!favoriteIds) {
    return null;
  }
  const isFavorite = favoriteIds.indexOf(videoId) !== -1;

  const onClickHandler = (e) => {
    e.stopPropagation();
    api[isFavorite ? 'delete' : 'post'](videoId);
  };
  return presenter({
    className,
    isFavorite,
    onClick: onClickHandler,
  });
};

FavoriteButtonContainer.propTypes = {
  className: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  presenter: PropTypes.func.isrequired,
  api: PropTypes.shape({
    post: PropTypes.func,
    delete: PropTypes.func,
  }),
};

FavoriteButtonContainer.defaultProps = {
  className: '',
  api: {
    post: (videoId) => axios.post(`/api/favorite/${videoId}`),
    delete: (videoId) => axios.delete(`/api/favorite/${videoId}`),
  },
};

export default (props) => (
  <FavoriteButtonPresenter
    {...props}
    presenter={FavoriteButtonPresenter}
  />
);
