import React, {useState} from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
const LogOutIcon = "https://res.cloudinary.com/dnuuh99qn/image/upload/v1655976817/logout_puso3r.png";

const logout = () => {
  window.location.href = "/";
}

const SideBar = () => {
  return (<div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <i className="fa-regular fa-message"></i>
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img src={LogOutIcon} alt="Logout" width="30" onClick={logout} />
      </div>
    </div>
  </div>
  )
};

const CompanyHeader = () => {
  return(
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>
      Messaging
    </p>
    </div>
  )
}

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
}

function ChannelListContent({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating = { setIsCreating }
              setCreateType = { setCreateType }
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating = { setIsCreating }
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating = { setIsCreating }
              setCreateType = { setCreateType }
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating = { setIsCreating }
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className='channel-list__container-responsive'
            style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
      >
        <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
        </div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
}

export default ChannelListContainer;
