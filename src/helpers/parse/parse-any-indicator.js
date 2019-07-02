export const parseAnyIndicator = ($) => {
  const result = $('#ctl00_ContentPlaceHolder1_ctl01_UpdatePanel1').find('tbody tr');

  const arr = [];
  for (let i = 0; i < result.length; i++) {
    arr.push({
      id: i,
      country: result.eq(i).children().eq(0).text().trim(),
      value: result.eq(i).children().eq(1).text().trim(),
    });
  }

  return arr;
};
