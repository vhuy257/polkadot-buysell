"use client";
import React, { memo, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

interface IFormInputs {
  dot_amount: number;
  dot_price: number;
  usdt_amount: number;
  usdt_price: number;
  total_vnd: number;
}

const RowInput = ({ user }: any) => {
  const { handleSubmit, control, reset } = useForm<IFormInputs>();
  const supabase = createClient();
  const [loading, setLoading] = useState<Boolean>(false);
  const [toast, setToast] = useState("");

  const onSubmit: SubmitHandler<IFormInputs> = async (formData: any) => {
    setLoading(true);

    const { dot_amount, dot_price, usdt_amount, usdt_price, total_vnd } =
      formData;
    console.log(user);

    if (!user) return;

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
        },
      ])
      .select();

    if (error) {
      setLoading(false);
      setToast(error?.message);
    }

    if (data) {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 text-sm max-w-5xl"
    >
      <Controller
        name="dot_amount"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <div>
            <input
              type="text"
              placeholder="Polkadot Amount"
              className={cn("input input-bordered input-sm w-full max-w-xs", {
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
          <div>
            <input
              type="text"
              placeholder="Polkadot Price"
              className={cn("input input-bordered input-sm w-full max-w-xs", {
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
          <div>
            <input
              type="text"
              placeholder="Usdt Amount"
              className={cn("input input-bordered input-sm w-full max-w-xs", {
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
          <div>
            <input
              type="text"
              placeholder="Usdt Price"
              className={cn("input input-bordered input-sm w-full max-w-xs", {
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
          <div>
            <input
              type="text"
              placeholder="Total VND"
              className={cn("input input-bordered input-sm w-full max-w-xs", {
                "input-error": fieldState.invalid,
              })}
              {...field}
            />
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
        className={cn("btn btn-sm", {
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
