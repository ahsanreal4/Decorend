import React, {useEffect, useState} from 'react';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import getScreenAccessible from '../ScreenHelper';

import { ChannelContainer, ChannelListContainer, ChannelSearch } from './Components';

export default function MainPage() {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const apiKey = "8gb6yku7bpbd";
    const client = StreamChat.getInstance(apiKey);
    let [screenLoading, setScreenLoading] = useState(true);

    const getClientToken = async () => {

    const cookies = new Cookies();
    const userData = JSON.parse(localStorage.getItem("userData"));
        
    if (userData != null) {
    if (cookies.get("token") == undefined || cookies.get("token") == null) {
            const id = userData.id;
            let json2 = JSON.stringify({ id });

            const response = await fetch("http://localhost:3000/api/createChatToken", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: json2,
            });
            const data = await response.json();
            if (data?.token != undefined && data.token != null) {
            cookies.set("token", data.token);
            }
            if (data.status === "ok") {
                client.connectUser({
                    id: userData.id,
                    name: userData.name,
                }, cookies.get("token"));
            }
            }
            else {
                client.connectUser({
                    id: userData.id,
                    name: userData.name,
                }, cookies.get("token"));
            }
        setScreenLoading(false);
        }
    };

    useEffect(() => {
        if (!getScreenAccessible("Messaging")) window.location.href = "/";
        else {
            getClientToken();
            import("stream-chat-react/dist/css/index.css");
            import("../../CSS/MainPage.css");
        }
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
