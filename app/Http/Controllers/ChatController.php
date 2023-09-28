<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\ChatRepository;
use App\Models\Message; 
use App\Models\User; 
use Illuminate\Support\Facades\Redirect;



class ChatController extends Controller
{

    public function __construct(private ChatRepository $chat){
        $this->chat=$chat;

    }
    /**
     * Chat View
     * @return \Inertia\Response
     */
    public function index(Request $request, $receiverId = null)
    {
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages((int)$request->user()->id,(int) $receiverId);
        
        return Inertia::render('Chat/Chat', [
            'messages' => $messages,
            'recentMessages' => $this->chat->getRecentUsersWithMessage($request->user()->id),
            'receiver'=>User::find($receiverId),
        ]);
        
        
    }

     /**
     * Chat store
     * @return \Inertia\Response
     */
    public function store(Request $request, $receiverId = null)
    {
        $request->validate(['message'=>'required|string',]);
        if(empty($receiverId)){
            return;
        }
        try{
            $this->chat->sendMessage([
                'sender_id' => (int)$request->user()->id,
                'receiver_id'=>$receiverId,
                'message'=>$request->message,
            ]);
            event(new MessageSent($message));
        return Redirect::route('chat.index',$receiverId);

        }
        
        catch(\Throwable $th)
        {
        return Redirect::route('chat.index',$receiverId);

        }
    }
    
}
