"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import apiClient from "@/lib/axios";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Imię musi składać się z minimum 2 znaków." }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: "Nazwisko musi składać się z minimum 2 znaków." }),
  race: z.string(),
  sex: z.string(),
  age: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  weight: z.number().int().positive().optional(),
  eyeColor: z.string(),
  hairColor: z.string(),
  starSign: z.string().optional(),
  siblings: z.number().int().positive().optional(),
  placeOfBirth: z.string().optional(),
  distinguishingMarks: z.string().optional(),
});

const formFields: Record<
  keyof z.infer<typeof formSchema>,
  {
    label: string;
    description?: string;
    placeholder: string;
    type: "text" | "number" | "date";
    gridClass?: string;
  }
> = {
  username: {
    label: "Imię",
    placeholder: "Wilhelm",
    type: "text",
    gridClass: "col-span-1",
  },
  middleName: {
    label: "Drugie imię",
    placeholder: "Karl",
    type: "text",
    gridClass: "col-span-1",
  },
  lastName: {
    label: "Nazwisko",
    placeholder: "von Hohenzollern",
    type: "text",
    gridClass: "col-span-2",
  },

  race: {
    label: "Rasa",
    placeholder: "Człowiek",
    type: "text",
    gridClass: "col-span-2",
  },
  sex: {
    label: "Płeć",
    placeholder: "Mężczyzna",
    type: "text",
    gridClass: "col-span-1",
  },
  age: {
    label: "Wiek",
    placeholder: "25",
    type: "number",
    gridClass: "col-span-1",
  },

  height: {
    label: "Wzrost",
    placeholder: "180",
    type: "number",
    gridClass: "col-span-1",
  },
  weight: {
    label: "Waga",
    placeholder: "80",
    type: "number",
    gridClass: "col-span-1",
  },

  eyeColor: {
    label: "Kolor oczu",
    placeholder: "Niebieski",
    type: "text",
    gridClass: "col-span-1",
  },
  hairColor: {
    label: "Kolor włosów",
    placeholder: "Czarny",
    type: "text",
    gridClass: "col-span-1",
  },
  starSign: {
    label: "Znak gwiezdny",
    placeholder: "Bębniarz",
    type: "text",
    gridClass: "col-span-2",
  },
  siblings: {
    label: "Liczba rodzeństwa",
    placeholder: "3",
    type: "number",
    gridClass: "col-span-1",
  },
  placeOfBirth: {
    label: "Miejsce urodzenia",
    placeholder: "Altdorf",
    type: "text",
    gridClass: "col-span-2",
  },
  distinguishingMarks: {
    label: "Znaki szczególne",
    placeholder: "Blizna na lewym policzku",
    type: "text",
    gridClass: "col-span-2",
  },
};

export function NewCharacterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      middleName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await apiClient.post("/api/v1/characters", {
      firstName: values.username,
      lastName: values.lastName,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(formFields).map(([name, config]) => (
            <div key={name} className={config.gridClass}>
              <FormField
                control={form.control}
                name={name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{config.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={config.type}
                        placeholder={config.placeholder}
                        {...field}
                      />
                    </FormControl>
                    {config.description && (
                      <FormDescription>{config.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button type="submit">Stwórz postać</Button>
      </form>
    </Form>
  );
}
