"use client";
import React, { memo, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/format";
import { CalendarIcon } from "../icons";
import { Button } from "../ui/button";
import moment from "moment";
import { dataHistory } from "@/lib/atom";
import { useSetAtom } from "jotai";
interface IFormInputs {
  dot_amount: any;
  dot_price: any
  usdt_amount: any;
  usdt_price: any;
  total_vnd: any;
  updated_date?: Date | any;
  type: "BUY" | "SELL";
}

const RowInput = ({ user }: any) => {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      dot_amount: null,
      dot_price: null,
      usdt_amount: null,
      usdt_price: null,
      total_vnd: null,
      type: "BUY",
    },
  });
  const supabase = createClient();
  const [loading, setLoading] = useState<Boolean>(false);
  const [toast, setToast] = useState("");
  const setListHistory: any = useSetAtom(dataHistory);

  const onSubmit: SubmitHandler<IFormInputs> = async (formData: any) => {
    setLoading(true);

    const {
      dot_amount,
      dot_price,
      usdt_amount,
      usdt_price,
      total_vnd,
      type,
      updated_date,
    } = formData;

    if (!user) return;

    const format_date = moment(updated_date).format("YYYY-MM-DD");
    const { email, id } = user;
    const { data, error } = await supabase
      .from("history_coin")
      .insert([
        {
          dot_amount,
          dot_price,
          usdt_amount,
          usdt_price,
          total_vnd,
          user_id: id,
          email,
          updated_date: format_date,
          type: type !== "BUY" ? "SELL" : type,
        },
      ])
      .select();

    if (error) {
      setLoading(false);
      setToast(error?.message);
    }

    if (data) {
      setListHistory((history: any) => [...history, data[0]]);
      setLoading(false);
      reset();
      setToast("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 text-sm max-w-5xl items-end"
    >
      <Controller
        name="dot_amount"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="DOT Amount"
              className={cn("input input-bordered input-sm w-full", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        name="dot_price"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="DOT Price"
              className={cn("input input-bordered input-sm w-full", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        name="usdt_amount"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="USDT Amount"
              className={cn("input input-bordered input-sm w-full", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        name="usdt_price"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="USDT Price"
              className={cn("input input-bordered input-sm w-full", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        name="total_vnd"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="Total VND"
              className={cn("input input-bordered input-sm w-full", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="updated_date"
        render={({ field, fieldState }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  moment(field.value).format("DD/MM/YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
                <span className="ml-auto h-4 w-4 opacity-50">
                  <CalendarIcon />
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field?.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                {...field}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <div className="form-control">
            <label className="label cursor-pointer flex items-center gap-2 flex-col">
              <span className="label-text">
                Sell/<span className="text-success">Buy</span>
              </span>
              <input
                type="checkbox"
                className={cn("toggle toggle-success")}
                {...field}
                defaultChecked
              />
            </label>
          </div>
        )}
      />
      {toast !== "" && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span className="text-white capitalize">{toast}</span>
          </div>
        </div>
      )}
      <button
        className={cn("btn btn-primary btn-sm w-full", {
          "pointer-events-none": loading,
        })}
        type="submit"
      >
        {loading && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </form>
  );
};

export default memo(RowInput);
