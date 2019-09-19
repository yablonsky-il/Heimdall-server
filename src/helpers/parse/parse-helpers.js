/* eslint-disable newline-per-chained-call */
export const parseTable = (tbody, key) => {
  const data = [];

  for (let i = 0; i < tbody.length; i += 1) {
    data.push({
      id: i,
      [key]: tbody.eq(i).children().eq(1).text().trim(),
      value: tbody.eq(i).children().eq(2).text().trim(),
    });
  }

  return data;
};
