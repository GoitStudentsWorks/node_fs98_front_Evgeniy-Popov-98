import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { getUser } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/water/selectors';

import Loader from '../../components/Loader/Loader';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={css.trackContainer}>
      <Loader loading={loading} />
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
