import { DateRange, type Range, type RangeKeyDict } from "react-date-range";

interface CalenderProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Calender = ({ value, disabledDates, onChange }: CalenderProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      disabledDates={disabledDates}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
  );
};

export default Calender;
