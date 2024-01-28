import { Calendar } from "./components/ui/calendar";
import { useState } from "react";

import { DataTable } from "@/components/ui/DataTable/DataTable";
import { columns, TodoType } from "@/components/ui/DataTable/Columns";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const todoData: TodoType[] = [
    {
      id: "728ed52f",
      priority: 1,
      title: "Very important information",
      description: "A very important thing i cant forget to do it this week",
    },
    {
      id: "489e1d42",
      priority: 1,
      title: "Shoppinglist",
      deadline: new Date("2024-04-06"),
    },
  ];

  const deadlines = [
    { title: "inlämning", date: new Date("24-04-06") },
    { title: "inlämning", date: new Date("24-04-06") },
  ];

  return (
    <>
      <main className="grid grid-flow-col">
        <section>
          <DataTable columns={columns} data={todoData} />
        </section>

        <section>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            deadlines={deadlines}
            className="rounded-md border w-fit"
          />
        </section>
      </main>
    </>
  );
}

export default App;
