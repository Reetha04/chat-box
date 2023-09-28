<?php

namespace App\Repositories;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
class ChatRepository
{

    public function getUserMessages(int $senderId, int $receiverId){
        return Message::whereIn('sender_id',[$senderId,$receiverId])
        ->whereIn('receiver_id',[$senderId,$receiverId])
        ->get();
    }

    public function getRecentUserswithMessage(int $senderId):array{

        DB::statement("SET SESSION sql_mode=''");
        $recentMessages= Message::where(function ($query) use ($senderId){
            $query->where('sender_id',$senderId)
            ->orWhere('receiver_id',$senderId);
        })->groupBy('sender_id','receiver_id')
        ->select('sender_id','receiver_id','message')
        ->orderBy('id','desc')
        ->limit(30)
        ->get();
        
        return $this->getFilterRecentMessages($recentMessages,$senderId);
    }

    public function sendMessage(array $data):Message{
       return Message::create($data);
    }
    public function getFilterRecentMessages(Collection $recentMessages, int $senderId): array
{
    $usedUserIds = [];
    $recentUsersWithMessage = [];

    foreach ($recentMessages as $key => $message) { // Add $key here
        $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
        if (!in_array($userId, $usedUserIds)) {
            $recentUsersWithMessage[] = [
                'user_id' => $userId,
                'message' => $message->message,
            ];
            $usedUserIds[] = $userId;
        }
    }

    foreach ($recentUsersWithMessage as &$userMessage) { // Use &$userMessage to update it
        $userMessage['name'] = User::where('id', $userMessage['user_id'])->value('name') ?? '';
    }

    return $recentUsersWithMessage;
}

}
