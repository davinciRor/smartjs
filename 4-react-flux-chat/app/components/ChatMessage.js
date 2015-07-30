import React from 'react';

export default class ChatMessage {
  render() {
    let msg = this.props.msg;
    let msgLinks = msg.links;

    return (
      <div className='messages'>
        <div className='messages__username'>{msg.username} :</div>
        <div className='messages__usermessage'>{msg.message}</div>
        <div>
          {!!msgLinks && 
            msgLinks.map((link, i) => {
              return (
                <a href={link.src}
                   key={i}
                   target='_blank'>
                  <img width={link.width} src={link.src} />
                </a>
              );
            })
          }
        </div>
      </div>
    );
  }
}
