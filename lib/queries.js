"use client";
import { gql } from "@apollo/client";
export const get_tasks_of_user = gql`
  query q($param: ID) {
    findUser(id: $param) {
      id
      email
      tasks {
        id
        title
        description
        pomodoros_required
        pomodoros_completed
        date_started
        due_date
        priority
        is_complete
      }
    }
  }
`;
