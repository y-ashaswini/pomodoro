// "use client";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   indexAxis: "y",
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "right",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Horizontal Bar Chart",
//     },
//   },
// };

// const labels = [
//   "12/12/2020",
//   "12/13/2020",
//   "12/14/2020",
//   "12/16/2020",
//   "12/18/2020",
//   "12/19/2020",
//   "12/10/2020",
// ];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//       backgroundColor: "rgba(255, 99, 132)",
//     },
//   ],
// };

// export const fetchRepos = async () => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo = await res.json();
//   return { props: { repo } };
// };
export default async function DumpPage() {
  // const repos = await fetchRepos();
  // console.log(repos);
  return (
    <div>
      {/* <div>
        <Bar options={options} data={data} />
      </div> */}
      {/* {repo?.stargazers_count} */}
      hello
    </div>
  );
}
