import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { BarLoader } from "react-spinners";
import { useMutation } from "react-query";

const formSchema = z.object({
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  requestDescription: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MainForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urls: [{ value: "" }],
      requestDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['request'] as string[],
    async mutationFn(values: FormValues) {
      const response = await axios.post("http://localhost:3000/request", { ...values });
      return response.data;
    },
    onSuccess(data){
      navigate(`/result/${data.id}`)
    },
    onError(err: any) {
      return <div>{err.message}</div>
    }
  })

  return (
    <Form {...form}>
      <form className="w-full flex flex-col justify-center items-center gap-y-4 md:px-12" onSubmit={form.handleSubmit(mutate as any)}>
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`urls.${index}.value`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  URLs to compare
                </FormLabel>
                <FormDescription className={cn(index !== 0 && "sr-only")}>
                  Add links to the products you want to compare
                </FormDescription>
                <div className="flex flex-row justify-center items-center gap-4">
                  <FormControl>
                    <Input placeholder="Enter a URL here.." {...field} />
                  </FormControl>
                  <Button onClick={() => remove(index)}>
                    <X />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => append({ value: "" })}
        >
          Add URL
        </Button>
        <FormField name="requestDescription" control={form.control} render={({ field }) => {
            return <FormItem className="w-full ">
                <FormLabel>Why Compare?</FormLabel>
                <FormControl>
                    <Textarea className="w-full resize-none" {...field} />
                </FormControl>
            </FormItem>
        }} />
        { isError && (
          <FormMessage>{(error as any).message}</FormMessage>
        ) }
        <Button disabled={isLoading} className="w-full md:w-auto" type="submit">{ isLoading ? <BarLoader color="white" /> : "Send" }</Button>
      </form>
    </Form>
  );
}
