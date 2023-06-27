"use client";
import { get_tasks_of_email } from "@/lib/queries";
import { useQuery } from "@apollo/client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const light = "#FF8360";
const medium = "#D5D5D5";
const dark = "#363636";

export default function fetchData() {
  const { loading, error, data } = useQuery(get_tasks_of_email, {
    variables: {
      param: "yashaswinishivathaya@gmail.com",
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-latte text-jet">
        Loading content...
      </div>
    );
  }
  if (error) {
    console.error(error);
    return (
      <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-latte text-jet">
        Error fetching user's tasks
      </div>
    );
  }

  const f = data?.findUserEmail?.tasks?.filter((e) => e.is_complete == true);

  return (
    <div className="pt-32 bg-latte text-jet grid grid-cols-2 gap-4 p-8">
      <span className="grid col-span-1 gap-4">
        <span className="text-3xl font-bold text-coral mx-auto">
          HISTORY OF ALL YOUR TASKS
        </span>
        <PastTasks props={f} />
      </span>
      <span className="grid col-span-1 flex-cols">
        <BarGraph1 props={f} />
        <BarGraph2 props={f} />
        <DonutGraph props={f} />
        <span className="flex gap-2 justify-center flex-wrap items-center">
          <span className="bg-jet text-latte px-4 py-1 text-sm font-bold rounded-sm">
            HIGH
          </span>
          <span className="bg-coral text-latte px-4 py-1 text-sm font-bold rounded-sm">
            MEDIUM
          </span>
          <span className="bg-steal text-latte px-4 py-1 text-sm font-bold rounded-sm">
            LOW
          </span>
        </span>
      </span>
    </div>
  );
}

function PastTasks({ props }) {
  return (
    <>
      {props &&
        props.map((storedTask, index) => (
          <div
            className="md:border-2 border-2 border-jet rounded-3xl text-jet p-4 flex flex-col gap-2 relative w-5/6 mx-auto sm:text-md text-xs "
            key={index}
          >
            <div className="bg-jet text-latte duration-200 ease-in w-fit px-4 py-2 rounded-full absolute md:right-8 right-4 md:bottom-8 bottom-4">
              COMPLETED
            </div>
            <span className="flex md:gap-4 gap-2 flex-wrap items-center">
              <span className="border-jet border-2 px-4 py-2 w-fit rounded-3xl ">
                TITLE
              </span>
              <span className="text-xl">{storedTask.title}</span>
            </span>

            <span className="flex  md:gap-4 gap-2 flex-wrap items-center">
              <span className="border-jet border-2 px-4 py-2 w-fit rounded-3xl ">
                DESCRIPTION
              </span>
              <span className="text-xl">{storedTask.description}</span>
            </span>

            <span className="flex md:gap-4 gap-2 flex-wrap items-center">
              <span className="border-jet border-2 px-4 py-2 w-fit rounded-3xl ">
                DATE ADDED
              </span>
              <span className="text-xl">{storedTask.date_started}</span>
            </span>
            <span className="flex md:gap-4 gap-2 flex-wrap items-center">
              <span className="border-jet border-2 px-4 py-2 w-fit rounded-3xl ">
                DUE DATE
              </span>
              <span className="text-xl">{storedTask.due_date}</span>
            </span>
            <span className="flex md:gap-4 gap-2 flex-wrap items-center">
              <span className="border-jet border-2 px-4 py-2 w-fit rounded-3xl ">
                PRIORITY
              </span>
              <span className="text-xl">{storedTask.priority}</span>
            </span>
          </div>
        ))}
    </>
  );
}

function DonutGraph({ props }) {
  let priority_data_points = [0, 0, 0];
  const priority_label = ["High", "Medium", "Low"];
  const priority_color = [light, medium, dark];

  props.map((e) => priority_data_points[parseInt(e.priority) - 1]++);
  const priority_data = {
    label: priority_label,
    datasets: [
      {
        label: "Priority",
        data: priority_data_points,
        backgroundColor: priority_color,
      },
    ],
  };

  const priority_options = {
    legend: {
      display: true,
    },
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Tasks completed - Priority wise",
      },
    },
  };
  return (
    <div className="w-4/5 mx-auto my-4">
      <Doughnut options={priority_options} data={priority_data} />
    </div>
  );
}

function BarGraph1({ props }) {
  // console.log("props: ", props);
  let title = [];
  let pomodoros_used = [];
  props.map((e) => {
    if (e.pomodoros_required <= 0) {
      // took up all the time
      title.push(e.title);
      pomodoros_used.push(e.pomodoros_completed);
    }
  });
  // console.log(pomodoros_used);

  const pomodoros_data = {
    labels: title,
    datasets: [
      {
        label: "Used Up all Pomodoros",
        data: pomodoros_used,
        backgroundColor: light,
      },
    ],
  };

  const pomodoros_options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Pomodoros used for each Task",
      },
    },
  };

  return (
    <div className="h-fit my-4">
      <Bar options={pomodoros_options} data={pomodoros_data} />
    </div>
  );
}
function BarGraph2({ props }) {
  // console.log("props: ", props);
  let title = [];
  let pomodoros_used = [];
  props.map((e) => {
    if (e.pomodoros_required > 0) {
      // finished early
      title.push(e.title);
      pomodoros_used.push(e.pomodoros_completed);
    }
  });
  // console.log(pomodoros_used);

  const pomodoros_data = {
    labels: title,
    datasets: [
      {
        label: "Finished Early!",
        data: pomodoros_used,
        backgroundColor: dark,
      },
    ],
  };

  const pomodoros_options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Pomodoros used for each Task",
      },
    },
  };

  return (
    <div className="h-fit my-4">
      <Bar options={pomodoros_options} data={pomodoros_data} />
    </div>
  );
}