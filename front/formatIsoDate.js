function formatIsoDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 判斷AM或PM
    const ampm = hours >= 12 ? '下午' : '上午';
    hours = hours % 12;
    hours = hours ? String(hours) : '12';

    return `${year}/${month}/${day} ${ampm} ${hours}:${minutes}:${seconds}`;
}

export { formatIsoDate };