"use client";
import moment from "moment/moment";
import React, { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";
import { useQuery } from "@apollo/client";
import { get_tasks_of_user } from "@/lib/queries";

export default function Home({ params }) {
  const initial_data = {
    title: "",
    description: "",
    pomodoros_required: "",
    pomodoros_completed: "",
    date_started: "",
    due_date: "",
    priority: "",
    is_complete: false,
  };

  const [task, setTask] = useState(initial_data);
  const [stored_data, setStored_data] = useState([]);
  const [history_data, setHistory_data] = useState([]);

  const [timerSelected, setTimerSelected] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(0);
  const [currRunningTask, setCurrRunningTask] = useState(-1);
  const [runBreak, setRunBreak] = useState(false);

  const handleRemove = (index) => {
    const l = [...stored_data];
    l.splice(index, 1);
    setStored_data(l);
  };

  // Timer functions

  const handleStartTimer = (index) => {
    setCurrRunningTask(index);
    setTimerSelected(true);
    // setTimerStartTime(parseInt(storedTask.pomodoros_required) * 25 * 60 * 1000);
    // setTimerStartTime(25 * 60 * 1000); // 25 minutes, runs as many tomatoes as mentioned.
    setTimerStartTime(10 * 1000); // 10 seconds for testing
  };

  const timerRenderer = ({ hours, minutes, seconds, completed, api }) => {
    if (completed) {
      api.stop();
      // Check if break was running
      if (runBreak) {
        console.log("break was running");
        setRunBreak(false);
        setTimerStartTime(10 * 1000); // Start task again
        api.start();
      } else {
        // One tomato completed, update task data
        let f = stored_data[currRunningTask];
        f.pomodoros_completed++;
        f.pomodoros_required--;
        let ff = [...stored_data];
        ff[currRunningTask] = f;
        // Check if task is completed
        if (f.pomodoros_required <= 0) {
          f.is_complete = true;
          setStored_data(ff);
          setHistory_data([...history_data, stored_data[currRunningTask]]);
          handleRemove(currRunningTask);
          setCurrRunningTask(-1);
          setTimerSelected(false);
        } else if (f.pomodoros_completed == 4) {
          // 4 tomotoes completed, trigger longer break
          setStored_data(ff);
          setRunBreak(true);
          console.log("break 30 mins");
          // Triggering break for 30 minutes
          // setTimerStartTime(30 * 60 * 1000);
          setTimerStartTime(7 * 1000); // testing - break for 7 seconds
          api.start();
        } else {
          // Task incomplete, trigger break
          setStored_data(ff);

          setRunBreak(true);
          console.log("break 5 mins");
          // Triggering break for 5 minutes
          // setTimerStartTime(5 * 60 * 1000);
          setTimerStartTime(5 * 1000); // testing - break for 5 seconds
          api.start();
        }
      }
    } else {
      // Render a countdown
      return (
        <span className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2 text-zinc-500 ">
            <span className="px-8 py-4 border-[1px] rounded-sm border-zinc-500 text-3xl hover:text-zinc-200 duration-200 ease-in">
              {hours <= 9 ? "0" + hours : hours}
            </span>
            :
            <span className="px-8 py-4 border-[1px] rounded-sm border-zinc-500 text-3xl hover:text-zinc-200 duration-200 ease-in">
              {minutes <= 9 ? "0" + minutes : minutes}
            </span>
            :
            <span className="px-8 py-4 border-[1px] rounded-sm border-zinc-500 text-3xl hover:text-zinc-200 duration-200 ease-in">
              {seconds <= 9 ? "0" + seconds : seconds}
            </span>
          </span>
          <span className="flex gap-2 items-center">
            <span
              className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
              onClick={function () {
                api.isStopped() ? api.start() : api.stop();
              }}
            >
              {api.isStopped() ? "START" : "RESTART"}
            </span>

            {!api.isCompleted() && (
              <span
                className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
                onClick={function () {
                  api.isPaused() ? api.start() : api.pause();
                }}
              >
                {api.isPaused() ? "PLAY" : "PAUSE"}
              </span>
            )}
          </span>
        </span>
      );
    }
  };

  const handleSubmitTask = (curr) => {
    const today = new Date();
    curr.date_started = moment(today).format("YYYY-MM-DD");
    curr.pomodoros_completed = 0;
    if (curr.pomodoros_required <= 0) curr.pomodoros_required = 1;
    setStored_data([...stored_data, curr]);
    setTask(initial_data);
  };

  const [fetchErr, setfetchErr] = useState(false);
  const { loading, error, data } = useQuery(get_tasks_of_user, {
    variables: {
      param: parseInt(params.id),
    },
  });

  useEffect(() => {
    const onCompleted = (data) => {
      console.log("data: ", data);
      setStored_data(data.findUser.tasks.filter((e) => e.is_complete == false));
      setHistory_data(data.findUser.tasks.filter((e) => e.is_complete == true));
    };
    const onError = (error) => {
      console.log("fetching error: ", error);
      setfetchErr(true);
    };
    if (onCompleted && !loading && !error) {
      onCompleted(data);
    } else if (onError && !loading && error) {
      onError(error);
    }
  }, [loading, data, error]);

  return fetchErr ? (
    <div>Error Fetching</div>
  ) : (
    <div className="grid grid-cols-5 w-full bg-zinc-900 text-zinc-200">
      <div className="flex-col h-[100vh] overflow-y-scroll scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin space-y-4 p-16 col-span-3">
        {stored_data &&
          stored_data.map((storedTask, index) => (
            <div className="flex flex-col gap-2 relative" key={index}>
              {storedTask.is_complete ? (
                <div className="border-[1px] border-zinc-200 duration-200 ease-in w-fit px-8 py-4 rounded-full text-zinc-900 bg-zinc-200 absolute right-2 top-2 text-3xl">
                  COMPLETED
                </div>
              ) : (
                <div
                  className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-8 py-4 rounded-full hover:text-zinc-200 cursor-pointer absolute right-2 top-2 text-3xl"
                  onClick={() => handleStartTimer(index)}
                >
                  SET TIMER
                </div>
              )}
              <div
                className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer absolute bottom-2 right-2"
                onClick={(index) => handleRemove(index)}
              >
                DELETE
              </div>
              <span className="text-5xl">Task {index + 1}:</span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">TITLE</span>
                {storedTask.title}
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">DESCRIPTION</span>
                {storedTask.description}
              </span>

              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">
                  POMODOROS REQUIRED
                </span>
                {storedTask.pomodoros_required}
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">DATE ADDED</span>
                {storedTask.date_started}
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">DUE DATE</span>
                {storedTask.due_date}
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">PRIORITY</span>
                {storedTask.priority}
              </span>

              <div className="h-[1px] bg-zinc-700 rounded-full"></div>
            </div>
          ))}

        <form className="flex flex-col p-8 border-[1px] gap-4 border-zinc-500 rounded-lg relative">
          <input
            type="text"
            placeholder="Title"
            className="border-b-[1px] px-2 py-1 outline-none bg-transparent border-zinc-500 text-zinc-200"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border-b-[1px] px-2 py-1 outline-none bg-transparent border-zinc-500 text-zinc-200"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Pomodoros Required"
            className="border-b-[1px] px-2 py-1 outline-none bg-transparent border-zinc-500 text-zinc-200"
            value={task.pomodoros_required}
            onChange={(e) =>
              setTask({ ...task, pomodoros_required: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Due Date"
            className="border-b-[1px] px-2 py-1 outline-none bg-transparent border-zinc-500 text-zinc-200"
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          />
          <span className="flex gap-2 items-center text-zinc-400">
            Priority
            <span
              className={
                "rounded-full px-4 py-1 border-[1px] " +
                (task.priority === 3
                  ? "bg-zinc-200 text-zinc-900"
                  : "border-zinc-500 cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 3 })}
            >
              HIGH
            </span>
            <span
              className={
                "rounded-full px-4 py-1 border-[1px] " +
                (task.priority === 2
                  ? "bg-zinc-200 text-zinc-900"
                  : "border-zinc-500 cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 2 })}
            >
              MEDIUM
            </span>
            <span
              className={
                "rounded-full px-4 py-1 border-[1px] " +
                (task.priority === 1
                  ? "bg-zinc-200 text-zinc-900"
                  : "border-zinc-500 cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 1 })}
            >
              LOW
            </span>
          </span>

          <div
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
            onClick={() => handleSubmitTask(task)}
          >
            SUBMIT
          </div>
        </form>
        {history_data &&
          history_data.map((storedTask, index) => (
            <div
              className="flex flex-col gap-2 opacity-50 relative"
              key={index}
            >
              <div className="h-[1px] bg-zinc-700 rounded-full"></div>

              <div className="border-[1px] border-zinc-200 duration-200 ease-in w-fit px-8 py-4 rounded-full text-zinc-900 bg-zinc-200 absolute right-2 top-2 text-3xl">
                COMPLETED
              </div>

              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">TITLE</span>
                {storedTask.title}
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">DESCRIPTION</span>
                {storedTask.description}
              </span>

              <span className="flex gap-2 items-center">
                <span className="text-zinc-500 text-5xl mr-4">
                  POMODOROS USED
                </span>
                {storedTask.pomodoros_completed}
              </span>
              <span className="text-zinc-500 duration-200 ease-in ">
                {storedTask.date_started}
              </span>
            </div>
          ))}
      </div>
      <div className="flex items-center flex-col col-start-4 col-span-2 border-l-[1px] border-zinc-700 space-y-4 p-16">
        {timerSelected ? (
          <>
            {currRunningTask !== -1 && stored_data[currRunningTask] && (
              <div className="flex flex-col gap-2 border-b-[1px] border-zinc-500 pb-4 mb-4 w-full items-center">
                <span className="text-4xl">
                  {stored_data[currRunningTask].title}
                </span>
                <span>{stored_data[currRunningTask].description}</span>
                <span>{stored_data[currRunningTask].date_started}</span>
                <span>
                  {stored_data[currRunningTask].pomodoros_required} tomatoes
                  remaining!
                </span>
              </div>
            )}
            <span className="border-[1px] border-zinc-200 bg-zinc-200 text-zinc-900 duration-200 ease-in w-fit px-4 py-2 rounded-sm  text-3xl">
              {runBreak ? "BREAK" : "TASK"}
            </span>
            <Countdown
              autoStart={false}
              date={Date.now() + timerStartTime}
              renderer={timerRenderer}
            />
          </>
        ) : (
          <span className="text-zinc-500 text-4xl hover:text-zinc-200 duration-200 ease-in">
            No timer selected.
          </span>
        )}
      </div>
    </div>
  );
}