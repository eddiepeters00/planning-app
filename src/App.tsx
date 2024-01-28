import { Calendar } from "./components/ui/calendar";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/ui/DataTable/DataTable";
import { CalendarIcon, MoreHorizontal, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { cn } from "./lib/utils";
import { format } from "date-fns";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formSchema = z.object({
    priority: z.number(),
    title: z.string().min(2).max(50),
    description: z.string(),
    deadline: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: 1,
      title: "Title",
      description: "Description",
      deadline: new Date("2024-04-06"),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  type TodoType = {
    id: string;
    priority: 1 | 2 | 3 | 4 | 5;
    title: string;
    description?: string;
    deadline?: Date;
  };

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

  const columns: ColumnDef<TodoType>[] = [
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter priority</FormLabel>
                      <FormControl>
                        <Input placeholder="Priority" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter a title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter a description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter deadline</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            ;
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
      cell: ({ row }) => {
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
