import { useContext, useEffect, useState } from "react"
import socketIO from 'socket.io-client'
import { env } from "../../app.config"
import { useSelector, useDispatch } from 'react-redux';
import SocketContext from "../contexts/SocketContext";
import { setNewMessageAction, setNewRoomAction } from "../redux/chat";

const useSocket = () => useContext(SocketContext);

const useSocketProvider = () => {
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null)
  const { user } = useSelector(s => s.user);

  useEffect(() => {

    const options = {
      transports: ['websocket'],
      secure: false,
      rejectUnauthorized: false
    }
    console.log('lancement socket')
    const socket = socketIO.io(env.API.SOCKET_URL, options)

    socket.on('connect', () => {
      console.log('socket connected', user.id)
      socket.emit('register', {
        userId: user.id
      })
      setWs(socket)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnect')
      setWs(null)
    })

    socket.on('new_message', (data) => {
      console.log('new_message', data)
      dispatch(setNewMessageAction(data))
    })

    socket.on('new_room', (data) => {
      console.log('new_room', data)
      dispatch(setNewRoomAction(data))
    })

  }, [])

  const emitNewMessage = (content, roomId, userId) => {
    if (ws !== null) {
      if (ws.connected) {
        ws.emit('new_message', {
          type: 'text',
          content,
          files: [],
          userId,
          roomId,
        })
        return true
      }
    }
    return false
  }

  const closeSocket = () => {
    console.log('close socket');
    ws.off('disconnect');
    ws.close()
    setWs(null);
  };


  return {
    emitNewMessage,
    closeSocket
  }
}

export { useSocket, useSocketProvider };