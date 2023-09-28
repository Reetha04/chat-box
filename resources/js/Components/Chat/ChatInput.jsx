import { useForm } from "@inertiajs/inertia-react";
import TextInput from "../TextInput";
export default function ChatInput({receiver}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message:'',

    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
      };
      
      const submit = (e) => {
        e.preventDefault();
        // console.log('Receiver ID:', receiver?.id);
        post(route('chat.store', receiver?.id));
        reset("message");
      };
      

    return(
        <div className="bg-gray-100 fixed bottom-0 w-full pl-4">
            <form onSubmit={submit}>
            <TextInput
  className="w-full bg-gray-100 pt-3 h-16 border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none focus:!outline-none font-light"
  name="message"
  placeholder="Write a message"
  value={data.message}
  onChange={onHandleChange}
/>


            </form>
    </div>
    )

}