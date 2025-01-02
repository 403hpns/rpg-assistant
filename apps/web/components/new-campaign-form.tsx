"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nazwa kampani musi składać się z minimum 2 znaków." }),
  description: z.string().optional(),
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
  name: {
    label: "Nazwa kampani",
    placeholder: "Wielkie Imperium Kontratakuje",
    type: "text",
    gridClass: "col-span-2",
  },
  description: {
    label: "Opis",
    placeholder: "Opcjonalny opis kampani",
    type: "text",
    gridClass: "col-span-2",
  },
};

export function NewCampaignForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCampaign: any) => {
      return await apiClient.post("/api/v1/campaigns", newCampaign);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["game-campaigns"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutateAsync({
      name: values.name,
      description: values.description,
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

        <Button type="submit">Stwórz kampanię</Button>
      </form>
    </Form>
  );
}
