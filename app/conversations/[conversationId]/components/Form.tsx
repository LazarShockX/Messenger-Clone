'use client';

import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";

import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: {
        errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    
    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset="lr1rhuuv">
                <HiPhoto className="text-sky-500" size={30} />
            </CldUploadButton>
            <form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
                <button className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition" type="submit">
                    <HiPaperAirplane className="text-white" size={18} />
                </button>
            </form>
        </div>
    );
}

export default Form;