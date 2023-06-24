"use client";
import { gql, useQuery } from "@apollo/client";

const GET_GREETING = gql`
  query q($paramsid: ID) {
    findUser(id: $paramsid) {
      id
      email
      tasks {
        title
        description
      }
    }
  }
`;

export default function DumpPage({ params }) {
  const { loading, error, data } = useQuery(GET_GREETING, {
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

// const GET_GREETING = gql`
//   query GetGreeting($language: String!) {
//     greeting(language: $language) {
//       message
//     }
//   }
// `;

// function Hello() {
//   const { loading, error, data } = useQuery(GET_GREETING, {
//     variables: { language: "english" },
//   });
//   if (loading) return <p>Loading ...</p>;
//   return <h1>Hello {data.greeting.message}!</h1>;
// }
