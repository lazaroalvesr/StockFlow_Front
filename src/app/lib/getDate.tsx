import { useEffect, useState } from "react";

export const useCurrentDayAndMonth = () => {
    const [dayAndMonth, setDayAndMonth] = useState({ dayName: '', fullYear: "", day: "", monthName: '' });

    useEffect(() => {
        const today = new Date();
        const dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' });
        const day = today.getDate().toString();
        const monthName = today.toLocaleDateString('pt-BR', { month: 'long' });
        const fullYear = today.getFullYear().toString();
        setDayAndMonth({ dayName, day, fullYear, monthName });
    }, []);

    return dayAndMonth;
};

