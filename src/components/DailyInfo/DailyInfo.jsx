import { useSelector } from 'react-redux';
import AddWaterBtn2 from '../AddWaterBtn2/AddWaterBtn2.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';
import css from './DailyInfo.module.css';
import { selectCalendar } from '../../redux/calendar/selector.js';

const DailyInfo = () => {
  // const currentDate = new Date().toISOString().split('T')[0];
  const currentDate = useSelector(selectCalendar).split('T')[0];

  return (
    <div style={{ margin: '40px 0px' }}>
      <div className={css.addPanel}>
        <ChooseDate />
        <AddWaterBtn2 />
      </div>
      <WaterList date={currentDate} />
    </div>
  );
};

export default DailyInfo;
