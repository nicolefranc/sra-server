// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const tenant = {performance: [
    {
        month: "January",
        val: "test",
        hi: "123"
    },
    {
        month: "February",
        val: "test",
        hi: "123"
    },
    {
        month: "March",
        val: "test",
        hi: "123"
    },
]}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

console.log(months);
const d = new Date();
console.log(months[new Date().getMonth()]);

const currentMonth = months[new Date().getMonth()];
const currentPerformance = tenant.performance.filter(
    (item) => item.month === currentMonth
);

console.log(currentPerformance.month);