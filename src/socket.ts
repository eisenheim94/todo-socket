import { io, Socket } from 'socket.io-client';
import { ISocketTodoProgressData, SOCKET_EVENTS } from './types/socket.types';

const socketWithoutTypes: Socket = io('http://localhost:8000');

interface SocketEventsOn {
  [SOCKET_EVENTS.UPDATE_TODO_PROGRESS]: (data: ISocketTodoProgressData) => void;
}

type SocketEventNamesOn = keyof SocketEventsOn;

interface SocketWithTypedEvents {
  on<E extends SocketEventNamesOn>(
    event: E,
    listener: SocketEventsOn[E],
  ): Socket;
  off: Socket['off'];
}

export const socket: SocketWithTypedEvents = socketWithoutTypes;
