//Helper function that formats the time.
module.exports = {
  format_time: date => {
    return date.toLocaleTimeString();
  },
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },


  getJournalImage: (index) => {
    const images = [
      "https://toruskit.com/assets/img/util/slider-violet-01.svg",
      "https://toruskit.com/assets/img/util/slider-navy-01.svg",
      "https://toruskit.com/assets/img/util/slider-magenta-01.svg"
    ];
    return images[index % images.length];
  },


};
