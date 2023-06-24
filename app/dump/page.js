"use client";
import { gql, useQuery } from "@apollo/client";
import { get_tasks_of_user } from "@/lib/queries";

export default function DumpPage({ params }) {
  const { loading, error, data } = useQuery(get_tasks_of_user, {
    variables: {
      //   paramsid: parseInt(params.id),
      paramsid: 8,
    },
  });
  //   console.log(data.findUser);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      Hello, {data.findUser.email} <br /> Your tasks are:
      {data.findUser.tasks.map((each) => (
        <div className="flex flex-col">
          <span className="text-2xl">{each.title}</span>
          <span>{each.description}</span>
        </div>
      ))}
    </div>
  );
}