import Input from '../layout/form/Input';
import Button from '../layout/form/Button';
import { ChangeEvent, useState } from 'react';
import ClosedModalButton from './ClosedModalButton';
import { useJoinRoomMutation } from '../../hooks/useMutation';

function JoinRoomModal() {
  const [roomInput, setRoomInput] = useState({
    roomNumber: Number,
  });
  const useJoinRoom = useJoinRoomMutation();
  const handleJoinRoomOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomInput({ ...roomInput, [name]: value });
  };

  const handleJoinRoomButtonClick = async () => {
    useJoinRoom.mutate(Number(roomInput.roomNumber));
  };

  return (
    <div>
      <ClosedModalButton />
      <h2>방 참여하기</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>참여할 방 번호</label>
          <Input
            type="number"
            name="roomNumber"
            value={String(roomInput.roomNumber)}
            onChangeFnc={(e) => handleJoinRoomOnChange(e)}
            placeholder="방 번호를 입력하세요."
          />
        </div>
        <Button onClickFnc={handleJoinRoomButtonClick}>
          <p>방 참여</p>
        </Button>
      </form>
    </div>
  );
}

export default JoinRoomModal;
