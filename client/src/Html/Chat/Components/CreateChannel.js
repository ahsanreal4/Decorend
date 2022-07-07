import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import MySwal from '../../../AlertModel/MySwal';

import { UserList } from "./";
import { CloseCreateChannel } from './CloseCreateChannel';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
    }

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

export default function CreateChannel({ createType, setIsCreating }) {
    const [channelName, setChannelName] = useState('');
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const createChannel = async (e) => {
        e.preventDefault();
        if (selectedUsers.length > 0) {
            let createChannel2 = false;
            if (createType == "messaging") {
                if (selectedUsers.length == 2) {
                    createChannel2 = true;
                }
                else {
                    MySwal("error", "Only 1 user can be added", 1000);
                }
            }
            else if (createType == "team") {
                createChannel2 = true;
            }
            if (createChannel2) { 
            try {
                const newChannel = await client.channel(createType, channelName, {
                    name: channelName, members: selectedUsers
                });

                await newChannel.watch();
                setChannelName('');
                setIsCreating(false);
                setSelectedUsers([client.userID]);
                setActiveChannel(newChannel);
            }
            catch (error) {
                console.log(error);
            }
        }
        }
    }

  return (
      <div className='create-channel__container'>
          <div className='create-channel__header'>
              <p>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</p>
              <CloseCreateChannel setIsCreating={setIsCreating} />
          </div>
          {createType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
          <UserList setSelectedUsers={setSelectedUsers} />
          <div className='create-channel__button-wrapper' onClick={createChannel}>
              <p>{createType === "team" ? "Create Channel" : "Create Message Group"}</p>
          </div>
    </div>
  )
}
