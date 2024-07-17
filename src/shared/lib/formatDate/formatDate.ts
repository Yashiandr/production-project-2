export const formatDate = async (date: Date) => {
    let dd = date.getDate().toString();
    let mm = date.getMonth().toString();
    const year = date.getFullYear();

    if (Number(dd) < 10) {
        dd = `0${dd}`;
    }
    if (Number(mm) < 10) {
        mm = `0${mm}`;
    }

    return `${dd}.${mm}.${year}`;
};
