export const rebuildTimes = (log, prevExLog = null) => {
  return log.times.map((item, index) => ({
    ...item,
    prevWeight: prevExLog ? prevExLog.times[index].weight : 0,
    prevReps: prevExLog ? prevExLog.times[index].reps : 0,
  }));
};
