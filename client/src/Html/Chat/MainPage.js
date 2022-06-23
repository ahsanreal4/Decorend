import React, {useEffect, useState} from 'react';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, ChannelSearch } from './Components';

const apiKey = "8gb6yku7bpbd";
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const userData = JSON.parse(localStorage.getItem("userData"));
if (userData != null) {
    client.connectUser({
        id: userData.id,
        name: userData.name,
    }, cookies.get("token"));
}


export default function MainPage() {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const client = StreamChat.getInstance(apiKey);
    let [screenLoading, setScreenLoading] = useState(true);

    useEffect(() => {
        import("stream-chat-react/dist/css/index.css");
        import("../../CSS/MainPage.css");
        setScreenLoading(false);
    }, []);

    return (
    screenLoading == false && (
            <div className='app__wrapper'>
                <Chat client={client} theme="team light">
                    <ChannelListContainer
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}              
                    />
                    <ChannelContainer
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}    
                        createType={createType}
                    />
                </Chat>
            </div>
      )

  )
}
