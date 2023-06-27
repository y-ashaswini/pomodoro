"use client";
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { useQuery, useMutation } from "@apollo/client";
import {
  create_task_for_user,
  delete_task_by_user,
  update_task_by_user,
  get_tasks_of_email,
} from "@/lib/queries";

export default function Home({ params }) {
  const initial_data = {
    id: "",
    title: "",
    description: "",
    pomodoros_required: "",
    pomodoros_completed: 0,
    date_started: "",
    due_date: "",
    priority: "",
    is_complete: false,
    by_user_id: "",
  };

  const [currUser, setCurrUser] = useState({ id: "", username: "", email: "" });
  const [task, setTask] = useState(initial_data);
  const [stored_data, setStored_data] = useState([]);
  const [history_data, setHistory_data] = useState([]);

  const [timerSelected, setTimerSelected] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(0);
  const [currRunningTask, setCurrRunningTask] = useState([]);
  const [runBreak, setRunBreak] = useState(false);

  const handleRemove = (id) => {
    console.log("deleting task with id: ", id);
    deleteUserTaskFunction({
      variables: {
        taskid: parseInt(id),
      },
    });
  };

  const handleMarkCompleted = () => {
    console.log("TASK COMPLETED!");
    updateUserTaskFunction({
      variables: {
        taskid: parseInt(currRunningTask.id),
        pomodoros_completed: currRunningTask.pomodoros_completed,
        pomodoros_required: currRunningTask.pomodoros_required,
        is_complete: true,
      },
    });

    setCurrRunningTask([]);
    setTimerSelected(false);
  };

  // Timer functions

  const handleStartTimer = (thisTask) => {
    setCurrRunningTask(thisTask);
    setTimerSelected(true);
    setTimerStartTime(25 * 60 * 1000); // 25 minutes, runs as many tomatoes as mentioned.
    // setTimerStartTime(10 * 1000); // 10 seconds for testing
  };

  const timerRenderer = ({ hours, minutes, seconds, completed, api }) => {
    if (completed) {
      api.stop();
      // Check if break was running
      if (runBreak) {
        // console.log("break was running");
        setRunBreak(false);
        setTimerStartTime(25 * 60 * 1000); // Start task again
        api.start();
      } else {
        // One tomato completed, update task data

        const update_pomodoros_completed =
          currRunningTask.pomodoros_completed + 1;
        const update_pomodoros_required =
          currRunningTask.pomodoros_required - 1;

        // Check if task is completed
        if (update_pomodoros_required < 1) {
          console.log("TASK COMPLETED!");
          updateUserTaskFunction({
            variables: {
              taskid: parseInt(currRunningTask.id),
              pomodoros_completed: update_pomodoros_completed,
              pomodoros_required: update_pomodoros_required,
              is_complete: true,
            },
          });

          setCurrRunningTask([]);
          setTimerSelected(false);
        } else if (update_pomodoros_completed >= 4) {
          // 4 tomotoes completed, trigger longer break

          updateUserTaskFunction({
            variables: {
              taskid: parseInt(currRunningTask.id),
              pomodoros_completed: update_pomodoros_completed,
              pomodoros_required: update_pomodoros_required,
              is_complete: false,
            },
          });
          setCurrRunningTask({
            ...currRunningTask,
            pomodoros_completed: update_pomodoros_completed,
            pomodoros_required: update_pomodoros_required,
          });
          setRunBreak(true);
          // console.log("break 30 mins");
          // Triggering break for 30 minutes
          setTimerStartTime(30 * 60 * 1000);
          // setTimerStartTime(7 * 1000); // testing - break for 7 seconds
          api.start();
        } else {
          // Task incomplete, trigger break

          updateUserTaskFunction({
            variables: {
              taskid: parseInt(currRunningTask.id),
              pomodoros_completed: update_pomodoros_completed,
              pomodoros_required: update_pomodoros_required,
              is_complete: false,
            },
          });
          setCurrRunningTask({
            ...currRunningTask,
            pomodoros_completed: update_pomodoros_completed,
            pomodoros_required: update_pomodoros_required,
          });
          setRunBreak(true);
          console.log("break 5 mins");
          // Triggering break for 5 minutes
          setTimerStartTime(5 * 60 * 1000);
          // setTimerStartTime(5 * 1000); // testing - break for 5 seconds
          api.start();
        }
      }
    } else {
      // Render a countdown
      return (
        <span className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2 md:font-extralight font-bold text-coral">
            <span className="md:px-8 md:py-4 p-2 border-2 border-coral md:rounded-xl rounded-md hover:bg-coral hover:text-latte md:text-5xl text-3xl duration-200 ease-in">
              {hours <= 9 ? "0" + hours : hours}
            </span>
            :
            <span className="md:px-8 md:py-4 p-2 border-2 border-coral md:rounded-xl rounded-md hover:bg-coral hover:text-latte md:text-5xl text-3xl duration-200 ease-in">
              {minutes <= 9 ? "0" + minutes : minutes}
            </span>
            :
            <span className="md:px-8 md:py-4 p-2 border-2 border-coral md:rounded-xl rounded-md hover:bg-coral hover:text-latte md:text-5xl text-3xl duration-200 ease-in">
              {seconds <= 9 ? "0" + seconds : seconds}
            </span>
          </span>
          <span className="flex gap-2 items-center flex-wrap justify-center font-bold">
            <span
              className="border-2 border-jet hover:bg-jet hover:text-latte duration-200 ease-in w-fit md:px-4 px-2 md:py-2 py-1 md:rounded-full rounded-md cursor-pointer"
              onClick={function () {
                api.isStopped() ? api.start() : api.stop();
              }}
            >
              {api.isStopped() ? "START" : "RESTART"}
            </span>

            {!api.isCompleted() && (
              <span
                className="border-2 border-jet hover:bg-jet hover:text-latte duration-200 ease-in w-fit md:px-4 px-2 md:py-2 py-1 md:rounded-full rounded-md cursor-pointer"
                onClick={function () {
                  api.isPaused() ? api.start() : api.pause();
                }}
              >
                {api.isPaused() ? "PLAY" : "PAUSE"}
              </span>
            )}
            <span
              className="border-2 border-jet hover:bg-jet hover:text-latte duration-200 ease-in w-fit md:px-4 px-2 md:py-2 py-1 md:rounded-full rounded-md cursor-pointer"
              onClick={function () {
                api.stop();
                handleMarkCompleted();
              }}
            >
              MARK AS COMPLETED
            </span>
          </span>
        </span>
      );
    }
  };

  const handleSubmitTask = (curr) => {
    if (
      curr.title &&
      curr.description &&
      curr.pomodoros_required &&
      curr.due_date &&
      curr.priority
    ) {
      curr.date_started = new Date().toLocaleDateString();
      curr.by_user_id = parseInt(currUser.id);
      if (curr.pomodoros_required <= 0) curr.pomodoros_required = 1;
      try {
        enterUserTaskFunction({
          variables: {
            title: curr.title,
            description: curr.description,
            pomodoros_required: curr.pomodoros_required,
            pomodoros_completed: curr.pomodoros_completed,
            due_date: curr.due_date,
            date_started: curr.date_started,
            priority: curr.priority,
            is_complete: curr.is_complete,
            by_user_id: curr.by_user_id,
          },
        });
      } catch (e) {
        console.error("error: ", e);
      }
      // setStored_data([...stored_data, curr]);
      setTask(initial_data);
    }
  };

  const [fetchErr, setfetchErr] = useState(false);

  // --------------- Defining Functions to Interact with the Data ---------------

  const fetchedUserQuery = useQuery(get_tasks_of_email, {
    variables: {
      param: decodeURIComponent(params.email),
    },
  });

  const [enterUserTaskFunction, _e] = useMutation(create_task_for_user, {
    refetchQueries: [get_tasks_of_email],
    awaitRefetchQueries: true,
  });

  const [deleteUserTaskFunction, _d] = useMutation(delete_task_by_user, {
    refetchQueries: [get_tasks_of_email],
    awaitRefetchQueries: true,
  });

  const [updateUserTaskFunction, updateUserTask] = useMutation(
    update_task_by_user,
    {
      refetchQueries: [get_tasks_of_email],
      awaitRefetchQueries: true,
    }
  );

  useEffect(() => {
    const onCompleted = (data) => {
      // console.log("data: ", data);

      setStored_data(
        data?.findUserEmail?.tasks?.filter((e) => e.is_complete == false)
      );

      setHistory_data(
        data?.findUserEmail?.tasks?.filter((e) => e.is_complete == true)
      );

      const f = {
        id: parseInt(data?.findUserEmail?.id),
        username: data?.findUserEmail?.username,
        email: data?.findUserEmail?.email,
      };

      setCurrUser(f);
    };
    const onError = (error) => {
      console.log("fetching error: ", error);
      setfetchErr(true);
    };
    if (onCompleted && !fetchedUserQuery.loading && !fetchedUserQuery.error) {
      onCompleted(fetchedUserQuery.data);
    } else if (onError && !fetchedUserQuery.loading && fetchedUserQuery.error) {
      onError(fetchedUserQuery.error);
    }
  }, [fetchedUserQuery.loading, fetchedUserQuery.data, fetchedUserQuery.error]);

  return fetchErr ? (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-latte text-jet">
      Error fetching user's tasks
    </div>
  ) : (
    <div className="flex flex-col mx-auto  bg-latte text-jet">
      <div className="flex items-center flex-col space-y-4 md:w-1/2 w-4/5 pt-32 md:pt-32 md:p-16 mx-auto border-b-2 border-coral">
        {timerSelected ? (
          <>
            {currRunningTask !== [] && (
              <div className="flex flex-col gap-2 w-full items-center font-bold">
                <span className="md:text-5xl text-3xl">
                  {currRunningTask.title}
                </span>
                <span>{currRunningTask.description}</span>
                <span className="bg-coral px-4 py-1 rounded-full text-latte">
                  {currRunningTask.date_started}
                </span>
                <span className="flex gap-4 items-center">
                  <span className="px-2 rounded-full bg-coral text-latte font-bold">
                    {currRunningTask.pomodoros_required}
                  </span>
                  pomodoros remaining!
                </span>
              </div>
            )}
            <span className=" w-full md:text-3xl text-center p-2 bg-jet text-latte rounded-3xl">
              {runBreak ? "BREAK TIME" : "TASK RUNNING"}
            </span>
            <Countdown
              autoStart={false}
              date={Date.now() + timerStartTime}
              renderer={timerRenderer}
            />
          </>
        ) : (
          <span className="text-jet text-4xl">No timer selected.</span>
        )}
      </div>
      <div className="flex-col space-y-4 pt-8 md:p-16">
        <form className="flex flex-col p-8 border-[1px] gap-4 bg-jet text-latte rounded-3xl relative md:w-1/2 w-4/5 mx-auto">
          <span className="md:text-5xl text-3xl mx-auto font-bold">
            ADD NEW TASK
          </span>
          <input
            type="text"
            placeholder="Title"
            className="border-b-2 px-2 py-1 outline-none bg-transparent border-coral text-coral"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border-b-2 px-2 py-1 outline-none bg-transparent border-coral text-coral"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Pomodoros Required"
            className="border-b-2 px-2 py-1 outline-none bg-transparent border-coral text-coral"
            value={task.pomodoros_required}
            onChange={(e) =>
              setTask({ ...task, pomodoros_required: parseInt(e.target.value) })
            }
          />
          <input
            type="date"
            placeholder="Due Date"
            className="border-b-2 px-2 py-1 outline-none bg-transparent border-coral text-coral"
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          />
          <span className="flex gap-2 items-center flex-wrap justify-center text-coral">
            Priority
            <span
              className={
                "rounded-full px-4 py-1 border-2 border-coral " +
                (task.priority === 3
                  ? "bg-coral text-zinc-900"
                  : "cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 3 })}
            >
              HIGH
            </span>
            <span
              className={
                "rounded-full px-4 py-1 border-2 border-coral " +
                (task.priority === 2
                  ? "bg-coral text-zinc-900"
                  : "cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 2 })}
            >
              MEDIUM
            </span>
            <span
              className={
                "rounded-full px-4 py-1 border-2 border-coral " +
                (task.priority === 1
                  ? "bg-coral text-zinc-900"
                  : "cursor-pointer")
              }
              onClick={() => setTask({ ...task, priority: 1 })}
            >
              LOW
            </span>
          </span>

          <div
            className="border-[1px] text-latte border-latte duration-200 ease-in w-fit px-4 py-1 rounded-3xl hover:bg-latte hover:text-jet cursor-pointer"
            onClick={() => handleSubmitTask(task)}
          >
            SUBMIT
          </div>
        </form>
        <div className="grid md:grid-cols-2 flex-col md:gap-8 p-8 gap-4 w-full font-bold">
          <span className="flex flex-col gap-4">
            <span className="md:text-5xl text-3xl">PENDING TASKS</span>
            {stored_data ? (
              stored_data.map((storedTask, index) => (
                <div
                  className="bg-coral sm:text-md text-xs rounded-3xl text-jet md:p-8 p-4 flex flex-col gap-2 relative"
                  key={index}
                >
                  <div
                    className="bg-jet text-latte duration-200 ease-in w-fit px-4 py-2 rounded-full cursor-pointer absolute md:right-8 right-4 md:top-8 top-4"
                    onClick={() => handleStartTimer(storedTask)}
                  >
                    SET TIMER
                  </div>

                  <div
                    className="bg-jet text-latte duration-200 ease-in w-fit px-4 py-2 rounded-full cursor-pointer absolute md:right-8 right-4 md:bottom-8 bottom-4"
                    onClick={() => handleRemove(storedTask.id)}
                  >
                    DELETE
                  </div>

                  <span className="border-2 border-latte text-latte px-4 py-2 w-fit rounded-3xl ">
                    TASK {index + 1}
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      TITLE
                    </span>
                    <span className="text-xl">{storedTask.title}</span>
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      DESCRIPTION
                    </span>
                    <span className="text-xl">{storedTask.description}</span>
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      POMODOROS REQUIRED
                    </span>
                    <span className="text-xl">
                      {storedTask.pomodoros_required}
                    </span>
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      DATE ADDED
                    </span>
                    <span className="text-xl">{storedTask.date_started}</span>
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      DUE DATE
                    </span>
                    <span className="text-xl">{storedTask.due_date}</span>
                  </span>
                  <span className="flex gap-4 flex-wrap items-center">
                    <span className="bg-latte px-4 py-2 w-fit rounded-3xl ">
                      PRIORITY
                    </span>
                    <span className="text-xl">{storedTask.priority}</span>
                  </span>
                </div>
              ))
            ) : (
              <span>Good Job! You've got no pending tasks.</span>
            )}
          </span>
          <span className="flex flex-col gap-4">
            <span className="md:text-5xl text-3xl">COMPLETED TASKS</span>
            {history_data ? (
              history_data.map((storedTask, index) => (
                <div
                  className="md:border-2 border-2 border-jet rounded-3xl text-jet md:p-8 p-4 flex flex-col gap-2 relative sm:text-md text-xs "
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
              ))
            ) : (
              <span>No completed tasks yet!</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
