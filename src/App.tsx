import { Calendar } from "./components/ui/calendar";
import { useState } from "react";

import { DataTable } from "@/components/ui/DataTable/DataTable";
import { columns, TodoType } from "@/components/ui/DataTable/Columns";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarLabel,
} from "@/components/ui/menubar";

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
      <Menubar className="w-full flex items-center justify-between p-8">
        <a href="./">
          <MenubarLabel className="text-xl cursor-pointer">
            Planning-app
          </MenubarLabel>
        </a>

        <MenubarMenu>
          <div className="flex">
            <MenubarTrigger className="cursor-pointer">Sign out</MenubarTrigger>
            <MenubarTrigger className="cursor-pointer">settings</MenubarTrigger>
          </div>
        </MenubarMenu>
      </Menubar>

      <main className="w-full grid grid-flow-col mt-8">
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
