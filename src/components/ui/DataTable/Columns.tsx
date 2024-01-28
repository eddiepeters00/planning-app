import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { AddNewTaskForm } from "@/components/Forms/AddNewTaskForm";

export type TodoType = {
  id: string;
  priority: 1 | 2 | 3 | 4 | 5;
  title: string;
  description?: string;
  deadline?: Date;
};

export const columns: ColumnDef<TodoType>[] = [
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    id: "actions",
    header: () => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <PlusIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add new task</DrawerTitle>
            <DrawerDescription>
              Add information you want your task to include. Click save when
              you're done.
            </DrawerDescription>
          </DrawerHeader>

          <AddNewTaskForm />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
