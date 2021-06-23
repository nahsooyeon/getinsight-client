import React, { ReactElement, useEffect, useState } from 'react';

import DatePicker, { CalendarContainer, registerLocale, setDefaultLocale, getDefaultLocale } from 'react-datepicker';
import enUS from 'date-fns/locale/en-US';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


registerLocale('ko-KR', { options: { weekStartsOn: 1 } });
setDefaultLocale('ko-KR');
const defaultLocale = getDefaultLocale();

const SearchDatePicker = () => {
	return <></>;
};

export default SearchDatePicker;